import { BaseApiResponse } from './baseInterface';
import { HttpStatusCode } from './../enums';
export class BaseController {
    // tslint:disable-next-line:max-line-length
    public sendResponse({ data, message = 'OK', statusCode = HttpStatusCode.OK, status = true }: BaseApiResponse) {
        return { data, message, statusCode, status };
    }
}
