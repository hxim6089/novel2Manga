package com.qnyproj.service;

import com.qnyproj.model.Character;
import com.qnyproj.model.Job;
import com.qnyproj.model.Panel;
import com.qnyproj.repository.JobRepository;
import com.qnyproj.repository.PanelRepository;
import com.qnyproj.service.ai.ImagenService;
import com.qnyproj.service.ai.PromptBuilderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;
import java.util.Map;

/**
 * Service for processing image generation jobs asynchronously.
 * Uses Context Injection via PromptBuilderService.
 */
@Service
public class ImageGenerationJobService {

    private static final Logger logger = LoggerFactory.getLogger(ImageGenerationJobService.class);

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private PanelRepository panelRepository;

    @Autowired
    private CharacterService characterService;

    @Autowired
    private PromptBuilderService promptBuilder;

    @Autowired
    private ImagenService imagenService;

    /**
     * Trigger an async image generation job for a panel.
     */
    public Job triggerGeneration(String novelId, String storyboardId, String panelId) {
        Job job = new Job();
        job.setType("image_generation");
        job.setNovelId(novelId);
        job.setStoryboardId(storyboardId);
        job.setPanelId(panelId);
        job.setStatus("pending");
        job = jobRepository.save(job);
        
        // Start async processing
        processGenerationAsync(job.getId(), novelId, panelId);
        
        return job;
    }

    @Async("taskExecutor")
    @Transactional
    public void processGenerationAsync(String jobId, String novelId, String panelId) {
        logger.info("Starting image generation job: {} for panel: {}", jobId, panelId);
        
        Job job = jobRepository.findById(jobId).orElse(null);
        if (job == null) {
            logger.error("Job not found: {}", jobId);
            return;
        }

        try {
            job.setStatus("processing");
            job.setProgress(10);
            jobRepository.save(job);

            // Get panel
            Panel panel = panelRepository.findById(panelId).orElse(null);
            if (panel == null) {
                throw new RuntimeException("Panel not found: " + panelId);
            }

            job.setProgress(20);
            jobRepository.save(job);

            // Get character references (Bible/Context)
            Map<String, Character> charMap = characterService.getCharacterMapByNovel(novelId);
            
            job.setProgress(30);
            jobRepository.save(job);

            // Build prompt with Context Injection
            PromptBuilderService.BuildResult promptResult = promptBuilder.buildPanelPrompt(panel, charMap, "preview");
            logger.info("Built prompt: {}", promptResult.text.substring(0, Math.min(100, promptResult.text.length())));

            job.setProgress(50);
            jobRepository.save(job);

            // Generate image via Imagen
            String imageUrl = imagenService.generateImage(promptResult.text);
            
            job.setProgress(90);
            jobRepository.save(job);

            // Update panel with image URL
            panel.setImageUrl(imageUrl);
            panel.setStatus("generated");
            panelRepository.save(panel);

            // Mark job complete
            job.setStatus("completed");
            job.setProgress(100);
            job.setResult(imageUrl);
            job.setCompletedAt(Instant.now());
            jobRepository.save(job);

            logger.info("Image generation job completed: {}", jobId);

        } catch (Exception e) {
            logger.error("Image generation job failed: {}", jobId, e);
            job.setStatus("failed");
            job.setErrorMessage(e.getMessage());
            jobRepository.save(job);
        }
    }
}
