/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Item } from '../models/Item';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DefaultService {
    /**
     * Get a list of items for the authenticated user
     * @returns Item A list of items
     * @throws ApiError
     */
    public static getItems(): CancelablePromise<Array<Item>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/items',
        });
    }
}
