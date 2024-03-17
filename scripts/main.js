import { data as commonData } from "../data-sources/common.js";

document.addEventListener("DOMContentLoaded", async function () {
    let currentTheme = localStorage.getItem("currentTheme") || commonData.themes.default;
    let currentLocale = localStorage.getItem("currentLocale") || commonData.locales.default;
    localStorage.setItem("currentTheme", currentTheme);
    localStorage.setItem("currentLocale", currentLocale);
    await initBasicPage(currentTheme, currentLocale);

    const collapsableElements = document.querySelectorAll('.article-header');

    collapsableElements.forEach(function (header) {
        header.addEventListener("click", function () {
            this.parentElement.classList.toggle("collapsed");
        });
    });
});

async function initBasicPage(theme, locale) {

    try {
        const main = document.querySelector("main");
        await createLoadingScreen(main);
        updateTitle(locale);
        await createNavbar(theme, locale);
        await createBasicStructure(main, locale);
        deleteLoadingScreen(main);
    } catch (error) {
        console.error("Error loading page: ", error);
        throw error;
    }
}

async function createLoadingScreen(main) {
    const container = document.createElement("template");
    const wave = document.createElement("div");

    container.id = "loading-screen";
    wave.classList.add("loading-wave");

    for (let i = 0; i < 4; i++) {
        let waveBar = document.createElement("div");
        waveBar.classList.add("loading-bar");
        wave.appendChild(waveBar);
    }

    container.appendChild(wave);
    main.appendChild(container);
}

function deleteLoadingScreen(main) {
    setTimeout(function () {
        const loadingScreen = document.getElementById("loading-screen");
        main.removeChild(loadingScreen);
    }, 1500);
}

async function createNavbar(theme, locale) {
    const navbar = document.querySelector("nav");
    navbar.classList.add("disable-select");
    navbar.setAttribute("id", "nav-bar");

    createLangSelector(navbar, locale);
    commonData.views.forEach((button) => {
        if (button.hasOwnProperty("reference")) {
            navbar.appendChild(createNavButton(button, locale));
            if (button.hrAfter) navbar.appendChild(document.createElement("hr"));
        }

    });
    createThemeToggle(navbar, theme);
}

function updateNavbar(locale) {
    const navbar = document.getElementById("nav-bar");
    commonData.views.forEach((button) => {
        if (button.hasOwnProperty("reference")) {
            let container = navbar.querySelector(`[data-button-id="${button.id}"]`);
            let icon = container.querySelector("i");
            let tooltip = container.querySelector("span");
            if (container) {
                icon.setAttribute("role", "img");
                icon.setAttribute("aria-label", button.translations[locale]);
                tooltip.innerHTML = button.translations[locale];
            }
        }
    });
    updateLangSelector(locale);
}

export function createIcon(iconClasses, label) {
    let icon = document.createElement("i");
    if (iconClasses) {
        for (const iconClass of iconClasses) {
            icon.classList.add(iconClass);
        }
    }
    icon.setAttribute("role", "img");
    if (label) icon.setAttribute("aria-label", label);
    return icon;
}

function createNavButton(data, locale) {
    let container = document.createElement("a");
    container.classList.add("nav-button");
    container.setAttribute("data-button-id", data.id.toLowerCase());
    if (!data.disabled) container.setAttribute("href", createPathReference(window.location.pathname, data.id, data.reference));

    let icon = createIcon(["fas", `fa-${data.icon.toLowerCase()}`], data.translations[locale]);

    let tooltip = document.createElement("span");
    tooltip.innerHTML = data.translations[locale];

    container.append(icon, tooltip);
    return container;
}

function createPathReference(path, buttonId, buttonRef) {
    const pathParts = path.split("/");
    const pathLength = pathParts.length;

    if ((pathParts[pathLength - 1] === buttonRef) || (isRoot(path) && (buttonId === "index"))) {
        return "#top";
    } else {
        return addBackPath((buttonRef), (getPathDepth(pathParts[1], pathLength)));
    }
}

