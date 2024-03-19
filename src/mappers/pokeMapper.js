/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
import Pokemon from '../entities/pokemon.js';
import Stat from '../entities/stats.js';

export function mapOutPokemon(datosApi) {
  const {
    id,
    name,
    weight,
    sprites: { front_default: mainPhoto },
    sprites: { front_shiny: secondaryPhoto },
    types,
    abilities,
    moves,
    stats,
  } = datosApi;

  return new Pokemon(
    id,
    name,
    weight,
    mainPhoto,
    secondaryPhoto,
    abilities.map((item) => item.ability.name),
    types.map((item) => item.type.name),
    moves.map((item) => item.move.name),
    stats.map((item) => new Stat(
      item.stat.name,
      item.base_stat,
    )),
  );
}
