const URL = 'https://pokeapi.co/api/v2/pokemon/';

export async function obtainNewPokemon(id) {
  if (id === undefined) {
    throw new Error('Se necesita un identificador para cargar un pokemón');
  }
  return (await fetch(`${URL}${id}`)).json();
}

export async function obtainNewPokemonList(limit, offset) {
  return (await fetch(`${URL}?limit=${limit}&offset=${offset}`)).json();
}
