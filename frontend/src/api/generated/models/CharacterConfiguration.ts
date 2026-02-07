/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type CharacterConfiguration = {
    id: string;
    charId: string;
    novelId?: string;
    /**
     * 配置名称
     */
    name: string;
    /**
     * 配置的详细描述
     */
    description?: string;
    tags?: Array<string>;
    /**
     * 外貌描述
     */
    appearance?: {
        hairStyle?: string;
        hairColor?: string;
        eyeColor?: string;
        clothing?: Array<string>;
        accessories?: Array<string>;
    };
    referenceImages?: Array<{
        s3Key?: string;
        url?: string;
        caption?: string;
        uploadedAt?: string;
    }>;
    generatedPortraits?: Array<{
        view?: 'front' | 'side' | 'three-quarter' | '45-degree' | 'full-body';
        url?: string;
        s3Key?: string;
        generatedAt?: string;
    }>;
    isDefault?: boolean;
    createdAt?: string;
    updatedAt?: string;
};

