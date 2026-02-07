/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Job = {
    id: string;
    type: Job.type;
    /**
     * 适用于生成任务的模式 (preview 或 hd)
     */
    mode?: string;
    /**
     * 对于分析/分镜任务，表示本次生成的章节编号
     */
    chapterNumber?: number;
    status: Job.status;
    progress?: {
        total?: number;
        completed?: number;
        failed?: number;
        percentage?: number;
    };
    /**
     * 任务结果 (内容依赖于 type)
     */
    result?: Record<string, any>;
    /**
     * 错误信息
     */
    error?: string;
    /**
     * 面板任务统计
     */
    tasks?: {
        total?: number;
        completed?: number;
        failed?: number;
        inProgress?: number;
        pending?: number;
    };
    createdAt?: string;
    updatedAt?: string;
};
export namespace Job {
    export enum type {
        ANALYZE = 'analyze',
        GENERATE_PREVIEW = 'generate_preview',
        GENERATE_HD = 'generate_hd',
        CHANGE_REQUEST = 'change_request',
        PANEL_EDIT = 'panel_edit',
        EXPORT_PDF = 'export_pdf',
        EXPORT_WEBTOON = 'export_webtoon',
        EXPORT_RESOURCES = 'export_resources',
        GENERATE_PORTRAIT = 'generate_portrait',
    }
    export enum status {
        PENDING = 'pending',
        IN_PROGRESS = 'in_progress',
        COMPLETED = 'completed',
        FAILED = 'failed',
    }
}

