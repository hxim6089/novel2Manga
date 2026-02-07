/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type StoryboardSummary = {
    id: string;
    novelId: string;
    /**
     * 分镜所属章节编号
     */
    chapterNumber?: number;
    totalPages?: number;
    totalPanels?: number;
    /**
     * 面板数量（兼容旧字段，可能等于 totalPanels）
     */
    panelCount?: number;
    /**
     * 分镜生成状态
     */
    status: StoryboardSummary.status;
    createdAt?: string;
    updatedAt?: string;
};
export namespace StoryboardSummary {
    /**
     * 分镜生成状态
     */
    export enum status {
        GENERATED = 'generated',
        GENERATING = 'generating',
        FAILED = 'failed',
    }
}

