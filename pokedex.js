/* eslint-disable import/prefer-default-export */
/* eslint-disable import/extensions */
/* eslint-disable no-use-before-define */
import { obtainPokemon, obtainPokemonList } from './src/service/pokeService.js';
import { showPager } from './src/ui/pager.js';
import { showPokemonList } from './src/ui/pokemonListUi.js';
import { showPokemon } from './src/ui/pokemonCardUi.js';
import { obtainUrlParameters } from './src/utilities/utilities.js';
import { showTotalPokemons } from './src/ui/headerUi.js';

export async function initialization() {
  handlePage(1);
}

async function handlePage(page) {
  showLoading();
  const POKEMONS_PER_PAGE = 21;
  let limit = POKEMONS_PER_PAGE;
  let offset;
  let actualPage;

  if (typeof page === 'number') {
    offset = POKEMONS_PER_PAGE * (page - 1);
    actualPage = page;
  } else {
    const parameters = obtainUrlParameters(page);
    offset = parameters.offset;
    limit = parameters.limit;
    actualPage = Math.ceil(parameters.offset / parameters.limit) + 1;
  }

  const pokemonList = await obtainPokemonList(limit, offset);
  showTotalPokemons(pokemonList.count);
  showPager(
    pokemonList.count,
    actualPage,
    pokemonList.previous,
    pokemonList.next,
    handlePage,
  );
  showPokemonList(pokemonList.results, update);
  hiddenLoading();
}

async function update() {
  showLoading();
  const pokemon = await obtainPokemon(selectPokemon());
  showPokemon(pokemon);
  hiddenLoading();
}

function selectPokemon() {
  const $activeItem = document.querySelector('.active');
  const pokemon = $activeItem.dataset.base;
  if ($activeItem) {
    return pokemon;
  }
  return undefined;
}

function showLoading() {
  document.querySelector('#loading').classList.remove('d-none');
}

function hiddenLoading() {
  document.querySelector('#loading').classList.add('d-none');
}
