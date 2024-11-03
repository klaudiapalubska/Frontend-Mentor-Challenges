import { fieldsToFetch } from "./config.js";
import { apiRequest } from "./connect.js";
import { loadingSpin, numberWithCommas } from "./utils.js";
import { createCountryObject, searchNeighbour } from "./model.js";
import { countryInfo, main } from "./view.js";
const backButton = document.querySelector(".button--back");
const backContainer = document.querySelector(".main__country__back");
const card = document.querySelector(".card");

const menuView = async function (search = "") {
  try {
    loadingSpin(true); // Show spinner before starting the request
    backContainer.classList.add("none-display");
    const data = await apiRequest(`all?fields=${fieldsToFetch}`);
    console.log(data);

    const countries = createCountryObject(data).filter(
      (country) =>
        country.region.toLowerCase() === search.toLowerCase() ||
        search === "" ||
        country.name.toLowerCase().trim() === search.toLowerCase().trim()
    );
    countries.forEach((country) => {
      const cardCountry = document.createElement("div");
      cardCountry.classList.add("card__country");

      cardCountry.innerHTML = `
        <img src="${country.flag}" alt="flag" class="card__country__img">
        <div class="card__country__info" id="${country.name
          .replace(/\s+/g, "-")
          .toLowerCase()}">
          <h2 class="header--2">${country.name}</h2>
          <span class="card__country__span">
            <p class="paragraph paragraph--1">Population:</p>
            <p class="paragraph paragraph--3">${numberWithCommas(
              country.population
            )}</p>
          </span>
          <span class="card__country__span">
            <p class="paragraph paragraph--1">Region:</p>
            <p class="paragraph paragraph--3">${country.region}</p>
          </span>
          <span class="card__country__span">
            <p class="paragraph paragraph--1">Capital:</p>
            <p class="paragraph paragraph--3">${country.capital}</p>
          </span>
        </div>`;
      card.appendChild(cardCountry);
    });
  } catch (err) {
    console.error(err.message);
  } finally {
    loadingSpin(false); // Ensure spinner hides even if an error occurs
  }
};

menuView("");

const countryInfoView = function () {
  card.addEventListener("click", async function (event) {
    try {
      const targetCountry = event.target.closest(".card__country");
      if (targetCountry) {
        loadingSpin(true); // Show spinner before processing
        backContainer.classList.remove("none-display");
        const countryId = targetCountry
          .querySelector(".card__country__info")
          .id.replace(/-/g, " ")
          .toLowerCase();

        const data = await apiRequest(`name/${countryId}`);
        const country = createCountryObject(data);
        console.log("Clicked on:", country);
        main.classList.toggle("none-display");
        countryInfo.classList.toggle("none-display");

        country.forEach(async (country) => {
          const cardInfo = document.createElement("div");
          cardInfo.classList.add("information");
          const neighbours = country.borders.toLowerCase();

          cardInfo.innerHTML = `
            <img class="information__img" src="${country.flag}" alt="flag">
            <div class="information__data">
              <h2 class="header--2">${country.name}</h2>
              <div class="information__container">
                <div class="information__section">
                  <span class="card__country__span">
                    <p class="paragraph paragraph--1">Native Name:</p>
                    <p class="paragraph paragraph--3">${country.nativeName}</p>
                  </span>
                  <span class="card__country__span">
                    <p class="paragraph paragraph--1">Population:</p>
                    <p class="paragraph paragraph--3">${numberWithCommas(
                      country.population
                    )}</p>
                  </span>
                  <span class="card__country__span">
                    <p class="paragraph paragraph--1">Region:</p>
                    <p class="paragraph paragraph--3">${country.region}</p>
                  </span>
                  <span class="card__country__span">
                    <p class="paragraph paragraph--1">Sub Region:</p>
                    <p class="paragraph paragraph--3">${country.subRegion}</p>
                  </span>
                  <span class="card__country__span">
                    <p class="paragraph paragraph--1">Capital:</p>
                    <p class="paragraph paragraph--3">${country.capital}</p>
                  </span>
                </div>
                <div class="information__section">
                  <span class="card__country__span">
                    <p class="paragraph paragraph--1">Top Level Domain:</p>
                    <p class="paragraph paragraph--3">${country.tld}</p>
                  </span>
                  <span class="card__country__span">
                    <p class="paragraph paragraph--1">Currencies:</p>
                    <p class="paragraph paragraph--3">${country.currencies}</p>
                  </span>
                  <span class="card__country__span">
                    <p class="paragraph paragraph--1">Languages:</p>
                    <p class="paragraph paragraph--3">${country.languages}</p>
                  </span>
                </div>
              </div>
              <div class="information__neighbours">
                <p class="information__neighbours__p paragraph paragraph--3">
                  Border Countries:
                </p>
                <div class="information__neighbours__box"></div>
              </div>
            </div>`;

          countryInfo.appendChild(cardInfo);

          const neighboursBox = document.querySelector(
            ".information__neighbours__box"
          );
          if (neighbours != "") {
            const neighbourNames = await searchNeighbour(neighbours);
            neighboursBox.innerHTML = "";
            neighbourNames.forEach((name) => {
              const neighbourElement = document.createElement("div");
              neighbourElement.classList.add("field-style");
              neighbourElement.innerHTML = `<p class="paragraph paragraph--2">${name}</p>`;
              neighboursBox.appendChild(neighbourElement);
            });
          }
        });
      }
    } catch (err) {
      console.error(err.message);
    } finally {
      loadingSpin(false); // Ensure spinner hides even if an error occurs
    }
  });
};

//reset main page

//button services
const searchContainer = document.querySelector(".search");
const regionSearchList = document.querySelector(".search__filter-field");
const searchField = document.querySelector(".search__field__input");

const reloadMainPage = function () {
  document.querySelector(".card").innerHTML = "";
};

backButton.addEventListener("click", function () {
  countryInfo.classList.add("none-display");
  main.classList.remove("none-display");

  backContainer.classList.add("none-display");

  countryInfo.innerHTML = "";
});

function handleSearch() {
  const value = searchField.value.trim();

  reloadMainPage();
  menuView(value);
  loadingSpin(false);
}

searchContainer.addEventListener("click", function (event) {
  if (event.target.closest(".search__field__icon")) {
    loadingSpin(true);
    handleSearch();
  } else if (event.target.closest(".search__field--2")) {
    regionSearchList.classList.toggle("none-display");
  }
});

searchField.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    loadingSpin(true);
    handleSearch();
    event.preventDefault();
  }
});

searchField.addEventListener("touchend", function () {
  loadingSpin(true);
  handleSearch();
});

searchContainer.addEventListener("change", function (event) {
  if (event.target.closest(".filter-field__select")) {
    let selectedValue = event.target.value.toLowerCase();
    if (selectedValue == "america") selectedValue = "americas";

    reloadMainPage();
    menuView(selectedValue);

    regionSearchList.classList.toggle("none-display");
  }
});

countryInfoView();
