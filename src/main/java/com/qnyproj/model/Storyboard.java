package com.qnyproj.model;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "storyboards")
public class Storyboard {

    @Id
    private String id;

    @Column(nullable = false)
    private String novelId;

    private Integer version;
    private String status;
    private Integer totalPanels;

    private Instant createdAt;
    private Instant updatedAt;

    @PrePersist
    protected void onCreate() {
        if (id == null) {
            id = java.util.UUID.randomUUID().toString();
        }
        if (version == null) {
            version = 1;
        }
        if (status == null) {
            status = "draft";
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

    public Integer getVersion() { return version; }
    public void setVersion(Integer version) { this.version = version; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getTotalPanels() { return totalPanels; }
    public void setTotalPanels(Integer totalPanels) { this.totalPanels = totalPanels; }

    public Instant getCreatedAt() { return createdAt; }
    public void setCreatedAt(Instant createdAt) { this.createdAt = createdAt; }

    public Instant getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(Instant updatedAt) { this.updatedAt = updatedAt; }
}
