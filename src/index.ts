import axios from "axios";

import getAllMovies from "./apiClient";

/*
 * This is a sdk for an existing Lord of the Rings API.
 *
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
        movies: () => getAllMovies(client),
        
        // Request one specific movie.
        movie: (id) => getOneMovie(id, client),
        
        // Request all quotes for one specific movie.
        quote: (id) => getQuote(id, quote, client)
        }
}