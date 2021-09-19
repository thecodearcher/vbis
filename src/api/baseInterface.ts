import { User as UserModel } from './Domains/User/models/userModel';
import { HttpStatusCode } from 'enums/httpStatusCode';

declare global {
    namespace Express {
        // tslint:disable-next-line:no-empty-interface
        interface User extends UserModel { }
    }
}

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
    totalPages: number;
}
