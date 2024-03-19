/* eslint-disable no-param-reassign */
/* eslint-disable import/prefer-default-export */
/* eslint-disable no-use-before-define */
export function showPokemon(pokemon) {
  cardConstructor(pokemon);
  enablePokemonCard();
  document.querySelector('#button').addEventListener('click', () => {
    disablePokemonCard();
  });
}

function cardConstructor(pokemon) {
  document.querySelector('.name h2').textContent = pokemon.name.toUpperCase();
  document.querySelector('.main_img img').src = pokemon.mainPhoto;
  document.querySelector('.secondary_img img').src = pokemon.secondaryPhoto;
  document.querySelector('.power h6').textContent = `${pokemon.stats[0].value} HP`;
  document.querySelector('.description h3').textContent = `N°${pokemon.id} ${pokemon.types} Pokemon Weight: ${pokemon.weight}g`;
  document.querySelector('.attack h3').textContent = `💥Attack: ${pokemon.stats[1].value}`;
  document.querySelector('.defense h3').textContent = `🛑Defense: ${pokemon.stats[2].value}`;
  document.querySelector('.speed h3').textContent = `💨Speed: ${pokemon.stats[5].value}`;
  document.querySelector('.abilities h4').textContent = `Abilities: ${pokemon.abilities}`;
  if (pokemon.moves.length > 0) {
    pokemon.moves.length = 3;
    document.querySelector('.moves h4').textContent = `Moves: ${pokemon.moves}`;
  }
}

function enablePokemonCard() {
  document.querySelector('#card').classList.remove('d-none');
  document.querySelector('#button').classList.remove('d-none');
  document.querySelector('#pokemon-list').classList.add('disabled');
  document.querySelector('#pager').classList.add('disabled');
}

function disablePokemonCard() {
  document.querySelector('#card').classList.add('d-none');
  document.querySelector('#button').classList.add('d-none');
  document.querySelector('#pokemon-list').classList.remove('disabled');
  document.querySelector('#pager').classList.remove('disabled');
}
