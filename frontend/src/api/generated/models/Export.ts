/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type Export = {
    id: string;
    novelId: string;
    format: Export.format;
    status: Export.status;
    /**
     * 预签名 URL
     */
    fileUrl?: string;
    fileSize?: number;
    createdAt?: string;
};
export namespace Export {
    export enum format {
        PDF = 'pdf',
        WEBTOON = 'webtoon',
        RESOURCES = 'resources',
    }
    export enum status {
        PENDING = 'pending',
        PROCESSING = 'processing',
        COMPLETED = 'completed',
        FAILED = 'failed',
    }
}

