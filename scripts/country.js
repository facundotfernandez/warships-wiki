import { data as countriesData } from "../data-sources/countries.js";
import {getPreviousDirectory, getCurrentDirectory } from "./main.js";

async function initCountryPage() {
    try {
        let currentLocale = localStorage.getItem("currentLocale");
        const countryId = new URLSearchParams(location.search).get("id");
        const country = countriesData.countries.find(country => country.id === countryId);
        createClassCards(country, getCurrentDirectory(window.location.pathname), currentLocale);
    } catch (error) {
        console.error("Error loading converters: ", error);
        throw error;
    }
}

function createClassCards(data, section, locale) {
    const container = document.querySelector("section");
    const classes = document.createElement("article");
    classes.classList.add("classes");
    for (const countryClass of Object.keys(data[section])) {
        classes.appendChild(createClassCard(data.id, countryClass, locale));
    }
    container.appendChild(classes);
}

function createClassCard(id, data, locale) {
    const card = document.createElement("div");
    card.classList.add("card");

    const container = document.createElement("a");
    container.setAttribute("href", `./${id}.html?id=${data.id}`);

    card.appendChild(container);
    return card;
}

await initCountryPage();