export function getPathnameSplit(path) {
    const pathParts = path.split("/");
    const pathLength = pathParts.length;

    return { pathParts, pathLength };
}

export function getCurrentView(path) {
    const info = getPathnameSplit(path);
    return info.pathParts[info.pathLength - 1];
}

export function getCurrentDirectory(path) {
    const info = getPathnameSplit(path);
    return info.pathParts[info.pathLength - 2];
}

export function getPreviousDirectory(path) {
    const info = getPathnameSplit(path);
    return info.pathParts[info.pathLength - 3];
}

function addBackPath(path, depth) {
    if (depth === 0) return "./" + path; else return "../".repeat(depth) + path;
}

function isRoot(path) {
    return ["", "warships-wiki"].includes(path);
}

function getPathDepth(root, length) {
    return (length - ((root === "warships-wiki") ? 3 : 2));
}

function updateTitle(locale) {
    const viewId = getCurrentView(window.location.pathname).slice(0, -5);
    if (viewId === "") document.title = commonData.views[0].translations[locale];
    else {
        const view = commonData.views.find(view => view.id === viewId);
        //document.title = view.translations[locale];
    }
}

function createHeaderBanner(locale) {
    const headerBanner = document.createElement("div");
    headerBanner.classList.add("header-banner");

    const title = document.createElement("h1");
    title.textContent = commonData.header.translations[locale];
    headerBanner.appendChild(title);
    return headerBanner;
}

function createHeaderSearch(locale) {
    const headerSearch = document.createElement("div");
    headerSearch.classList.add("header-search");

    const searchBar = document.createElement("form");
    searchBar.setAttribute("action", "#");
    searchBar.classList.add("search-bar");
    searchBar.setAttribute("id", "search-bar");

    const searchLabel = document.createElement("label");
    searchLabel.setAttribute("for", "search-input");

    const searchInput = document.createElement("input");
    searchInput.classList.add("search-input");
    searchInput.setAttribute("id", "search-input");
    searchInput.setAttribute("type", "text");

    const searchButton = document.createElement("button");
    searchButton.classList.add("search-button");
    searchButton.setAttribute("type", "button");

    searchButton.appendChild(createIcon(["fas", "fa-magnifying-glass", "search-icon"]));

    searchBar.append(searchLabel, searchInput, searchButton);
    headerSearch.appendChild(searchBar);
    return headerSearch;
}

async function createHeader(locale) {
    const header = document.querySelector("header");
    header.classList.add("main-header","disable-select");
    header.append(createHeaderBanner(locale), createHeaderSearch(locale));
    updateHeader(locale);
}

function updateHeader(locale) {
    const title = document.querySelector("h1");
    title.textContent = commonData.header.translations[locale];

    const searchIcon = document.querySelector(".search-icon");
    searchIcon.setAttribute("aria-label", (commonData.header.searchBar.searchIcon[locale]));

    const searchInput = document.querySelector(".search-input");
    searchInput.setAttribute("placeholder", (commonData.header.searchBar.placeholder[locale] + ".".repeat(3)));
}

async function createFooter(locale) {
    const footer = document.querySelector("footer");

    const footerData = commonData.footer;

    createSocialIcons(footerData.socialButtons, footer, locale);
    createDonationBanner(footerData.donationButton, footer);
    createDeveloperInfo(footerData.developerButton, footer);
    updateFooter(locale);
}

function createSocialIcons(data, container, locale) {
    const icons = document.createElement("div");
    icons.classList.add("social-icons");

    data.forEach((button) => {
        icons.appendChild(createSocialIcon(button, locale));
    });
    container.appendChild(icons)
}

function createDonationBanner(data, container) {
    const banner = document.createElement("a");
    banner.classList.add("donate-banner");
    banner.setAttribute("href", data.reference);
    container.appendChild(banner);
}

function createDeveloperInfo(data, container) {
    const info = document.createElement("div");
    info.classList.add("developer-info");
    container.appendChild(info);
}

