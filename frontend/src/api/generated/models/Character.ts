/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CharacterConfiguration } from './CharacterConfiguration';
export type Character = {
    id: string;
    /**
     * 角色名称
     */
    name: string;
    role?: Character.role;
    novelId: string;
    baseInfo?: {
        gender?: Character.gender;
        age?: number;
        personality?: Array<string>;
    };
    /**
     * 角色的所有配置
     */
    configurations?: Array<CharacterConfiguration>;
    portraits?: Array<{
        view?: string;
        s3Key?: string;
        generatedAt?: string;
    }>;
    defaultConfigId?: string;
    createdAt?: string;
    updatedAt?: string;
};
export namespace Character {
    export enum role {
        PROTAGONIST = 'protagonist',
        ANTAGONIST = 'antagonist',
        SUPPORTING = 'supporting',
        BACKGROUND = 'background',
    }
    export enum gender {
        MALE = 'male',
        FEMALE = 'female',
        OTHER = 'other',
    }
}

