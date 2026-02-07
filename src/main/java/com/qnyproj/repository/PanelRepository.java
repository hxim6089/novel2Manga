package com.qnyproj.repository;

import com.qnyproj.model.Panel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PanelRepository extends JpaRepository<Panel, String> {
    
    List<Panel> findByStoryboardIdOrderBySequenceNumberAsc(String storyboardId);
    
    List<Panel> findByStoryboardIdAndStatus(String storyboardId, String status);
}
