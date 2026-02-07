package com.qnyproj.repository;

import com.qnyproj.model.Storyboard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface StoryboardRepository extends JpaRepository<Storyboard, String> {
    
    List<Storyboard> findByNovelId(String novelId);
    
    Optional<Storyboard> findByNovelIdAndVersion(String novelId, Integer version);
}
