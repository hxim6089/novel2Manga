package com.qnyproj.repository;

import com.qnyproj.model.Character;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CharacterRepository extends JpaRepository<Character, String> {
    
    List<Character> findByNovelId(String novelId);
    
    Character findByNovelIdAndName(String novelId, String name);
}
