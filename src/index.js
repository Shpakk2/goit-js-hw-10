import './css/styles.css';

import { Notify } from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;
import fetchCountries from "./fetchCountries"

const form = document.querySelector('#search-box')
const countryList = document.querySelector('.country-list')
const countryInfo = document.querySelector('.country-info')

form.addEventListener("input", debounce(countryInput, DEBOUNCE_DELAY))

function countryInput(e) {
    if (e.target.value.trim() === "") {
    countryList.innerHTML = ""
    countryInfo.innerHTML = "";
    } else {
        fetchCountries(e.target.value).then((arrayCountries) => checkQuantity(arrayCountries))
    .catch((error) => errorFunc(error))
    }
}

function checkQuantity(array) {
   array.length > 10 &&
       Notify.info("Too many matches found. Please enter a more specific name.")

    if (2 <= array.length && array.length <= 10) {
        const markup = array.map(country => {
        return `<li><h3><img src="${country.flags.svg}" width="30px" height="15px">${country.name}</h3></li>`
        })
    .join("");
        countryList.innerHTML = markup;
        countryInfo.innerHTML = ""
    } 

    if (array.length === 1) {
                const markup = array.map(({ name, flags, population, languages, capital }) => {
        return `<h2><img src="${flags.svg}" width="30px" height="15px">${name}<h2><p>Capital: <span class="span">${capital}</span></p><p>Population: <span class="span">${population}</span></p><p>Languages: <span class="span">${languages.map(lang => " " +lang.name)}</span></p>`
        })
                    .join("");
countryList.innerHTML = ""
        countryInfo.innerHTML = markup;
    }

}

function errorFunc(error) {
    countryList.innerHTML = ""
    countryInfo.innerHTML = "";
    Notify.failure("Oops, there is no country with that name")
}