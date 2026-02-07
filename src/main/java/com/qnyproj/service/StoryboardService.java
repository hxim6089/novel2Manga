package com.qnyproj.service;

import com.qnyproj.model.Panel;
import com.qnyproj.model.Storyboard;
import com.qnyproj.repository.PanelRepository;
import com.qnyproj.repository.StoryboardRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class StoryboardService {

    private static final Logger logger = LoggerFactory.getLogger(StoryboardService.class);

    @Autowired
    private StoryboardRepository storyboardRepository;

    @Autowired
    private PanelRepository panelRepository;

    @Transactional
    public Storyboard createStoryboard(String novelId) {
        Storyboard storyboard = new Storyboard();
        storyboard.setNovelId(novelId);
        storyboard.setVersion(1);
        storyboard.setStatus("draft");
        storyboard.setTotalPanels(0);
        
        Storyboard saved = storyboardRepository.save(storyboard);
        logger.info("Created storyboard: {} for novel: {}", saved.getId(), novelId);
        return saved;
    }

    public Optional<Storyboard> getStoryboard(String id) {
        return storyboardRepository.findById(id);
    }

    public List<Storyboard> getStoryboardsByNovel(String novelId) {
        return storyboardRepository.findByNovelId(novelId);
    }

    public List<Panel> getPanels(String storyboardId) {
        return panelRepository.findByStoryboardIdOrderBySequenceNumberAsc(storyboardId);
    }

    @Transactional
    public Panel addPanel(String storyboardId, Panel panel) {
        panel.setStoryboardId(storyboardId);
        
        // Auto-assign sequence number
        List<Panel> existingPanels = panelRepository.findByStoryboardIdOrderBySequenceNumberAsc(storyboardId);
        panel.setSequenceNumber(existingPanels.size() + 1);
        
        Panel saved = panelRepository.save(panel);
        
        // Update panel count
        storyboardRepository.findById(storyboardId).ifPresent(sb -> {
            sb.setTotalPanels(existingPanels.size() + 1);
            storyboardRepository.save(sb);
        });
        
        logger.info("Added panel {} to storyboard {}", saved.getId(), storyboardId);
        return saved;
    }

    @Transactional
    public void deleteStoryboard(String id) {
        // Delete all panels first
        List<Panel> panels = panelRepository.findByStoryboardIdOrderBySequenceNumberAsc(id);
        panelRepository.deleteAll(panels);
        
        storyboardRepository.deleteById(id);
        logger.info("Deleted storyboard: {}", id);
    }
}
