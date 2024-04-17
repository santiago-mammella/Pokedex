/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/// <reference types='Cypress' />

describe('Pokedex', () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });

    cy.intercept('https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0', { fixture: 'list-page-1.json' }).as('obtainFirstPage');

    cy.visit('http://127.0.0.1:8080', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });

  it('Initial conditions', () => {
    const TOTAL_POKEMONS = 1302;
    const TOTAL_PAGES = 62;
    const POKEMONS_PER_PAGE = 21;

    cy.get('#total-pokemons')
      .should('have.text', `Pokemon count: ${TOTAL_POKEMONS}`);

    cy.get('.page-link')
      .should('have.length', TOTAL_PAGES + 2);
    cy.get('.page-item:first-child')
      .should('have.class', 'disabled');
    cy.get('.page-item:last-child')
      .should('not.have.class', 'disabled');

    cy.get('.pokemons')
      .should('have.length', POKEMONS_PER_PAGE);
  });

  it('Use pager', () => {
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0', { fixture: 'list-page-1.json' }).as('obtainFirstPage');
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?limit=21&offset=21', { fixture: 'list-page-2.json' }).as('obtainSecondPage');
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?limit=21&offset=1281', { fixture: 'list-page-62.json' }).as('obtainLastPage');
    cy.visit('http://127.0.0.1:8080');

    cy.get('.page-item:first-child')
      .as('previousPage')
      .should('have.class', 'disabled');
    cy.get('.page-item:last-child')
      .as('nextPage')
      .should('not.have.class', 'disabled');

    cy.get('@nextPage')
      .click();
    cy.get('@previousPage')
      .should('not.have.class', 'disabled');
    cy.get('@nextPage')
      .should('not.have.class', 'disabled');

    cy.get('@previousPage')
      .click();
    cy.get('@previousPage')
      .should('have.class', 'disabled');
    cy.get('@nextPage')
      .should('not.have.class', 'disabled');

    cy.get('.page-link')
      .eq(-2)
      .as('lasPage')
      .click();
    cy.get('@previousPage')
      .should('not.have.class', 'disabled');
    cy.get('@nextPage')
      .should('have.class', 'disabled');

    cy.get('.page-link')
      .eq(1)
      .as('firstPage')
      .click();
  });

  it('Show Selected Pokemon', () => {
    const POKEMON_NAME = 'BULBASAUR';
    const BASE_STAT = '45 HP';
    cy.intercept('https://pokeapi.co/api/v2/pokemon/?limit=21&offset=0', { fixture: 'list-page-1.json' }).as('obtainFirstPage');
    cy.intercept('https://pokeapi.co/api/v2/pokemon/bulbasaur', { fixture: 'bulbasur.json' }).as('obtainBulbasur');
    cy.visit('http://127.0.0.1:8080');

    cy.get('#card')
      .as('pokemonCard')
      .should('have.class', 'd-none');

    cy.get('#button')
      .as('closeButton')
      .should('have.class', 'd-none');

    cy.get('#pokemon-list > a:nth-child(1)')
      .click();

    cy.get('@pokemonCard')
      .should('not.have.class', 'd-none');

    cy.get('#card > div > div > div.name > h2')
      .as('pokemonName')
      .should('have.text', POKEMON_NAME);

    cy.get('#card > div > div > div.power > h6')
      .as('baseStat')
      .should('have.text', BASE_STAT);

    cy.get('@closeButton')
      .click();

    cy.get('@closeButton')
      .should('have.class', 'd-none');

    cy.get('@pokemonCard')
      .should('have.class', 'd-none');
  });
});
