/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type UpdatePanelRequest = {
    /**
     * 场景描述
     */
    scene?: string;
    /**
     * 机位/景别
     */
    shotType?: string;
    /**
     * 相机角度
     */
    cameraAngle?: string;
    /**
     * 构图信息
     */
    composition?: Record<string, any>;
    /**
     * Imagen Prompt
     */
    visualPrompt?: string;
    /**
     * 面板涉及的角色
     */
    characters?: Array<{
        charId?: string;
        configId?: string;
        name?: string;
        pose?: string;
        expression?: string;
    }>;
    /**
     * 面板对白
     */
    dialogue?: Array<{
        speaker?: string;
        text?: string;
        bubbleType?: string;
    }>;
    /**
     * 背景设定
     */
    background?: Record<string, any>;
    /**
     * 氛围设定
     */
    atmosphere?: Record<string, any>;
};

