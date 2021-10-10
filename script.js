const countriesCard = document.getElementById("country-grid");
const toggleBtn = document.getElementById("toggle");
const dropdownBtn = document.getElementById("dropdown");
const regionDropdown = document.querySelectorAll("li");
const searchBar = document.getElementById("search");
const modal = document.getElementById("modal");
const backBtn = document.getElementById("btn-back");

getCountries();

async function getCountries() {
  const response = await fetch("https://restcountries.com/v3.1/all");
  const countries = await response.json();

  displayCountries(countries);
}

function displayCountries(countries) {
  countriesCard.innerHTML = "";

  countries.forEach((country) => {
    const countryCard = document.createElement("div");
    countryCard.classList.add("country-card");

    countryCard.innerHTML = `
      <div class="country-flag">
        <img src='${country.flags.svg}' alt="${country.name.common}" />
      </div>
      <div class="country-info">
        <h4 class="country-title">${country.name.common}</h4>
        <p class="country-text"><b>Population:</b> ${country.population}</p>
        <p class="country-text country-region"><b>Region:</b> ${country.region}</p>
        <p class="country-text"><b>Capital:</b> ${country.capital}</p>
      </div>`;

    countryCard.addEventListener("click", () => {
      modal.style.display = "flex";
      showCountryDetails(country);
    });

    backBtn.addEventListener("click", () => {
      modal.style.display = "none";
    });

    countriesCard.appendChild(countryCard);
  });
}

function showCountryDetails(country) {
  modal.querySelector(".container").innerHTML = `
  <img src='${country.flags.svg}' alt="${country.name.common}" />        
  <div class="modal-country-info">
          <h4 class="country-title">${country.name.common}</h4>
      <div class="country-list">
          <p class="country-list-text"><b>Native Name:</b> ${
            Object.values(country.name.nativeName)[0].official
          }</p>
          <p class="country-list-text"><b>Population:</b> ${
            country.population
          }</p>
          <p class="country-list-text country-region"><b>Region:</b> ${
            country.region
          }</p>
          <p class="country-list-text"><b>Sub Region:</b> ${
            country.subregion
          }</p>
          <p class="country-list-text"><b>Capital:</b> ${country.capital}</p>
          <p class="country-list-text"><b>Top Level Domain:</b> ${
            country.tld[0]
          }</p>
          <p class="country-list-text"><b>Currencies:</b> ${Object.keys(
            country.currencies
          )}</p>
          <p class="country-list-text"><b>Languages:</b> ${Object.values(
            country.languages
          )}</p>
          <p class="country-list-text" id="borders"><b>Border Countries:</b> ${
            country.borders
          }</p>
          </div>
        </div>
  `;
}

toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

dropdownBtn.addEventListener("click", () => {
  dropdownBtn.classList.toggle("open");
});

regionDropdown.forEach((dropdown) => {
  dropdown.addEventListener("click", () => {
    const value = dropdown.innerText;
    const countryRegion = document.querySelectorAll(".country-region");

    countryRegion.forEach((region) => {
      if (region.innerText.includes(value) || value === "All") {
        region.parentElement.parentElement.style.display = "block";
      } else {
        region.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

searchBar.addEventListener("input", (e) => {
  const { value } = e.target;
  const countryTitle = document.querySelectorAll(".country-title");

  countryTitle.forEach((name) => {
    if (name.innerText.toLowerCase().includes(value.toLowerCase())) {
      // .country-card -> .country-info -> .country-title
      name.parentElement.parentElement.style.display = "block";
    } else {
      name.parentElement.parentElement.style.display = "none";
    }
  });
});
