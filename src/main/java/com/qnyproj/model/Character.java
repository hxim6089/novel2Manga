package com.qnyproj.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "characters")
public class Character {

    @Id
    private String id;

    @Column(nullable = false)
    private String novelId;

    @Column(nullable = false)
    private String name;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String description;

    private String visualFeatures;
    private String personality;
    private String role;  // protagonist, antagonist, supporting
    private String portraitUrl;

    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
        createdAt = Instant.now();
        updatedAt = Instant.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = Instant.now();
    }

    // Getters and Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getNovelId() { return novelId; }
    public void setNovelId(String novelId) { this.novelId = novelId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getVisualFeatures() { return visualFeatures; }
    public void setVisualFeatures(String visualFeatures) { this.visualFeatures = visualFeatures; }

    public String getPersonality() { return personality; }
    public void setPersonality(String personality) { this.personality = personality; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }

    public String getPortraitUrl() { return portraitUrl; }
    public void setPortraitUrl(String portraitUrl) { this.portraitUrl = portraitUrl; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
