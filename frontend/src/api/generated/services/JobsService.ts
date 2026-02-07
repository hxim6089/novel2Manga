/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Job } from '../models/Job';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class JobsService {
    /**
     * 获取用户的任务列表
     * 返回当前用户的任务集合，支持分页、类型与状态筛选。
     * @returns any 任务列表
     * @throws ApiError
     */
    public static listJobs({
        limit = 20,
        lastKey,
        type,
        status,
    }: {
        /**
         * 每页返回的任务数量
         */
        limit?: number,
        /**
         * 分页游标（上一页返回的 lastKey）
         */
        lastKey?: string,
        /**
         * 任务类型过滤
         */
        type?: 'analyze' | 'generate_preview' | 'generate_hd' | 'change_request' | 'panel_edit' | 'export_pdf' | 'export_webtoon' | 'export_resources' | 'generate_portrait',
        /**
         * 任务状态过滤
         */
        status?: 'pending' | 'in_progress' | 'completed' | 'failed',
    }): CancelablePromise<{
        items?: Array<Job>;
        /**
         * 下一页查询所需的游标
         */
        lastKey?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jobs',
            query: {
                'limit': limit,
                'lastKey': lastKey,
                'type': type,
                'status': status,
            },
        });
    }
    /**
     * 查询任务进度
     * @returns Job 任务详情
     * @throws ApiError
     */
    public static getJob({
        id,
    }: {
        id: string,
    }): CancelablePromise<Job> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/jobs/{id}',
            path: {
                'id': id,
            },
        });
    }
}
