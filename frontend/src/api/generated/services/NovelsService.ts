/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Novel } from '../models/Novel';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class NovelsService {
    /**
     * 获取用户的作品列表
     * @returns any 作品列表
     * @throws ApiError
     */
    public static listNovels({
        limit = 20,
        lastKey,
    }: {
        /**
         * 每页返回的作品数量
         */
        limit?: number,
        /**
         * 分页游标（上一页返回的 lastKey）
         */
        lastKey?: string,
    }): CancelablePromise<{
        items?: Array<Novel>;
        /**
         * 分页游标，用于获取下一页
         */
        lastKey?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/novels',
            query: {
                'limit': limit,
                'lastKey': lastKey,
            },
        });
    }
    /**
     * 创建新作品
     * @returns Novel 作品创建成功
     * @throws ApiError
     */
    public static createNovel({
        requestBody,
    }: {
        requestBody: {
            /**
             * 作品标题
             */
            title: string;
            /**
             * 小说文本内容 (可选,也可以后续上传到S3)
             */
            text?: string;
            metadata?: {
                genre?: string;
                tags?: Array<string>;
            };
        },
    }): CancelablePromise<Novel> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/novels',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
            },
        });
    }
    /**
     * 获取作品详情
     * @returns Novel 作品详情
     * @throws ApiError
     */
    public static getNovels({
        id,
    }: {
        id: string,
    }): CancelablePromise<Novel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/novels/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `作品不存在`,
            },
        });
    }
    /**
     * 删除作品
     * @returns void
     * @throws ApiError
     */
    public static deleteNovels({
        id,
    }: {
        id: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/novels/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `作品不存在`,
            },
        });
    }
    /**
     * 分析小说文本生成分镜
     * 使用 Qwen AI 分析文本，提取角色圣经和分镜大纲
     * @returns any 分析任务已启动
     * @throws ApiError
     */
    public static postNovelsAnalyze({
        id,
        requestBody,
    }: {
        id: string,
        requestBody?: {
            /**
             * 追加章节时提供的内容
             */
            chapter?: {
                /**
                 * 指定章节编号，不填则自动递增
                 */
                number?: number;
                /**
                 * 章节标题（可选）
                 */
                title?: string;
                /**
                 * 新章节的正文内容，提交后将复用现有圣经生成分镜
                 */
                text: string;
            };
            options?: {
                /**
                 * 每页面板数
                 */
                panelsPerPage?: number;
                /**
                 * 漫画风格
                 */
                style?: string;
            };
        },
    }): CancelablePromise<{
        jobId?: string;
        status?: 'pending';
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/novels/{id}/analyze',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                404: `作品不存在`,
            },
        });
    }
}
