import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import debounce from 'lodash/debounce';
import CountryCardTpl from './templates/country-Card.hbs';
import CountriesListTpl from './templates/countriesList.hbs';

import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';


const refs = {
  searchForm: document.querySelector('.js-search-form'),
  countriesList: document.querySelector('.js-card-container'),
}

refs.searchForm.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value;

  if (searchQuery === '') {
    return;
  }

  fetchCountries(searchQuery)
    .then(countries => {
      if (countries.length > 1 && countries.length <= 10) {
        renderCountriesList(countries);
        return;
      }

      if (countries.length === 1) {
        renderCountryCard(countries);
        return;
      }

      if (countries.length > 10) {
        onFetchError();
        return;
      }
    })
}

function renderCountriesList(countries) {
  refs.countriesList.innerHTML = CountriesListTpl(countries);
}

function renderCountryCard(countries) {
  refs.countriesList.innerHTML = CountryCardTpl(countries[0]);
}

function onFetchError() {
  error({
  text: 'Too many matches found. Please enter a more specific query!'
});
}