/* eslint-disable import/prefer-default-export */
export function showPokemonList(pokemones, callbackPokemonSelected = () => {}) {
  const $list = document.querySelector('#pokemon-list');
  $list.innerHTML = '';

  pokemones.forEach((pokemon) => {
    const $item = document.createElement('a');
    $item.href = '#';
    $item.classList.add('pokemons');
    $item.textContent = pokemon.name;
    $item.dataset.base = pokemon.name;
    $item.addEventListener('click', () => {
      const $activeItem = document.querySelector('.active');
      if ($activeItem) {
        $activeItem.classList.remove('active');
      }
      $item.classList.add('active');
      callbackPokemonSelected(pokemon.name);
    });
    $list.appendChild($item);
  });
}
