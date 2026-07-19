import { Response } from "express";
type TMeta = {
    page: number;
    limit: number;
    total: number;
};
interface TresponseData<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data: T;
    meta?: TMeta;
}
export declare const sendResponse: <T>(res: Response, data: TresponseData<T>) => void;
export {};
//# sourceMappingURL=sendResponse.d.ts.map