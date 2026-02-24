import getPokemonById from "../../src/js-foundation/07-async-await";

describe("js-foundation/07-async-await", () => {
  test("getPokemonById should return a pokemon", async () => {
    const pokemonId = 1;
    const pokemonName = await getPokemonById(pokemonId);

    expect(pokemonName).toBe("bulbasaur");
  });

  test("should return an error if the pokemon does not exist", async () => {
    const pokemonId = 9999;

    try {
      await getPokemonById(pokemonId);
      expect(true).toBeFalsy(); // Force the test to fail if no error is thrown
    } catch (error) {
      expect(error).toBe(`Error fetching pokemon with id ${pokemonId}`);
    }
  });
});
