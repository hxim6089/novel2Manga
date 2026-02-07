/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EdgeProbeResult } from '../models/EdgeProbeResult';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class EdgeDiagnosticsService {
    /**
     * Edge probe endpoint - returns request headers (public endpoint)
     * Public endpoint that returns information about the received HTTP request,
     * including headers and request context. Useful for debugging CDN and edge routing.
     * This endpoint does not require authentication.
     *
     * @returns EdgeProbeResult Request header information
     * @throws ApiError
     */
    public static getEdgeProbe(): CancelablePromise<EdgeProbeResult> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/edge-probe',
            errors: {
                500: `Internal server error`,
            },
        });
    }
}
