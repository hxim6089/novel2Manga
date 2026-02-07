package com.qnyproj.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * Controller for runtime API key configuration.
 * Allows updating AI service keys without restarting the application.
 */
@RestController
@RequestMapping("/config")
public class ConfigController {

    private static final Logger logger = LoggerFactory.getLogger(ConfigController.class);

    // Runtime config store (in-memory, resets on restart)
    private static final ConcurrentHashMap<String, String> runtimeConfig = new ConcurrentHashMap<>();

    @Value("${ai.qwen.api-key:}")
    private String defaultQwenApiKey;

    @Value("${ai.imagen.project-id:}")
    private String defaultGoogleProjectId;

    @Value("${ai.imagen.location:us-central1}")
    private String defaultGoogleLocation;

    @GetMapping
    public ResponseEntity<Map<String, String>> getConfig() {
        Map<String, String> config = new HashMap<>();
        
        // Return masked keys for security
        String qwenKey = getEffectiveQwenApiKey();
        config.put("qwenApiKey", maskKey(qwenKey));
        config.put("googleProjectId", getEffectiveGoogleProjectId());
        config.put("googleLocation", getEffectiveGoogleLocation());
        config.put("configured", String.valueOf(!qwenKey.isEmpty()));
        
        return ResponseEntity.ok(config);
    }

    @PutMapping
    public ResponseEntity<Map<String, Object>> updateConfig(@RequestBody Map<String, String> newConfig) {
        logger.info("Updating API configuration");
        
        if (newConfig.containsKey("qwenApiKey")) {
            String key = newConfig.get("qwenApiKey");
            // Don't save if it's a masked key (unchanged)
            if (!key.contains("*")) {
                runtimeConfig.put("qwenApiKey", key);
                logger.info("Qwen API key updated");
            }
        }
        
        if (newConfig.containsKey("googleProjectId")) {
            runtimeConfig.put("googleProjectId", newConfig.get("googleProjectId"));
            logger.info("Google Project ID updated: {}", newConfig.get("googleProjectId"));
        }
        
        if (newConfig.containsKey("googleLocation")) {
            runtimeConfig.put("googleLocation", newConfig.get("googleLocation"));
            logger.info("Google Location updated: {}", newConfig.get("googleLocation"));
        }
        
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("message", "Configuration updated successfully");
        
        return ResponseEntity.ok(response);
    }

    // Getters for use by other services
    public static String getEffectiveQwenApiKey() {
        return runtimeConfig.getOrDefault("qwenApiKey", System.getenv().getOrDefault("QWEN_API_KEY", ""));
    }

    public String getEffectiveGoogleProjectId() {
        return runtimeConfig.getOrDefault("googleProjectId", defaultGoogleProjectId);
    }

    public String getEffectiveGoogleLocation() {
        return runtimeConfig.getOrDefault("googleLocation", defaultGoogleLocation);
    }

    private String maskKey(String key) {
        if (key == null || key.isEmpty()) {
            return "";
        }
        if (key.length() <= 8) {
            return "****";
        }
        return key.substring(0, 4) + "****" + key.substring(key.length() - 4);
    }
}
