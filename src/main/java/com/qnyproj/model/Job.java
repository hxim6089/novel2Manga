package com.qnyproj.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "jobs")
public class Job {

    @Id
    private String id;

    @Column(nullable = false)
    private String type;  // "analysis", "image_generation", "export"

    private String novelId;
    private String storyboardId;
    private String panelId;

    private String status;  // "pending", "processing", "completed", "failed"

    @Lob
    @Column(columnDefinition = "CLOB")
    private String result;

    @Lob
    @Column(columnDefinition = "CLOB")
    private String errorMessage;

    private Integer progress;  // 0-100

    private Instant createdAt;
    private Instant updatedAt;
    private Instant completedAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
        if (status == null) {
            status = "pending";
        }
        if (progress == null) {
            progress = 0;
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

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public String getNovelId() { return novelId; }
    public void setNovelId(String novelId) { this.novelId = novelId; }

    public String getStoryboardId() { return storyboardId; }
    public void setStoryboardId(String storyboardId) { this.storyboardId = storyboardId; }

    public String getPanelId() { return panelId; }
    public void setPanelId(String panelId) { this.panelId = panelId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getResult() { return result; }
    public void setResult(String result) { this.result = result; }

    public String getErrorMessage() { return errorMessage; }
    public void setErrorMessage(String errorMessage) { this.errorMessage = errorMessage; }

    public Integer getProgress() { return progress; }
    public void setProgress(Integer progress) { this.progress = progress; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }

    public Instant getCompletedAt() { return completedAt; }
    public void setCompletedAt(Instant completedAt) { this.completedAt = completedAt; }
}
