/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BibleCharacterAppearance } from './BibleCharacterAppearance';
import type { BibleFirstAppearance } from './BibleFirstAppearance';
import type { BibleReferenceImage } from './BibleReferenceImage';
export type BibleCharacter = {
    /**
     * 角色名称
     */
    name: string;
    role: BibleCharacter.role;
    appearance?: BibleCharacterAppearance;
    personality?: Array<string>;
    firstAppearance?: BibleFirstAppearance;
    /**
     * 角色参考图列表
     */
    referenceImages?: Array<BibleReferenceImage>;
    updatedAt?: string;
    updatedBy?: string | null;
};
export namespace BibleCharacter {
    export enum role {
        PROTAGONIST = 'protagonist',
        ANTAGONIST = 'antagonist',
        SUPPORTING = 'supporting',
        BACKGROUND = 'background',
    }
}

