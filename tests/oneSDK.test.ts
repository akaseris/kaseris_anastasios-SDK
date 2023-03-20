import initOneSDK from '../src';

const oneSDK = initOneSDK(process.env.ONE_API_TOKEN)

describe("all movies", () => {
    it("get movies", async () => {
        const movies = await oneSDK.movies().getAll();
    
        expect(movies).toHaveLength(8);
    });

    it("get movies", async () => {
        const movies = await oneSDK.movies().offset(3).getAll();
    
        expect(movies).toHaveLength(5);
    });

    it("get movies", async () => {
        const movies = await oneSDK.movies().sort("name", "asc").getAll();
    
        expect(movies[0]).not.toBeNull();
        expect(movies[0].name).toBe("The Battle of the Five Armies");
    });

    it("get movies", async () => {
        const movies = await oneSDK.movies().with("budgetInMillions", "<", 200).getAll();
    
        expect(movies).toHaveLength(3);
    });
});