export interface SuccessResponse<T> {
    docs: T[];
    total: number;
    limit: number;
    offset: string;
    page: number;
    pages: number;
}
export interface FailedResponse {
    success: false;
    message: string;
}