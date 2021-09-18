import { HttpStatusCode } from '../enums';

export interface BaseApiResponse {
    data?: any;
    message?: string;
    statusCode?: HttpStatusCode;
    status?: boolean;
    meta?: any;
}

export interface BasePaginatedMeta {
    total: number;
    currentPage: number;
    prevPage?: number;
    nextPage?: number;
    limit: number;
}
