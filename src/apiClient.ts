import  axios, {AxiosInstance} from "axios";

import {SuccessResponse, FailedResponse} from "../models/models"

type ItemType<T> = T extends (infer TItem)[] ? TItem : T;

// General api request structure for handling request sending and response parsing.
abstract class GeneralRequest<T> {
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

// Request structure for a single item.
class SingleRequest<T> extends GeneralRequest<T> {
    async get(): Promise<T> {
        const { docs } = await this.fetch();

        if (docs.length == 0) {
            throw new Error("No items in response");
        }

        return docs[0];
    }
}

// Request structure for multiple response items and response manipulation (pagination, filtering and sorting).
class ExtendedRequest<T> extends GeneralRequest<T> {
    // Limit response to n number of results
    limit(n: number): Omit<this, "limit"> {
        this.query.set("limit", String(n));
        return this;
    }

    //Response page specification
    page(n: number): Omit<this, "page"> {
        this.query.set("page", String(n));
        return this;
    }

    //Offset response items
    offset(n: number): Omit<this, "offset"> {
        this.query.set("offset", String(n));
        return this;
    }

    // Response items sorting based on field and type for ascending or descending
    sort(field: keyof ItemType<T>, type: "asc" | "desc" = "asc"): Omit<this, "sort"> {
        this.query.set("sort", `${String(field)}:${type}`);
        return this;
    }

    // Filtering parameters for field comparison
    with<TField extends keyof ItemType<T>>(field: TField, op: "==" | "!=" | ">" | "<" | ">=" | "<=" | "in" | "not in", value: any): this {
        const fieldStr = String(field);
        const valueStr = Array.isArray(value) ? value.join(",") : String(value);

        switch (op) {
            case "==":
                this.query.set(fieldStr, valueStr);
                break;
            case "!=":
                this.query.set(fieldStr + "!", valueStr);
                break;

            case ">":
            case "<":
                this.query.set(`${fieldStr}${op}${valueStr}`, "");
                break;

            case ">=":
            case "<=":
                this.query.set(fieldStr + op[0], valueStr);
                break;
        }

        return this;
    }

    // Filtering parameters for a field existense or non existense
    withExists<TField extends keyof ItemType<T>>(field: TField): this {
        this.query.set(String(field), "");
        return this;
    }
    withNotExists<TField extends keyof ItemType<T>>(field: TField): this {
        this.query.set("!" + String(field), "");
        return this;
    }

    // Get a single page.
    async get(): Promise<T[]> {
        const { docs } = await this.fetch();

        return docs;
    }

    // Get all the results.
    async getAll(): Promise<T[]> {
        const items: T[] = [];
        let query = this;

        while (true) {
            const resp = await query.fetch();
            items.push(...resp.docs);

            if (resp.page == resp.pages)
                break;

            query = this.page(resp.page + 1) as this;
        }

        return items;
    }
}