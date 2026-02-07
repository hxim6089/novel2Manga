/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Export } from '../models/Export';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ExportsService {
    /**
     * 创建导出任务
     * 导出漫画为 PDF/Webtoon/资源包
     * @returns any 导出任务已启动
     * @throws ApiError
     */
    public static postExports({
        requestBody,
    }: {
        requestBody: {
            novelId: string;
            /**
             * 导出格式
             */
            format: 'pdf' | 'webtoon' | 'resources';
        },
    }): CancelablePromise<{
        exportId?: string;
        jobId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/exports',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 获取导出结果
     * 返回导出文件的预签名 URL
     * @returns Export 导出详情
     * @throws ApiError
     */
    public static getExports({
        id,
    }: {
        id: string,
    }): CancelablePromise<Export> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/exports/{id}',
            path: {
                'id': id,
            },
        });
    }
}
