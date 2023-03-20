export function apiClient(token) {
    return {
        // List of all movies.
        movies: () => getAllMovies(),
        
        // Request one specific movie.
        movie: (id) => getOneMovie(),
        
        // Request quote references for one specific movie.
        quote: (id) => getQuote()
        }
}