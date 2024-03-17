import {data as countriesData} from "../data-sources/countries.js";

document.addEventListener("DOMContentLoaded", async function () {
    await initCountriesPage();
    await addListenerUpdateLang();
});

async function initCountriesPage() {
    try {
        let currentLocale = localStorage.getItem("currentLocale");
        await createBasicStructure(document.querySelector("section"), currentLocale);
        await createCountryCards(countriesData, currentLocale);
    } catch (error) {
        console.error("Error loading warships page: ", error);
        throw error;
    }
}

async function createBasicStructure(container, locale) {
    await createCountriesContainer(container, locale);
}

async function createCountriesContainer(parentContainer, locale) {
    const parentHeader = document.createElement("h2");
    parentHeader.setAttribute("id", "section-header");
    parentHeader.classList.add("section-header");
    parentHeader.textContent = "Countries";

    const countries = document.createElement("article");
    countries.setAttribute("id", "countries");
    countries.classList.add("countries");

    parentContainer.append(parentHeader, countries);
}

async function createCountryCards(data, locale) {
    const container = document.getElementById('countries');
    for (const country of data) {
        container.appendChild(createCountryCard(country, locale));
    }
}

function updateCountryCards(locale) {
    const countries = document.querySelectorAll(".countries");
    for (const country of countriesData) {
        let countryCard = countries.querySelector(`[data-country-id="${country.id}"]`)
        countryCard.querySelector(".card-title").textContent = country.translations.name[locale]
    }
}

function createCountryCard(data, locale) {
    const colors = data.colors;
    const primary = colors.primary;
    const secondary = colors.secondary;
    const tertiary = colors.tertiary;
    const fontColor = colors.text;

    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-country-id", data.id);

    const container = document.createElement("a");
    container.setAttribute("href", `./country.html?id=${data.id}`);
    container.classList.add("card-wave-container");

    const wave = document.createElement("div");
    wave.classList.add("card-wave");
    wave.style.boxShadow = `inset 0 0 8px 2px rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 1)`;
    wave.style.background = `linear-gradient(30deg, rgba(${secondary.r}, ${secondary.g}, ${secondary.b}, 1), rgba(${tertiary.r}, ${tertiary.g}, ${tertiary.b}, 1))`;

    const waveInner = document.createElement("div");
    waveInner.classList.add("card-wave-inner");
    waveInner.style.background = `rgba(${primary.r}, ${primary.g}, ${primary.b}, 1)`;

    const cardTitle = document.createElement("div");
    cardTitle.classList.add("card-title", "flex-m", "disable-select");
    cardTitle.textContent = data.translations.name[locale];
    cardTitle.style.color = `rgba(${fontColor.r}, ${fontColor.g}, ${fontColor.b}, 1)`;

    container.append(wave, waveInner, cardTitle);
    card.appendChild(container);
    return card;
}

async function updateLang(locale) {
    const countriesTitle = document.querySelectorAll('.card-title');
    countriesTitle.forEach((countryTitle, index) => {
        countryTitle.textContent = countriesData[index].translations.name[locale];
    });
    await addListenerUpdateLang();
}

async function addListenerUpdateLang() {
    const langOptions = document.querySelectorAll(".lang-option");
    for (let langOption of langOptions) {
        langOption.addEventListener("click", function () {
            updateLang(langOption.dataset.langId);
        });
    }
}