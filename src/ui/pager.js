/* eslint-disable no-use-before-define */
/* eslint-disable max-len */
export function showPager(totalPokemons, actualPage, previousUrl, nextUrl, callbackSelectedPage = () => {}) {
  const POKEMONS_PER_PAGE = 21;
  const $pager = document.querySelector('#pager');
  $pager.innerHTML = '';

  const totalPages = Math.ceil(totalPokemons / POKEMONS_PER_PAGE);

  const $previousPage = createPagerItem('Previous', previousUrl);

  if (previousUrl) {
    $previousPage.classList.remove('disabled');
  } else {
    $previousPage.classList.add('disabled');
  }
  $pager.appendChild($previousPage);

  for (let i = 0; i < totalPages; i += 1) {
    const numeroPagina = i + 1;
    const $pagina = createPagerItem(numeroPagina);
    if (numeroPagina === actualPage) {
      $pagina.classList.add('active');
    }
    $pager.appendChild($pagina);
  }

  const $nextPage = createPagerItem('Next', nextUrl);

  if (nextUrl) {
    $nextPage.classList.remove('disabled');
  } else {
    $nextPage.classList.add('disabled');
  }
  $pager.appendChild($nextPage);

  $pager.onclick = (e) => {
    handlePageChange(e, callbackSelectedPage);
  };
}

export function handlePageChange(e, callbackSelectedPage = () => {}) {
  e.preventDefault();
  const { target } = e;
  const href = target.getAttribute('href');
  let pageNumber;
  const { pagina } = target.dataset;
  if (href === '#') {
    pageNumber = Number(pagina);
    callbackSelectedPage(pageNumber);
  } else {
    callbackSelectedPage(href);
  }
}

function createPagerItem(texto, url = '#') {
  const $item = document.createElement('li');
  const $link = document.createElement('a');
  $item.className = 'page-item';
  $link.className = 'page-link';
  $link.textContent = texto;
  $link.href = url;
  $link.dataset.pagina = texto;

  $item.appendChild($link);

  return $item;
}
