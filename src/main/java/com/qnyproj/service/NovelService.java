package com.qnyproj.service;

import com.qnyproj.model.Novel;
import com.qnyproj.repository.NovelRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class NovelService {

    private static final Logger logger = LoggerFactory.getLogger(NovelService.class);

    @Autowired
    private NovelRepository novelRepository;

    @Autowired
    private AnalysisJobService analysisJobService;

    @Transactional
    public Novel createNovel(Novel novel) {
        Novel saved = novelRepository.save(novel);
        logger.info("Created novel: {} ({})", saved.getTitle(), saved.getId());
        
        // Trigger async analysis
        analysisJobService.triggerAnalysis(saved.getId());
        
        return saved;
    }

    public Optional<Novel> getNovel(String id) {
        return novelRepository.findById(id);
    }

    public List<Novel> listNovelsByUser(String userId) {
        return novelRepository.findByUserIdOrderByCreatedAtDesc(userId);
    }

    public List<Novel> listAllNovels() {
        return novelRepository.findAll();
    }

    @Transactional
    public Novel updateNovel(String id, Novel updates) {
        return novelRepository.findById(id)
            .map(existing -> {
                if (updates.getTitle() != null) {
                    existing.setTitle(updates.getTitle());
                }
                if (updates.getOriginalText() != null) {
                    existing.setOriginalText(updates.getOriginalText());
                }
                if (updates.getStatus() != null) {
                    existing.setStatus(updates.getStatus());
                }
                if (updates.getGenre() != null) {
                    existing.setGenre(updates.getGenre());
                }
                return novelRepository.save(existing);
            })
            .orElseThrow(() -> new RuntimeException("Novel not found: " + id));
    }

    @Transactional
    public void deleteNovel(String id) {
        novelRepository.deleteById(id);
        logger.info("Deleted novel: {}", id);
    }
}
