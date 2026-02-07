package com.qnyproj.controller;

import com.qnyproj.model.Character;
import com.qnyproj.service.CharacterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/characters")
public class CharacterController {

    @Autowired
    private CharacterService characterService;

    @PostMapping
    public ResponseEntity<Character> createCharacter(@RequestBody Character character) {
        Character created = characterService.createCharacter(character);
        return ResponseEntity.ok(created);
    }

    @GetMapping
    public ResponseEntity<List<Character>> listCharacters(
            @RequestParam String novelId) {
        return ResponseEntity.ok(characterService.getCharactersByNovel(novelId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Character> getCharacter(@PathVariable String id) {
        return characterService.getCharacter(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<Character> updateCharacter(@PathVariable String id, @RequestBody Character updates) {
        try {
            Character updated = characterService.updateCharacter(id, updates);
            return ResponseEntity.ok(updated);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCharacter(@PathVariable String id) {
        characterService.deleteCharacter(id);
        return ResponseEntity.noContent().build();
    }
}
