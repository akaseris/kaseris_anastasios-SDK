import  axios, {AxiosInstance} from "axios";

import {SuccessResponse, FailedResponse} from "../models/models"

// General api request structure for handling request sending and response parsing.
abstract class ApiRequest<T> {
    readonly query = new URLSearchParams();

    constructor(public path: string, public client: AxiosInstance) {
    }

    async fetch(): Promise<SuccessResponse<T>> {
        try {
            const resp = await this.client.get(this.path, { params: this.query });

            return resp.data;
        } catch (e) {
            if (axios.isAxiosError(e)) {
                const resp = e.response.data as FailedResponse;

                throw new Error(`Request failed: ${resp.message}`);
            } else {
                throw e;
            }
        }
    }
}
