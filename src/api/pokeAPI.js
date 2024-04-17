export const URL = 'https://pokeapi.co/api/v2/pokemon/';
export const POKEMONS_PER_PAGE = 21;

export async function obtainNewPokemon(id) {
  if (id === undefined) {
    throw new Error('Se necesita un identificador para cargar un pokemón');
  }
  return (await fetch(`${URL}${id}`)).json();
}

export async function obtainNewPokemonList(limit = POKEMONS_PER_PAGE, offset = 0) {
  return (await fetch(`${URL}?limit=${limit}&offset=${offset}`)).json();
}
