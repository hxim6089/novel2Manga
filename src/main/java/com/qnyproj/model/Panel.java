package com.qnyproj.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "panels")
public class Panel {

    @Id
    private String id;

    @Column(nullable = false)
    private String storyboardId;

    private Integer sequenceNumber;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String sceneDescription;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String dialogue;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String visualPrompt;

    private String characterIds;  // Comma-separated character IDs
    private String pose;
    private String expression;
    private String viewType;

    private String imageUrl;
    private String status;

    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
        if (status == null) {
            status = "pending";
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

    public String getStoryboardId() { return storyboardId; }
    public void setStoryboardId(String storyboardId) { this.storyboardId = storyboardId; }

    public Integer getSequenceNumber() { return sequenceNumber; }
    public void setSequenceNumber(Integer sequenceNumber) { this.sequenceNumber = sequenceNumber; }

    public String getSceneDescription() { return sceneDescription; }
    public void setSceneDescription(String sceneDescription) { this.sceneDescription = sceneDescription; }

    public String getDialogue() { return dialogue; }
    public void setDialogue(String dialogue) { this.dialogue = dialogue; }

    public String getVisualPrompt() { return visualPrompt; }
    public void setVisualPrompt(String visualPrompt) { this.visualPrompt = visualPrompt; }

    public String getCharacterIds() { return characterIds; }
    public void setCharacterIds(String characterIds) { this.characterIds = characterIds; }

    public String getPose() { return pose; }
    public void setPose(String pose) { this.pose = pose; }

    public String getExpression() { return expression; }
    public void setExpression(String expression) { this.expression = expression; }

    public String getViewType() { return viewType; }
    public void setViewType(String viewType) { this.viewType = viewType; }

    public String getImageUrl() { return imageUrl; }
    public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
