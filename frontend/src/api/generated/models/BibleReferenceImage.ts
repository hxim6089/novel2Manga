/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BibleReferenceImage = {
    /**
     * 参考图条目 ID
     */
    id: string;
    /**
     * 参考图在 S3 中的键（系统生成）
     */
    s3Key?: string;
    /**
     * 用于前端展示的临时访问链接
     */
    url?: string;
    /**
     * 参考图标题或备注
     */
    label?: string;
    /**
     * 图片来源
     */
    source?: BibleReferenceImage.source;
    uploadedAt: string;
    /**
     * 上传者（自动生成会写入 system）
     */
    uploadedBy?: string | null;
};
export namespace BibleReferenceImage {
    /**
     * 图片来源
     */
    export enum source {
        USER = 'user',
        AUTO = 'auto',
        EXTERNAL = 'external',
    }
}

