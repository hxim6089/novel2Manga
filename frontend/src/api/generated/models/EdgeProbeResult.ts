/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EdgeProbeResult = {
    /**
     * Host header received by the server
     */
    receivedHost: string;
    /**
     * Domain from request context
     */
    requestContextDomain: string;
    /**
     * HTTP method
     */
    method: string;
    /**
     * Request path
     */
    path: string;
    /**
     * All received HTTP headers
     */
    headers?: Record<string, string>;
    /**
     * Request timestamp
     */
    timestamp?: string;
};

