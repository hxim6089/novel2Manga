/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BibleCharacter } from './BibleCharacter';
import type { BibleMetadata } from './BibleMetadata';
import type { BibleScene } from './BibleScene';
export type Bible = {
    /**
     * 作品 ID
     */
    novelId: string;
    /**
     * 圣经版本号
     */
    version: number;
    /**
     * 角色圣经
     */
    characters: Array<BibleCharacter>;
    /**
     * 场景圣经
     */
    scenes: Array<BibleScene>;
    metadata: BibleMetadata;
};

