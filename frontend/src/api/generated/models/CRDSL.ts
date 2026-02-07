/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
/**
 * Change Request Domain-Specific Language
 */
export type CRDSL = {
    scope: CRDSL.scope;
    targetId?: string;
    type: CRDSL.type;
    ops: Array<{
        action: 'inpaint' | 'outpaint' | 'bg_swap' | 'repose' | 'regen_panel' | 'rewrite_dialogue' | 'reorder';
        params?: Record<string, any>;
    }>;
};
export namespace CRDSL {
    export enum scope {
        GLOBAL = 'global',
        CHARACTER = 'character',
        PANEL = 'panel',
        PAGE = 'page',
    }
    export enum type {
        ART = 'art',
        DIALOGUE = 'dialogue',
        LAYOUT = 'layout',
        STYLE = 'style',
    }
}

