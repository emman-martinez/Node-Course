import { http } from "../plugins/index.js";

const getPokemonById = async (id: number) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
  const pokemon = await http.get(url);

  return pokemon.name;

  //   const resp = await fetch(url);
  //   const pokemon = await resp.json();
};

export default getPokemonById;
