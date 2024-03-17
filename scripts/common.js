import { data as commonData } from "../data-sources/common.js";

const navbar = document.getElementById("navbar");

async function initIndexPage() {
    try {
        let currentLocale = localStorage.getItem("currentLocale") || commonData.locales.default;
        let currentTheme = localStorage.getItem("currentTheme") || commonData.themes.default;
        localStorage.setItem("currentLocale", currentLocale);
        localStorage.setItem("currentTheme", currentTheme);
        createLoadingScreen();
        createHeader();
        createNavbar(currentTheme, currentLocale);
        createFooter(currentLocale);
    } catch (error) {
        console.error("Error loading page: ", error);
        throw error;
    }
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

function addBackPath(path, depth) {
    if (depth === 0) return "./" + path; else return "../".repeat(depth) + path;
}

function isRoot(path) {
    return ["", "warships-wiki"].includes(path);
}

function getPathDepth(root, length) {
    return (length - ((root === "warships-wiki") ? 3 : 2));
}

function createNavButton(data, locale) {
    let buttonContainer = document.createElement("a");
    buttonContainer.classList.add("nav-button");
    buttonContainer.setAttribute("data-button-id", data.id.toLowerCase());
    if (!data.disabled) buttonContainer.setAttribute("href", createPathReference(window.location.pathname, data.id, data.reference));

    let buttonIcon = document.createElement("i");
    buttonIcon.classList.add("fas", `fa-${data.icon.toLowerCase()}`);
    buttonIcon.setAttribute("role", "img");
    buttonIcon.setAttribute("aria-label", data.translations[locale]);

    let buttonTooltip = document.createElement("span");
    buttonTooltip.innerHTML = data.translations[locale];

    buttonContainer.append(buttonIcon, buttonTooltip);
    return buttonContainer;
}

function createNavbar(theme, locale) {
    navbar.innerHTML = "";
    navbar.classList.add("disable-select", "flex-m-children");

    commonData.views.forEach((button) => {
        navbar.appendChild(createNavButton(button, locale));
        if (button.hrAfter) navbar.appendChild(document.createElement("hr"));
    });

    createLangSelector(locale);
    createThemeToggle(theme);

    // Hide loading screen
    setTimeout(function () {
        document.getElementById("loading-screen").className = ""
    }, 500);
}

function updateNavbar(locale) {
    commonData.views.forEach((button) => {
        let buttonContainer = navbar.querySelector(`[data-button-id="${button.id}"]`);
        let buttonIcon = buttonContainer.querySelector("i");
        let buttonTooltip = buttonContainer.querySelector("span");
        if (buttonContainer) {
            buttonIcon.setAttribute("role", "img");
            buttonIcon.setAttribute("aria-label", button.translations[locale]);
            buttonTooltip.innerHTML = button.translations[locale];
        }
    });
    updateLangSelector(locale)
}

function createFooterSocialIcon(data, locale) {
    let icon = document.createElement("a");
    icon.setAttribute("href", data.reference);
    icon.className = "social-icon";

    let image = document.createElement("i");
    image.setAttribute("role", "img");
    image.setAttribute("aria-label", data.translations[locale]);
    image.classList.add("fab", `fa-${data.icon.toLowerCase()}`);

    icon.appendChild(image);
    return icon;
}

function createHeader() {
    const header = document.querySelector("header");
    header.classList.add("flex-m","disable-select");

    const title = document.createElement("h1");
    title.textContent = commonData.header.title;
    header.appendChild(title);
}

function createFooter(locale) {
    const footer = document.querySelector("footer");
    footer.classList.add("flex-m");
    const footerData = commonData.footer;

    const socialIcons = document.createElement("div");
    socialIcons.classList.add("social-icons", "flex-m");

    footerData.socialButtons.forEach((button) => {
        socialIcons.appendChild(createFooterSocialIcon(button, locale));
    });

    const donateBanner = document.createElement("a");
    donateBanner.classList.add("donate-banner");
    donateBanner.setAttribute("href", footerData.donationButton.reference);

    const developerInfo = document.createElement("div");
    developerInfo.classList.add("developer-info");

    footer.append(socialIcons, donateBanner, developerInfo);

    updateFooter(locale);
}

function updateFooter(locale) {
    const socialIcons = document.querySelectorAll(".social-icon");
    const donateBanner = document.querySelector(".donate-banner");
    const developerInfo = document.querySelector(".developer-info");

    commonData.footer.socialButtons.forEach((button, index) => {
        socialIcons[index].setAttribute("title", button.translations[locale]);
    });

    const donateData = commonData.footer.donationButton;
    donateBanner.textContent = donateData.translations[locale];
    donateBanner.setAttribute("title", donateData.translations[locale]);

    const donateImage = document.createElement("i");
    donateImage.classList.add("fas", `fa-${donateData.icon.toLowerCase()}`);
    donateImage.setAttribute("role", "img");
    donateImage.setAttribute("aria-label", donateData.translations[locale]);
    donateBanner.appendChild(donateImage);

    const developerData = commonData.footer.developerButton;
    developerInfo.textContent = (developerData.translations[locale] + " ");

    const developerLink = document.createElement("a");
    developerLink.setAttribute("title", developerData.translations[locale] + " " + developerData.name);
    developerLink.textContent = developerData.name;
    developerLink.setAttribute("href", developerData.reference);
    developerInfo.appendChild(developerLink);
}

function createLoadingScreen() {
    const mainContent = document.getElementById("content");
    const loaderContainer = document.createElement("div");
    const loaderWave = document.createElement("div");

    loaderContainer.setAttribute("id", "loading-screen");
    loaderContainer.className = "flex-m-force";
    loaderWave.className = "loading-wave flex-m";

    for (let i = 0; i < 4; i++) {
        let loaderBar = document.createElement("div");
        loaderBar.className = "loading-bar";
        loaderWave.appendChild(loaderBar);
    }

    loaderContainer.appendChild(loaderWave);
    mainContent.appendChild(loaderContainer);
}

function updateLang(locale) {
    updateNavbar(locale);
    toggleTheme(localStorage.getItem("currentTheme"));
    updateFooter(locale);
    localStorage.setItem("currentLocale", locale);
}

function createLangSelector(locale) {
    const container = document.createElement("span");
    const icon = document.createElement("i");
    const options = document.createElement("span");

    container.classList.add("nav-button");
    container.id = "lang-selector";
    icon.setAttribute("role", "img");
    options.classList.add("lang-options");

    container.appendChild(icon);
    container.appendChild(options);
    navbar.appendChild(container);

    updateLangSelector(locale);
}

function createLangOption(optionData) {
    let option = document.createElement("i");
    let optionId = optionData.id;

    option.setAttribute("aria-label", optionData.name);
    option.setAttribute("data-lang-id", optionId);
    option.classList.add("lang-option", "fi", "fi-" + optionData.icon, "fis");

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

function createThemeToggle(theme) {
    const container = document.createElement("span");
    const icon = document.createElement("i");

    container.classList.add("nav-button");
    container.setAttribute("id", "theme-toggle");
    icon.setAttribute("role", "img");

    navbar.appendChild(container);
    container.appendChild(icon);
    toggleTheme(theme);

    container.addEventListener("click", function () {
        let newTheme = localStorage.getItem("currentTheme") === "dark" ? "light" : "dark";
        toggleTheme(newTheme);
    });
}

function toggleTheme(theme) {
    const locale = localStorage.getItem("currentLocale");
    const icon = document.getElementById("theme-toggle").querySelector("i");

    icon.setAttribute("aria-label", theme === "dark" ? commonData.themes.lightTheme[locale] : commonData.themes.darkTheme[locale]);

    icon.className = `fas fa-${theme === "dark" ? "sun" : "moon"}`;
    icon.classList.add("flex-m");

    document.body.className = `${theme}-theme`;
    localStorage.setItem("currentTheme", theme);
}

await initIndexPage();
