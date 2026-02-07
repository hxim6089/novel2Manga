package com.qnyproj.controller;

import com.qnyproj.model.Panel;
import com.qnyproj.model.Storyboard;
import com.qnyproj.repository.PanelRepository;
import com.qnyproj.repository.StoryboardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/storyboards")
public class StoryboardController {

    @Autowired
    private StoryboardRepository storyboardRepository;

    @Autowired
    private PanelRepository panelRepository;

    @PostMapping
    public ResponseEntity<Storyboard> createStoryboard(@RequestBody Storyboard storyboard) {
        Storyboard saved = storyboardRepository.save(storyboard);
        return ResponseEntity.ok(saved);
    }

    @GetMapping
    public ResponseEntity<List<Storyboard>> listStoryboards(
            @RequestParam String novelId) {
        return ResponseEntity.ok(storyboardRepository.findByNovelId(novelId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Storyboard> getStoryboard(@PathVariable String id) {
        return storyboardRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}/panels")
    public ResponseEntity<List<Panel>> getPanels(@PathVariable String id) {
        List<Panel> panels = panelRepository.findByStoryboardIdOrderBySequenceNumberAsc(id);
        return ResponseEntity.ok(panels);
    }

    @PostMapping("/{id}/panels")
    public ResponseEntity<Panel> addPanel(@PathVariable String id, @RequestBody Panel panel) {
        panel.setStoryboardId(id);
        Panel saved = panelRepository.save(panel);
        return ResponseEntity.ok(saved);
    }

    @PutMapping("/panels/{panelId}")
    public ResponseEntity<Panel> updatePanel(@PathVariable String panelId, @RequestBody Panel updates) {
        return panelRepository.findById(panelId)
                .map(existing -> {
                    if (updates.getSceneDescription() != null) {
                        existing.setSceneDescription(updates.getSceneDescription());
                    }
                    if (updates.getDialogue() != null) {
                        existing.setDialogue(updates.getDialogue());
                    }
                    if (updates.getVisualPrompt() != null) {
                        existing.setVisualPrompt(updates.getVisualPrompt());
                    }
                    if (updates.getPose() != null) {
                        existing.setPose(updates.getPose());
                    }
                    if (updates.getExpression() != null) {
                        existing.setExpression(updates.getExpression());
                    }
                    return ResponseEntity.ok(panelRepository.save(existing));
                })
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteStoryboard(@PathVariable String id) {
        storyboardRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
