import { oneSDK } from '../src';

describe("movies", () => {
    it("can get movies", async () => {
        const movies = await oneSDK.movies();
    
        expect(movies).toHaveLength(5);
    });
});
