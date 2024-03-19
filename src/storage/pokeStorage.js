export function obtainStoragePokemonList(offset, limit) {
  const pokemonListKey = `pokemons_${offset}_${limit}`;
  const pokemonList = JSON.parse(localStorage.getItem(pokemonListKey));
  if (pokemonList === null) {
    throw new Error(`Listado de pokemones con offset ${offset} y limite ${limit} no encontrado`);
  }
  return pokemonList;
}

export function obtainStoragePokemon(id) {
  if (id === undefined) {
    throw new Error('Se necesita un identificador para cargar un pokemón');
  }

  const pokemonKey = `pokemon_${id}`;
  const pokemon = JSON.parse(localStorage.getItem(pokemonKey));
  if (pokemon === null) {
    throw new Error(`Pokemon con id ${id} no encontrado`);
  }
  return pokemon;
}

export function savePokemon(id, pokemon) {
  if (id === undefined || typeof pokemon !== 'object') {
    throw new Error('Se necesita un identificador y un pokemon para guardar en localStorage');
  }
  const pokemonKey = `pokemon_${id}`;
  localStorage.setItem(pokemonKey, JSON.stringify(pokemon));
}
