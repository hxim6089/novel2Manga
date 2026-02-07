package com.qnyproj.service;

import com.qnyproj.model.Job;
import com.qnyproj.model.Novel;
import com.qnyproj.repository.JobRepository;
import com.qnyproj.repository.NovelRepository;
import com.qnyproj.service.ai.QwenService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Instant;

/**
 * Service for processing novel analysis jobs asynchronously.
 * Replaces SQS-triggered Lambda with Spring @Async.
 */
@Service
public class AnalysisJobService {

    private static final Logger logger = LoggerFactory.getLogger(AnalysisJobService.class);

    private static final String ANALYSIS_SYSTEM_PROMPT = """
        You are a professional story analyst. Analyze the following novel text and extract:
        1. Main characters with their visual descriptions (appearance, clothing, distinctive features)
        2. Key scenes and settings
        3. Story panels/storyboard breakdown (divide into comic panels)
        
        Return your analysis in JSON format with the following structure:
        {
          "characters": [
            {"name": "...", "visualFeatures": "...", "personality": "...", "role": "protagonist|antagonist|supporting"}
          ],
          "panels": [
            {"sequenceNumber": 1, "sceneDescription": "...", "dialogue": "...", "characterIds": ["..."]}
          ]
        }
        """;

    @Autowired
    private NovelRepository novelRepository;

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private QwenService qwenService;

    /**
     * Trigger an async analysis job for a novel.
     */
    public Job triggerAnalysis(String novelId) {
        Job job = new Job();
        job.setType("analysis");
        job.setNovelId(novelId);
        job.setStatus("pending");
        job = jobRepository.save(job);
        
        // Start async processing
        processAnalysisAsync(job.getId(), novelId);
        
        return job;
    }

    @Async("taskExecutor")
    @Transactional
    public void processAnalysisAsync(String jobId, String novelId) {
        logger.info("Starting analysis job: {} for novel: {}", jobId, novelId);
        
        Job job = jobRepository.findById(jobId).orElse(null);
        if (job == null) {
            logger.error("Job not found: {}", jobId);
            return;
        }

        try {
            job.setStatus("processing");
            job.setProgress(10);
            jobRepository.save(job);

            // Get novel text
            Novel novel = novelRepository.findById(novelId).orElse(null);
            if (novel == null) {
                throw new RuntimeException("Novel not found: " + novelId);
            }

            job.setProgress(30);
            jobRepository.save(job);

            // Call Qwen for analysis
            String analysisResult = qwenService.chat(ANALYSIS_SYSTEM_PROMPT, novel.getOriginalText());
            
            job.setProgress(80);
            job.setResult(analysisResult);
            jobRepository.save(job);

            // Update novel status
            novel.setStatus("analyzed");
            novelRepository.save(novel);

            // Mark job complete
            job.setStatus("completed");
            job.setProgress(100);
            job.setCompletedAt(Instant.now());
            jobRepository.save(job);

            logger.info("Analysis job completed: {}", jobId);

        } catch (Exception e) {
            logger.error("Analysis job failed: {}", jobId, e);
            job.setStatus("failed");
            job.setErrorMessage(e.getMessage());
            jobRepository.save(job);
        }
    }
}
