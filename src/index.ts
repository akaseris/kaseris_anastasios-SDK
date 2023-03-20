import axios from "axios";

import { Movie, Quote } from "../models/models";
import {SingleRequest, ExtendedRequest} from "./apiClient";

/*
 * This is a sdk wrapper for an existing Lord of the Rings API.
 */
export default function initOneSDK(token) {
    const client = axios.create({
        baseURL: "https://the-one-api.dev/v2",
        headers: {
            "Authorization": `Bearer ${token}`
        }
    });

    return {
        // List of all movies.
        movies: () => new ExtendedRequest<Movie>("movie", client),
        
        // Requests for one specific movie.
        movie: (id: string) => new class MovieRequest extends SingleRequest<Movie> {
            constructor() { super(`movie/${id}`, client) }

            // Request for all movie quotes on a movie.
            quotes() {
                return new ExtendedRequest<Quote>(this.path + "/quote", client);
            }
        }
        }
}