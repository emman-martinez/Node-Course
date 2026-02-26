const getPokemonById = async (id) => {
    const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
    return (fetch(url)
        .then((response) => response.json())
        // .then(() => {
        //   throw new Error("Simulated error");
        // })
        .then((data) => data.name));
};
export default getPokemonById;
//# sourceMappingURL=06-promises.js.map