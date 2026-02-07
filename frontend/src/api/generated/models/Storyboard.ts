/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Panel } from './Panel';
export type Storyboard = {
    id: string;
    novelId: string;
    /**
     * 分镜所属章节编号
     */
    chapterNumber?: number;
    version: number;
    totalPages?: number;
    panelCount?: number;
    panels?: Array<Panel>;
    createdAt?: string;
};

