import http from "../plugins/http-client.plugin.js";

const getPokemonById = async (id: number) => {
  try {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    const pokemon = await http.get(url);

    return pokemon.name;
  } catch (error) {
    throw `Error fetching pokemon with id ${id}`;
    // console.error(`Error fetching pokemon with id ${id}:`, error);
    // return undefined;
  }
};

export default getPokemonById;

// const getPokemonById = async (id: number) => {
//   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
//   const pokemon = await http.get(url);

//   return pokemon.name;

//   //   const resp = await fetch(url);
//   //   const pokemon = await resp.json();
// };

// export default getPokemonById;
