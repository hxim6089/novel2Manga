/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type BibleUploadRequest = {
    filename: string;
    contentType: string;
    scope: BibleUploadRequest.scope;
    /**
     * 角色名称或场景 ID
     */
    target: string;
};
export namespace BibleUploadRequest {
    export enum scope {
        CHARACTER = 'character',
        SCENE = 'scene',
    }
}

