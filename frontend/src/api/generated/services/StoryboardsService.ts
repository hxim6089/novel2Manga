/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Storyboard } from '../models/Storyboard';
import type { StoryboardSummary } from '../models/StoryboardSummary';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class StoryboardsService {
    /**
     * 列出作品的分镜章节
     * 返回指定作品下所有已生成的分镜章节，按照章节编号排序
     * @returns any 分镜列表
     * @throws ApiError
     */
    public static getNovelsStoryboards({
        id,
    }: {
        id: string,
    }): CancelablePromise<{
        items?: Array<StoryboardSummary>;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/novels/{id}/storyboards',
            path: {
                'id': id,
            },
            errors: {
                401: `未授权`,
                403: `无权访问该作品`,
                404: `作品不存在`,
            },
        });
    }
    /**
     * 章节列表 CORS 预检
     * @returns any 预检通过
     * @throws ApiError
     */
    public static optionsNovelsStoryboards({
        id,
    }: {
        id: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'OPTIONS',
            url: '/novels/{id}/storyboards',
            path: {
                'id': id,
            },
        });
    }
    /**
     * 获取分镜详情
     * @returns Storyboard 分镜详情
     * @throws ApiError
     */
    public static getStoryboards({
        id,
    }: {
        id: string,
    }): CancelablePromise<Storyboard> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/storyboards/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * 批量生成面板图像
     * 使用 Imagen 3 批量生成所有面板的图像
     * @returns any 生成任务已启动
     * @throws ApiError
     */
    public static postStoryboardsGenerate({
        id,
        mode = 'preview',
    }: {
        id: string,
        /**
         * 生成模式 (preview: 512x288, hd: 1920x1080)
         */
        mode?: 'preview' | 'hd',
    }): CancelablePromise<{
        jobId?: string;
        status?: string;
        totalPanels?: number;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/storyboards/{id}/generate',
            path: {
                'id': id,
            },
            query: {
                'mode': mode,
            },
        });
    }
}
