/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Panel } from '../models/Panel';
import type { UpdatePanelRequest } from '../models/UpdatePanelRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PanelsService {
    /**
     * 获取面板详情
     * @returns Panel 面板详情
     * @throws ApiError
     */
    public static getPanels({
        panelId,
    }: {
        panelId: string,
    }): CancelablePromise<Panel> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/panels/{panelId}',
            path: {
                'panelId': panelId,
            },
        });
    }
    /**
     * 更新面板文本内容
     * 编辑分镜的场景描述、机位、角色与对白等文本信息
     * @returns Panel 更新后的面板
     * @throws ApiError
     */
    public static patchPanels({
        panelId,
        requestBody,
    }: {
        panelId: string,
        requestBody: UpdatePanelRequest,
    }): CancelablePromise<Panel> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/panels/{panelId}',
            path: {
                'panelId': panelId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
                404: `面板不存在`,
            },
        });
    }
    /**
     * 编辑面板
     * 使用 Imagen 3 编辑 API (inpaint/outpaint/bg_swap)
     * @returns any 编辑任务已启动
     * @throws ApiError
     */
    public static postPanelsEdit({
        panelId,
        requestBody,
    }: {
        panelId: string,
        requestBody: {
            editMode: 'inpaint' | 'outpaint' | 'bg_swap';
            /**
             * 编辑指令
             */
            instruction: string;
            /**
             * 遮罩图 (Base64 或 S3 URL)
             */
            mask?: string;
        },
    }): CancelablePromise<{
        jobId?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/panels/{panelId}/edit',
            path: {
                'panelId': panelId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
}
