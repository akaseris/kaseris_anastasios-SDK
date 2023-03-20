import initOneSDK from '../src';

const oneSDK = initOneSDK(process.env.ONE_API_TOKEN)

// Test group for /movie endpoint
describe("all movies", () => {
    it("get all movies", async () => {
        const movies = await oneSDK.movies().getAll();
    
        expect(movies).toHaveLength(8);
    });

    it("get movies with offset", async () => {
        const movies = await oneSDK.movies().offset(3).getAll();
    
        expect(movies).toHaveLength(5);
    });

    it("get movies with sorting", async () => {
        const movies = await oneSDK.movies().sort("name", "asc").getAll();
    
        expect(movies[0]).not.toBeNull();
        expect(movies[0].name).toBe("The Battle of the Five Armies");
    });

    it("get movies with comparison operator", async () => {
        const movies = await oneSDK.movies().with("budgetInMillions", "<", 200).getAll();
    
        expect(movies).toHaveLength(3);
    });
});

// Test group for /movie/{id endpoint}
describe("one movie by id", () => {
    it("get movie, name check", async () => {
        const movie = await oneSDK.movie("5cd95395de30eff6ebccde5d").get();
    
        expect(movie).not.toBeNull();
        expect(movie.name).toBe("The Return of the King");
    });

    it("get movie, budget check", async () => {
        const movie = await oneSDK.movie("5cd95395de30eff6ebccde5d").get();
    
        expect(movie).not.toBeNull();
        expect(movie.budgetInMillions).toBe(94);
    });

    it("get movie, budget check", async () => {
        const movie = await oneSDK.movie("5cd95395de30eff6ebccde5d").get();
    
        expect(movie).not.toBeNull();
        expect(movie.academyAwardWins).toBe(11);
    });
});