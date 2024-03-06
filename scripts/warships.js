import { data as countriesData } from "../data-sources/warships.js";

async function initCountriesPage() {
    try {
        let currentLocale = localStorage.getItem("currentLocale");
        createCountryCards(countriesData.countries, currentLocale);
        addListenerUpdateLang();
    } catch (error) {
        console.error("Error loading converters: ", error);
        throw error;
    }
}

function createCountryCards(data, locale) {
    const container = document.getElementById('countries');
    for (const country of data) {
        container.appendChild(createCountryCard(country, locale));
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

    const container = document.createElement("a");
    container.setAttribute("href", `./warships/${data.reference}`);
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
    cardTitle.textContent = data.translations[locale];
    cardTitle.style.color = `rgba(${fontColor.r}, ${fontColor.g}, ${fontColor.b}, 1)`;

    container.append(wave, waveInner, cardTitle);
    card.appendChild(container);
    return card;
}

function updateLang(locale) {
    const countriesTitle = document.querySelectorAll('.card-title');
    countriesTitle.forEach((cardTitle, index) => {
        cardTitle.textContent = countriesData.countries[index].translations[locale];
        addListenerUpdateLang();
    });
}

function addListenerUpdateLang() {
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(langOption => {
        langOption.addEventListener("click", function () {
            updateLang(langOption.dataset.langId);
        });
    });
}

await initCountriesPage();