/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BibleMetadata = {
    createdAt: string;
    updatedAt: string;
    lastChapter: number;
    totalCharacters: number;
    totalScenes: number;
    /**
     * 如果圣经存储在 S3 中，则为 S3 URI
     */
    storageLocation?: string;
    /**
     * 最近一次修改圣经的用户（system 表示自动任务）
     */
    updatedBy?: string | null;
};

