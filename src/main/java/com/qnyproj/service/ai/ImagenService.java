package com.qnyproj.service.ai;

import com.google.cloud.aiplatform.v1.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Base64;
import java.util.List;

/**
 * Service for calling Google Vertex AI (Imagen) for image generation.
 */
@Service
public class ImagenService {

    private static final Logger logger = LoggerFactory.getLogger(ImagenService.class);

    @org.springframework.beans.factory.annotation.Value("${ai.imagen.project-id}")
    private String projectId;

    @org.springframework.beans.factory.annotation.Value("${ai.imagen.location:us-central1}")
    private String location;

    @org.springframework.beans.factory.annotation.Value("${ai.imagen.model:imagegeneration@005}")
    private String model;

    @Autowired
    private com.qnyproj.service.LocalFileStorageService fileStorageService;

    /**
     * Generate an image from a text prompt.
     * Returns the URL of the saved image.
     */
    public String generateImage(String prompt) {
        logger.info("Generating image with prompt: {}", prompt.substring(0, Math.min(100, prompt.length())) + "...");

        try {
            String endpoint = String.format("%s-aiplatform.googleapis.com:443", location);
            
            try (PredictionServiceClient client = PredictionServiceClient.create(
                    PredictionServiceSettings.newBuilder()
                            .setEndpoint(endpoint)
                            .build())) {
                
                EndpointName endpointName = EndpointName.ofProjectLocationPublisherModelName(
                        projectId, location, "google", model);

                // Build the request
                com.google.protobuf.Value instanceValue = com.google.protobuf.Value.newBuilder()
                        .setStructValue(com.google.protobuf.Struct.newBuilder()
                                .putFields("prompt", com.google.protobuf.Value.newBuilder()
                                        .setStringValue(prompt).build())
                                .build())
                        .build();

                com.google.protobuf.Value parameters = com.google.protobuf.Value.newBuilder()
                        .setStructValue(com.google.protobuf.Struct.newBuilder()
                                .putFields("sampleCount", com.google.protobuf.Value.newBuilder()
                                        .setNumberValue(1).build())
                                .build())
                        .build();

                PredictResponse response = client.predict(endpointName, List.of(instanceValue), parameters);

                // Extract image bytes
                if (!response.getPredictionsList().isEmpty()) {
                    com.google.protobuf.Value prediction = response.getPredictions(0);
                    String base64Image = prediction.getStructValue()
                            .getFieldsMap().get("bytesBase64Encoded").getStringValue();
                    
                    byte[] imageBytes = Base64.getDecoder().decode(base64Image);
                    String imageUrl = fileStorageService.saveImage(imageBytes, "png");
                    
                    logger.info("Image generated and saved: {}", imageUrl);
                    return imageUrl;
                }

                throw new RuntimeException("No image generated from Imagen API");
            }
        } catch (Exception e) {
            logger.error("Failed to generate image", e);
            throw new RuntimeException("Image generation failed", e);
        }
    }
}
