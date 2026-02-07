/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Novel = {
    /**
     * 作品唯一标识
     */
    id: string;
    /**
     * 作品标题
     */
    title: string;
    /**
     * 原文内容
     */
    originalText?: string;
    /**
     * 原文 S3 Key
     */
    originalTextS3?: string;
    /**
     * 作品状态
     */
    status: Novel.status;
    /**
     * 关联的分镜ID
     */
    storyboardId?: string;
    /**
     * Cognito 用户 ID
     */
    userId: string;
    metadata?: {
        genre?: string;
        tags?: Array<string>;
    };
    /**
     * 已生成的章节数量
     */
    chapterCount?: number;
    createdAt: string;
    updatedAt?: string;
};
export namespace Novel {
    /**
     * 作品状态
     */
    export enum status {
        CREATED = 'created',
        ANALYZING = 'analyzing',
        ANALYZED = 'analyzed',
        GENERATING = 'generating',
        COMPLETED = 'completed',
        ERROR = 'error',
    }
}

