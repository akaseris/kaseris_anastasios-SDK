import axios from "axios";

export default function apiClient(token) {
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

const getAllMovies = (client) => {
    return client.get('/movies')
        .then(function (response) {
            // handle success
            console.log(response);
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .finally(function () {
            // always executed
        });
}