function createSocialIcon(data, locale) {
    let socialIcon = document.createElement("a");
    socialIcon.classList.add("social-icon");
    socialIcon.setAttribute("href", data.reference);

    socialIcon.appendChild(createIcon(["fab", `fa-${data.icon.toLowerCase()}`], data.translations[locale]));
    return socialIcon;
}

async function createBasicStructure(container, locale) {
    await createHeader(locale);
    await createFooter(locale);
}

function updateFooter(locale) {
    const socialIcons = document.querySelectorAll(".social-icon");
    const donateBanner = document.querySelector(".donate-banner");
    const developerInfo = document.querySelector(".developer-info");
    const footerData = commonData.footer;

    updateSocialIcons(footerData.socialButtons, socialIcons, locale);
    updateDonationBanner(footerData.donationButton, donateBanner, locale);
    updateDeveloperInfo(footerData.developerButton, developerInfo, locale);
}

function updateSocialIcons(data, container, locale) {
    data.forEach((button, index) => {
        container[index].setAttribute("title", button.translations[locale]);
    });
}

function updateDonationBanner(data, container, locale) {
    container.setAttribute("title", data.translations[locale]);
    container.textContent = data.translations[locale];

    container.appendChild(createIcon(["fas", `fa-${data.icon.toLowerCase()}`], data.translations[locale]));
}

function updateDeveloperInfo(data, container, locale) {
    container.textContent = (data.translations[locale] + " ");

    const link = document.createElement("a");
    link.setAttribute("title", data.translations[locale] + " " + data.name);
    link.setAttribute("href", data.reference);
    link.textContent = data.name;
    container.appendChild(link);
}

function updateLang(locale) {
    updateTitle(locale);
    updateNavbar(locale);
    toggleTheme(localStorage.getItem("currentTheme"));
    updateHeader(locale);
    updateFooter(locale);
    localStorage.setItem("currentLocale", locale);
}

function createLangSelector(navbar, locale) {
    const container = document.createElement("span");
    const options = document.createElement("span");

    container.id = "lang-selector";
    container.classList.add("nav-button");
    options.classList.add("lang-options");

    container.appendChild(createIcon());
    container.appendChild(options);
    navbar.appendChild(container);

    updateLangSelector(locale);
}

function createLangOption(optionData) {
    let option = createIcon(["lang-option", "fi", `fi-${optionData.icon}`, "fis"], optionData.name);
    let optionId = optionData.id;

    option.setAttribute("data-lang-id", optionId);
    option.addEventListener("click", function () {
        localStorage.setItem("currentLocale", optionId);
        updateLang(optionId);
    });

    return option;
}

function updateLangSelector(locale) {
    const container = document.getElementById("lang-selector");
    const icon = container.querySelector("i");
    const localesData = commonData.locales;
    icon.setAttribute("aria-label", localesData[locale].name);
    icon.className = "fi fi-" + localesData[locale].icon + " fis";

    const options = container.querySelector(".lang-options");
    options.innerHTML = "";

    for (let lang in localesData) {
        if ((lang !== "default") && (lang !== locale)) {
            options.appendChild(createLangOption(localesData[lang]));
        }
    }
}

function createThemeToggle(navbar, theme) {
    const container = document.createElement("span");

    container.classList.add("nav-button");
    container.setAttribute("id", "theme-toggle");

    navbar.appendChild(container);
    container.appendChild(createIcon());
    toggleTheme(theme);

    container.addEventListener("click", function () {
        let newTheme = localStorage.getItem("currentTheme") === "dark" ? "light" : "dark";
        toggleTheme(newTheme);
    });
}

function toggleTheme(theme) {
    const locale = localStorage.getItem("currentLocale");
    const icon = document.getElementById("theme-toggle").querySelector("i");

    icon.className = `fas fa-${theme === "dark" ? "sun" : "moon"}`;
    icon.setAttribute("aria-label", theme === "dark" ? commonData.themes.lightTheme[locale] : commonData.themes.darkTheme[locale]);

    document.body.className = `${theme}-theme`;
    localStorage.setItem("currentTheme", theme);
}