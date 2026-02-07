package com.qnyproj.service;

import jakarta.annotation.PostConstruct;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

/**
 * Local file storage service to replace AWS S3.
 * Stores files in a local directory and serves them via static resource handler.
 */
@Service
public class LocalFileStorageService {

    private static final Logger logger = LoggerFactory.getLogger(LocalFileStorageService.class);

    @Value("${uploads.path:./uploads}")
    private String uploadsPath;

    private Path uploadDir;

    @PostConstruct
    public void init() {
        uploadDir = Paths.get(uploadsPath).toAbsolutePath().normalize();
        try {
            Files.createDirectories(uploadDir);
            logger.info("Upload directory initialized: {}", uploadDir);
        } catch (IOException e) {
            throw new RuntimeException("Could not create upload directory: " + uploadDir, e);
        }
    }

    /**
     * Save a file and return its URL path.
     */
    public String saveFile(byte[] content, String filename, String contentType) {
        try {
            String uniqueFilename = UUID.randomUUID() + "_" + filename;
            Path filePath = uploadDir.resolve(uniqueFilename);
            Files.write(filePath, content);
            logger.info("Saved file: {}", filePath);
            return "/uploads/" + uniqueFilename;
        } catch (IOException e) {
            throw new RuntimeException("Failed to save file: " + filename, e);
        }
    }

    /**
     * Save an image from base64 or raw bytes.
     */
    public String saveImage(byte[] imageData, String extension) {
        String filename = UUID.randomUUID() + "." + extension;
        return saveFile(imageData, filename, "image/" + extension);
    }

    /**
     * Read file content.
     */
    public byte[] readFile(String filename) {
        try {
            Path filePath = uploadDir.resolve(filename);
            return Files.readAllBytes(filePath);
        } catch (IOException e) {
            throw new RuntimeException("Failed to read file: " + filename, e);
        }
    }

    /**
     * Delete a file.
     */
    public void deleteFile(String filename) {
        try {
            Path filePath = uploadDir.resolve(filename);
            Files.deleteIfExists(filePath);
            logger.info("Deleted file: {}", filePath);
        } catch (IOException e) {
            logger.warn("Failed to delete file: {}", filename, e);
        }
    }

    /**
     * Get full path to a file.
     */
    public Path getFilePath(String filename) {
        return uploadDir.resolve(filename);
    }
}
