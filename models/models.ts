export interface Movie {
    _id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
}

export interface Quote {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
}

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