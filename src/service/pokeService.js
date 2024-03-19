/* eslint-disable import/extensions */
import { obtainNewPokemon, obtainNewPokemonList } from '../api/pokeAPI.js';
import { mapOutPokemon } from '../mappers/pokeMapper.js';
import { obtainStoragePokemonList, obtainStoragePokemon, savePokemon } from '../storage/pokeStorage.js';

export async function obtainPokemonList(offset = 0, limit = 20) {
  let pokemonList;
  try {
    pokemonList = obtainStoragePokemonList(offset, limit);
  } catch (error) {
    pokemonList = await obtainNewPokemonList(offset, limit);
  }
  return pokemonList;
}

export async function obtainPokemon(id) {
  let pokemon;
  try {
    pokemon = obtainStoragePokemon(id);
  } catch (error) {
    const pokemonData = await obtainNewPokemon(id);
    pokemon = mapOutPokemon(pokemonData);
    savePokemon(id, pokemon);
  }
  return pokemon;
}
