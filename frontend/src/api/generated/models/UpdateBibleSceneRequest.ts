/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BibleReferenceImage } from './BibleReferenceImage';
export type UpdateBibleSceneRequest = {
    name?: string;
    description?: string;
    visualCharacteristics?: Record<string, any>;
    spatialLayout?: Record<string, any>;
    timeVariations?: Array<Record<string, any>>;
    weatherVariations?: Array<Record<string, any>>;
    /**
     * 覆盖后的参考图列表
     */
    referenceImages?: Array<BibleReferenceImage>;
};

