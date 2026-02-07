/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Character } from '../models/Character';
import type { CharacterConfiguration } from '../models/CharacterConfiguration';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CharactersService {
    /**
     * 获取角色详情 (含所有配置)
     * @returns Character 角色详情
     * @throws ApiError
     */
    public static getCharacters({
        charId,
    }: {
        charId: string,
    }): CancelablePromise<Character> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/characters/{charId}',
            path: {
                'charId': charId,
            },
            errors: {
                404: `角色不存在`,
            },
        });
    }
    /**
     * 更新角色基础信息
     * @returns Character 更新成功
     * @throws ApiError
     */
    public static putCharacters({
        charId,
        requestBody,
    }: {
        charId: string,
        requestBody?: {
            name?: string;
            role?: 'protagonist' | 'antagonist' | 'supporting' | 'background';
            baseInfo?: {
                gender?: 'male' | 'female' | 'other';
                age?: number;
                personality?: Array<string>;
            };
        },
    }): CancelablePromise<Character> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/characters/{charId}',
            path: {
                'charId': charId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 列举角色的所有配置
     * @returns CharacterConfiguration 配置列表
     * @throws ApiError
     */
    public static getCharactersConfigurations({
        charId,
    }: {
        charId: string,
    }): CancelablePromise<Array<CharacterConfiguration>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/characters/{charId}/configurations',
            path: {
                'charId': charId,
            },
        });
    }
    /**
     * 创建新配置
     * 为角色创建新的配置 (如"战斗模式"、"日常装扮")
     * @returns CharacterConfiguration 配置创建成功
     * @throws ApiError
     */
    public static postCharactersConfigurations({
        charId,
        requestBody,
    }: {
        charId: string,
        requestBody: {
            name: string;
            description: string;
            tags?: Array<string>;
            /**
             * 该配置的外貌描述
             */
            appearance?: Record<string, any>;
            isDefault?: boolean;
        },
    }): CancelablePromise<CharacterConfiguration> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/characters/{charId}/configurations',
            path: {
                'charId': charId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 获取配置详情
     * @returns CharacterConfiguration 配置详情
     * @throws ApiError
     */
    public static getCharactersConfigurations1({
        charId,
        configId,
    }: {
        charId: string,
        configId: string,
    }): CancelablePromise<CharacterConfiguration> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/characters/{charId}/configurations/{configId}',
            path: {
                'charId': charId,
                'configId': configId,
            },
        });
    }
    /**
     * 更新配置
     * @returns CharacterConfiguration 更新成功
     * @throws ApiError
     */
    public static putCharactersConfigurations({
        charId,
        configId,
        requestBody,
    }: {
        charId: string,
        configId: string,
        requestBody?: {
            name?: string;
            description?: string;
            tags?: Array<string>;
            appearance?: Record<string, any>;
        },
    }): CancelablePromise<CharacterConfiguration> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/characters/{charId}/configurations/{configId}',
            path: {
                'charId': charId,
                'configId': configId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * 删除配置
     * @returns void
     * @throws ApiError
     */
    public static deleteCharactersConfigurations({
        charId,
        configId,
    }: {
        charId: string,
        configId: string,
    }): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/characters/{charId}/configurations/{configId}',
            path: {
                'charId': charId,
                'configId': configId,
            },
        });
    }
    /**
     * 上传配置的参考图
     * 为指定配置上传多张参考图
     * @returns any 上传成功
     * @throws ApiError
     */
    public static postCharactersConfigurationsRefs({
        charId,
        configId,
        formData,
    }: {
        charId: string,
        configId: string,
        formData: {
            /**
             * 参考图文件 (最多10张)
             */
            images?: Array<Blob>;
        },
    }): CancelablePromise<{
        uploaded?: Array<{
            s3Key?: string;
            url?: string;
            caption?: string;
        }>;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/characters/{charId}/configurations/{configId}/refs',
            path: {
                'charId': charId,
                'configId': configId,
            },
            formData: formData,
            mediaType: 'multipart/form-data',
        });
    }
    /**
     * 生成配置的标准像
     * 为指定配置生成多视角标准像 (使用 Imagen 3)
     * @returns any 生成任务已启动
     * @throws ApiError
     */
    public static postCharactersConfigurationsPortraits({
        charId,
        configId,
    }: {
        charId: string,
        configId: string,
    }): CancelablePromise<{
        jobId?: string;
        message?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/characters/{charId}/configurations/{configId}/portraits',
            path: {
                'charId': charId,
                'configId': configId,
            },
        });
    }
}
