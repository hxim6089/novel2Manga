/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BibleFirstAppearance } from './BibleFirstAppearance';
import type { BibleReferenceImage } from './BibleReferenceImage';
export type BibleScene = {
    /**
     * 场景 ID
     */
    id: string;
    name: string;
    type: BibleScene.type;
    description: string;
    visualCharacteristics?: {
        architecture?: string;
        keyLandmarks?: Array<string>;
        colorScheme?: string;
        lighting?: {
            naturalLight?: string;
            artificialLight?: string;
            lightSources?: Array<string>;
        };
        atmosphere?: string;
        soundscape?: Array<string>;
        textures?: Array<string>;
    };
    spatialLayout?: {
        size?: string;
        layout?: string;
        keyAreas?: Array<{
            name?: string;
            position?: string;
        }>;
    };
    timeVariations?: Array<{
        timeOfDay?: string;
        description?: string;
    }>;
    weatherVariations?: Array<{
        weather?: string;
        description?: string;
    }>;
    narrativeRole?: string;
    firstAppearance?: BibleFirstAppearance;
    /**
     * 场景参考图列表
     */
    referenceImages?: Array<BibleReferenceImage>;
    updatedAt?: string;
    updatedBy?: string | null;
};
export namespace BibleScene {
    export enum type {
        INDOOR = 'indoor',
        OUTDOOR = 'outdoor',
        INDOOR_OUTDOOR = 'indoor-outdoor',
        NATURAL = 'natural',
        URBAN = 'urban',
        RURAL = 'rural',
        FANTASY = 'fantasy',
        ABSTRACT = 'abstract',
    }
}

