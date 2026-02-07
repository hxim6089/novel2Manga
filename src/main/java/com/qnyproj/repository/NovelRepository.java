package com.qnyproj.repository;

import com.qnyproj.model.Novel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NovelRepository extends JpaRepository<Novel, String> {
    
    List<Novel> findByUserId(String userId);
    
    List<Novel> findByStatus(String status);
    
    List<Novel> findByUserIdOrderByCreatedAtDesc(String userId);
}
