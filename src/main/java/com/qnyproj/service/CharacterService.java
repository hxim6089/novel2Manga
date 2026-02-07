package com.qnyproj.service;

import com.qnyproj.model.Character;
import com.qnyproj.repository.CharacterRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service for managing the "Bible" (character database).
 */
@Service
public class CharacterService {

    private static final Logger logger = LoggerFactory.getLogger(CharacterService.class);

    @Autowired
    private CharacterRepository characterRepository;

    @Transactional
    public Character createCharacter(Character character) {
        Character saved = characterRepository.save(character);
        logger.info("Created character: {} ({})", saved.getName(), saved.getId());
        return saved;
    }

    public Optional<Character> getCharacter(String id) {
        return characterRepository.findById(id);
    }

    public List<Character> getCharactersByNovel(String novelId) {
        return characterRepository.findByNovelId(novelId);
    }

    /**
     * Get a map of character ID -> Character for prompt building.
     */
    public Map<String, Character> getCharacterMapByNovel(String novelId) {
        return getCharactersByNovel(novelId).stream()
                .collect(Collectors.toMap(Character::getId, c -> c));
    }

    @Transactional
    public Character updateCharacter(String id, Character updates) {
        return characterRepository.findById(id)
            .map(existing -> {
                if (updates.getName() != null) {
                    existing.setName(updates.getName());
                }
                if (updates.getDescription() != null) {
                    existing.setDescription(updates.getDescription());
                }
                if (updates.getVisualFeatures() != null) {
                    existing.setVisualFeatures(updates.getVisualFeatures());
                }
                if (updates.getPortraitUrl() != null) {
                    existing.setPortraitUrl(updates.getPortraitUrl());
                }
                return characterRepository.save(existing);
            })
            .orElseThrow(() -> new RuntimeException("Character not found: " + id));
    }

    @Transactional
    public void deleteCharacter(String id) {
        characterRepository.deleteById(id);
        logger.info("Deleted character: {}", id);
    }
}
