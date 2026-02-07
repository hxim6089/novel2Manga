/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Panel = {
    id: string;
    storyboardId?: string;
    /**
     * 所属章节编号
     */
    chapterNumber?: number;
    /**
     * 页码
     */
    page: number;
    /**
     * 页内序号
     */
    index: number;
    /**
     * 场景描述
     */
    scene?: string;
    shotType?: Panel.shotType;
    /**
     * 相机角度
     */
    cameraAngle?: string;
    /**
     * 构图信息
     */
    composition?: Record<string, any>;
    characters?: Array<{
        charId?: string;
        configId?: string;
        name?: string;
        pose?: string;
        expression?: string;
    }>;
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
    /**
     * Imagen prompt
     */
    visualPrompt?: string;
    images?: {
        preview?: string;
        hd?: string;
    };
    /**
     * 面板图像在 S3 中的对象键
     */
    imagesS3?: Record<string, string>;
};
export namespace Panel {
    export enum shotType {
        CLOSE_UP = 'close-up',
        MEDIUM = 'medium',
        WIDE = 'wide',
        EXTREME_WIDE = 'extreme-wide',
    }
}

