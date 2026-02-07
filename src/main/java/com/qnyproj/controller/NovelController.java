package com.qnyproj.controller;

import com.qnyproj.model.Novel;
import com.qnyproj.service.NovelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/novels")
public class NovelController {

    @Autowired
    private NovelService novelService;

    @PostMapping
    public ResponseEntity<Novel> createNovel(@RequestBody Novel novel) {
        // Set default userId for local dev (mock auth)
        if (novel.getUserId() == null) {
            novel.setUserId("mock-user-001");
        }
        Novel created = novelService.createNovel(novel);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<Novel>> listNovels(
            @RequestParam(required = false) String userId) {
        if (userId != null) {
            return ResponseEntity.ok(novelService.listNovelsByUser(userId));
        }
        return ResponseEntity.ok(novelService.listAllNovels());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Novel> getNovel(@PathVariable String id) {
        return novelService.getNovel(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Novel> updateNovel(@PathVariable String id, @RequestBody Novel updates) {
        try {
            Novel updated = novelService.updateNovel(id, updates);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNovel(@PathVariable String id) {
        novelService.deleteNovel(id);
        return ResponseEntity.noContent().build();
    }
}
