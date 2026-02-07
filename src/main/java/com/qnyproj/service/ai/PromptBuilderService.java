package com.qnyproj.service.ai;

import com.qnyproj.model.Character;
import com.qnyproj.model.Panel;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Service for building AI image generation prompts.
 * Implements Context Injection by combining character data with panel descriptions.
 */
@Service
public class PromptBuilderService {

    private static final String JAPANESE_MANGA_DIRECTIVE =
            "Japanese manga style, anime aesthetics, clean screentone line art, high contrast black and white, expressive faces";
    
    private static final String DEFAULT_NEGATIVE_PROMPT = 
            "nsfw, blurry, low quality, extra limbs, deformed hands, text watermark, logo, cropped face, overexposed, underexposed";

    /**
     * Build a prompt for generating a panel image.
     * 
     * @param panel The panel to generate
     * @param characterRefs Map of character ID -> Character (the "Bible")
     * @param mode "preview" or "hd"
     * @return BuildResult containing the prompt and negative prompt
     */
    public BuildResult buildPanelPrompt(Panel panel, Map<String, Character> characterRefs, String mode) {
        List<String> parts = new ArrayList<>();
        parts.add("manga panel illustration");
        parts.add("full-color vibrant palette, no grayscale output");
        parts.add(JAPANESE_MANGA_DIRECTIVE);
        
        // Quality setting
        if ("hd".equalsIgnoreCase(mode)) {
            parts.add("high resolution detailed render");
        } else {
            parts.add("preview quality");
        }
        
        // Scene/environment description
        appendIfDefined(parts, panel.getSceneDescription());
        
        // Inject character context
        if (panel.getCharacterIds() != null && !panel.getCharacterIds().isEmpty()) {
            String[] charIds = panel.getCharacterIds().split(",");
            for (String charId : charIds) {
                Character ref = characterRefs.get(charId.trim());
                if (ref != null) {
                    String charDesc = buildCharacterDescriptor(ref, panel.getPose(), panel.getExpression());
                    appendIfDefined(parts, charDesc);
                }
            }
        }
        
        // Visual prompt override
        appendIfDefined(parts, panel.getVisualPrompt());
        
        // Finishing touches
        parts.add("dynamic lighting");
        parts.add("high quality manga aesthetics");
        
        return new BuildResult(String.join(", ", parts), DEFAULT_NEGATIVE_PROMPT);
    }

    /**
     * Build character description for Context Injection.
     */
    private String buildCharacterDescriptor(Character ref, String pose, String expression) {
        List<String> segments = new ArrayList<>();
        
        // Name
        if (ref.getName() != null) {
            segments.add(ref.getName());
        }
        
        // Visual features from Bible
        if (ref.getVisualFeatures() != null) {
            segments.add(ref.getVisualFeatures());
        }
        
        // Current pose
        if (StringUtils.hasText(pose)) {
            segments.add(getPoseDescription(pose));
        }
        
        // Current expression
        if (StringUtils.hasText(expression)) {
            segments.add(expression + " expression");
        }
        
        return String.join(", ", segments);
    }

    private String getPoseDescription(String poseCode) {
        return switch (poseCode.toLowerCase()) {
            case "standing" -> "standing upright";
            case "sitting" -> "sitting down";
            case "walking" -> "walking forward";
            case "running" -> "running fast";
            case "fighting" -> "dynamic fighting pose";
            case "talking" -> "conversational gesture";
            default -> poseCode;
        };
    }

    private void appendIfDefined(List<String> parts, String value) {
        if (StringUtils.hasText(value)) {
            parts.add(value);
        }
    }

    public static class BuildResult {
        public final String text;
        public final String negativePrompt;

        public BuildResult(String text, String negativePrompt) {
            this.text = text;
            this.negativePrompt = negativePrompt;
        }
    }
}
