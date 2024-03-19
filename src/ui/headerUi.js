/* eslint-disable import/prefer-default-export */
export function showTotalPokemons(totalPokemons) {
  document.querySelector('#total-pokemons').innerHTML = `Pokemon count: ${totalPokemons}`;
}
