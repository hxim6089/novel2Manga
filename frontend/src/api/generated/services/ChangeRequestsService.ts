/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CRDSL } from '../models/CRDSL';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ChangeRequestsService {
    /**
     * 提交修改请求
     * 用户用自然语言描述修改诉求，系统解析为 CR-DSL 并执行
     * @returns any CR 已提交并正在处理
     * @throws ApiError
     */
    public static postChangeRequests({
        requestBody,
    }: {
        requestBody: {
            novelId: string;
            naturalLanguage: string;
        },
    }): CancelablePromise<{
        crId?: string;
        jobId?: string;
        dsl?: CRDSL;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/change-requests',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
