package com.qnyproj.service.ai;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import okhttp3.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.concurrent.TimeUnit;

/**
 * Service for calling Alibaba Qwen (DashScope) API for text analysis.
 */
@Service
public class QwenService {

    private static final Logger logger = LoggerFactory.getLogger(QwenService.class);
    private static final MediaType JSON = MediaType.parse("application/json; charset=utf-8");

    @Value("${ai.qwen.api-key}")
    private String apiKey;

    @Value("${ai.qwen.base-url:https://dashscope.aliyuncs.com/api/v1}")
    private String baseUrl;

    @Value("${ai.qwen.model:qwen-plus}")
    private String model;

    private final OkHttpClient client;
    private final ObjectMapper objectMapper;

    public QwenService() {
        this.client = new OkHttpClient.Builder()
                .connectTimeout(30, TimeUnit.SECONDS)
                .readTimeout(120, TimeUnit.SECONDS)
                .writeTimeout(30, TimeUnit.SECONDS)
                .build();
        this.objectMapper = new ObjectMapper();
    }

    /**
     * Send a prompt to Qwen and get the response text.
     */
    public String chat(String systemPrompt, String userMessage) {
        try {
            String requestBody = buildRequestBody(systemPrompt, userMessage);
            
            Request request = new Request.Builder()
                    .url(baseUrl + "/services/aigc/text-generation/generation")
                    .addHeader("Authorization", "Bearer " + apiKey)
                    .addHeader("Content-Type", "application/json")
                    .post(RequestBody.create(requestBody, JSON))
                    .build();

            logger.info("Calling Qwen API with model: {}", model);
            
            try (Response response = client.newCall(request).execute()) {
                if (!response.isSuccessful()) {
                    String errorBody = response.body() != null ? response.body().string() : "No body";
                    logger.error("Qwen API error: {} - {}", response.code(), errorBody);
                    throw new RuntimeException("Qwen API call failed: " + response.code());
                }

                String responseBody = response.body().string();
                return extractContentFromResponse(responseBody);
            }
        } catch (IOException e) {
            logger.error("Failed to call Qwen API", e);
            throw new RuntimeException("Qwen API call failed", e);
        }
    }

    private String buildRequestBody(String systemPrompt, String userMessage) throws IOException {
        return objectMapper.writeValueAsString(new java.util.HashMap<String, Object>() {{
            put("model", model);
            put("input", new java.util.HashMap<String, Object>() {{
                put("messages", new Object[] {
                    new java.util.HashMap<String, String>() {{
                        put("role", "system");
                        put("content", systemPrompt);
                    }},
                    new java.util.HashMap<String, String>() {{
                        put("role", "user");
                        put("content", userMessage);
                    }}
                });
            }});
            put("parameters", new java.util.HashMap<String, Object>() {{
                put("result_format", "message");
            }});
        }});
    }

    private String extractContentFromResponse(String responseBody) throws IOException {
        JsonNode root = objectMapper.readTree(responseBody);
        JsonNode output = root.path("output");
        JsonNode choices = output.path("choices");
        if (choices.isArray() && !choices.isEmpty()) {
            return choices.get(0).path("message").path("content").asText();
        }
        // Fallback for different response format
        return output.path("text").asText("");
    }
}
