import { BaseApiResponse } from './baseInterface';
import { HttpStatusCode } from 'enums/httpStatusCode';
export class BaseController {
    // tslint:disable-next-line:max-line-length
    public sendResponse({ data, meta, message = 'OK', statusCode = HttpStatusCode.OK, status = true }: BaseApiResponse) {
        return { data, message, statusCode, status, meta };
    }
}
