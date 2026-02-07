package com.qnyproj.repository;

import com.qnyproj.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JobRepository extends JpaRepository<Job, String> {
    
    List<Job> findByNovelId(String novelId);
    
    List<Job> findByStatus(String status);
    
    List<Job> findByNovelIdAndType(String novelId, String type);
}
