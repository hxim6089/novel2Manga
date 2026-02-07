/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Bible } from '../models/Bible';
import type { BibleCharacter } from '../models/BibleCharacter';
import type { BibleHistoryEntry } from '../models/BibleHistoryEntry';
import type { BibleScene } from '../models/BibleScene';
import type { BibleUploadRequest } from '../models/BibleUploadRequest';
import type { BibleUploadResponse } from '../models/BibleUploadResponse';
import type { UpdateBibleCharacterRequest } from '../models/UpdateBibleCharacterRequest';
import type { UpdateBibleSceneRequest } from '../models/UpdateBibleSceneRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class BibleService {
    /**
     * 获取作品圣经
     * 返回指定作品最新版本的角色圣经和场景圣经
     * @returns Bible 当前圣经信息
     * @throws ApiError
     */
    public static getNovelsBible({
        id,
        version,
    }: {
        id: string,
        /**
         * 指定版本号，不提供时返回最新版本
         */
        version?: number,
    }): CancelablePromise<Bible> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/novels/{id}/bible',
            path: {
                'id': id,
            },
            query: {
                'version': version,
            },
            errors: {
                400: `请求参数错误`,
                404: `未找到对应圣经`,
            },
        });
    }
    /**
     * 获取圣经版本历史
     * 返回指定作品的圣经版本列表
     * @returns BibleHistoryEntry 圣经版本列表
     * @throws ApiError
     */
    public static getNovelsBibleHistory({
        id,
    }: {
        id: string,
    }): CancelablePromise<Array<BibleHistoryEntry>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/novels/{id}/bible/history',
            path: {
                'id': id,
            },
        });
    }
    /**
     * 更新角色圣经条目
     * @returns BibleCharacter 更新后的角色条目
     * @throws ApiError
     */
    public static patchNovelsBibleCharacters({
        id,
        characterName,
        requestBody,
    }: {
        id: string,
        characterName: string,
        requestBody: UpdateBibleCharacterRequest,
    }): CancelablePromise<BibleCharacter> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/novels/{id}/bible/characters/{characterName}',
            path: {
                'id': id,
                'characterName': characterName,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
                404: `未找到对应圣经或角色`,
            },
        });
    }
    /**
     * 更新场景圣经条目
     * @returns BibleScene 更新后的场景条目
     * @throws ApiError
     */
    public static patchNovelsBibleScenes({
        id,
        sceneId,
        requestBody,
    }: {
        id: string,
        sceneId: string,
        requestBody: UpdateBibleSceneRequest,
    }): CancelablePromise<BibleScene> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/novels/{id}/bible/scenes/{sceneId}',
            path: {
                'id': id,
                'sceneId': sceneId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
                404: `未找到对应圣经或场景`,
            },
        });
    }
    /**
     * 申请参考图上传地址
     * @returns BibleUploadResponse 上传信息
     * @throws ApiError
     */
    public static postNovelsBibleUploads({
        id,
        requestBody,
    }: {
        id: string,
        requestBody: BibleUploadRequest,
    }): CancelablePromise<BibleUploadResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/novels/{id}/bible/uploads',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `请求参数错误`,
            },
        });
    }
}
