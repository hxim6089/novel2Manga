/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BibleCharacterAppearance } from './BibleCharacterAppearance';
import type { BibleReferenceImage } from './BibleReferenceImage';
export type UpdateBibleCharacterRequest = {
    role?: UpdateBibleCharacterRequest.role;
    appearance?: BibleCharacterAppearance;
    personality?: Array<string>;
    /**
     * 覆盖后的参考图列表
     */
    referenceImages?: Array<BibleReferenceImage>;
};
export namespace UpdateBibleCharacterRequest {
    export enum role {
        PROTAGONIST = 'protagonist',
        ANTAGONIST = 'antagonist',
        SUPPORTING = 'supporting',
        BACKGROUND = 'background',
    }
}

