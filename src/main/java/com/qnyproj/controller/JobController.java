package com.qnyproj.controller;

import com.qnyproj.model.Job;
import com.qnyproj.repository.JobRepository;
import com.qnyproj.service.AnalysisJobService;
import com.qnyproj.service.ImageGenerationJobService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/jobs")
public class JobController {

    @Autowired
    private JobRepository jobRepository;

    @Autowired
    private AnalysisJobService analysisJobService;

    @Autowired
    private ImageGenerationJobService imageGenerationJobService;

    @GetMapping
    public ResponseEntity<List<Job>> listJobs(
            @RequestParam(required = false) String novelId,
            @RequestParam(required = false) String status) {
        if (novelId != null) {
            return ResponseEntity.ok(jobRepository.findByNovelId(novelId));
        }
        if (status != null) {
            return ResponseEntity.ok(jobRepository.findByStatus(status));
        }
        return ResponseEntity.ok(jobRepository.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Job> getJob(@PathVariable String id) {
        return jobRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    /**
     * Trigger a new analysis job for a novel.
     */
    @PostMapping("/analyze")
    public ResponseEntity<Job> triggerAnalysis(@RequestBody Map<String, String> request) {
        String novelId = request.get("novelId");
        if (novelId == null) {
            return ResponseEntity.badRequest().build();
        }
        Job job = analysisJobService.triggerAnalysis(novelId);
        return ResponseEntity.ok(job);
    }

    /**
     * Trigger image generation for a specific panel.
     */
    @PostMapping("/generate-image")
    public ResponseEntity<Job> triggerImageGeneration(@RequestBody Map<String, String> request) {
        String novelId = request.get("novelId");
        String storyboardId = request.get("storyboardId");
        String panelId = request.get("panelId");
        
        if (novelId == null || panelId == null) {
            return ResponseEntity.badRequest().build();
        }
        
        Job job = imageGenerationJobService.triggerGeneration(novelId, storyboardId, panelId);
        return ResponseEntity.ok(job);
    }
}
