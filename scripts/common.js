import { data as commonData } from "/data-sources/common.js";
const navbar = document.getElementById("navbar");

async function initIndexPage() {
  try {
    let currentLocale = localStorage.getItem("currentLocale") || commonData.locales.default;
    let currentTheme = localStorage.getItem("currentTheme") || commonData.themes.default;
    createLoadingScreen();
    createNavbar(currentTheme, currentLocale);

  } catch (error) {
    console.error("Error loading page: ", error);
    throw error;
  }
}

function createNavbar(theme, locale) {
  navbar.innerHTML = "";

  commonData.navbarButtons.forEach((button) => {
    let buttonContainer = document.createElement("a");
    let buttonIcon = document.createElement("i");
    let buttonTooltip = document.createElement("span");

    buttonContainer.classList.add("nav-button");
    buttonContainer.setAttribute("data-button-id", button.id.toLowerCase());
    if (window.location.pathname === ("/" + button.id + ".html")) {
      buttonContainer.setAttribute("href", "#top");
    } else if (button.id === "calculations" || button.id === "index") {
      buttonContainer.setAttribute("href", button.reference.toLowerCase());
    }
    buttonIcon.classList.add("fas", `fa-${button.icon.toLowerCase()}`);
    buttonIcon.setAttribute("aria-label", button.translations[locale]);
    buttonTooltip.innerHTML = button.translations[locale];

    buttonContainer.appendChild(buttonIcon);
    buttonContainer.appendChild(buttonTooltip);
    navbar.appendChild(buttonContainer);

    if (button.hrAfter) navbar.appendChild(document.createElement("hr"));
  });
  createLangSelector(locale);
  createThemeToggle(theme);

  // Hide loading screen
  setTimeout(function () { document.getElementById("loading-screen").className = "" }, 1500);
}

function updateNavbar(locale) {
  commonData.navbarButtons.forEach((button) => {
    let buttonContainer = navbar.querySelector(`[data-button-id="${button.id}"]`);
    let buttonIcon = buttonContainer.querySelector("i");
    let buttonTooltip = buttonContainer.querySelector("span");
    if (buttonContainer) {
      buttonIcon.setAttribute("aria-label", button.translations[locale]);
      buttonTooltip.innerHTML = button.translations[locale];
    }
  });
  updateLangSelector(locale)
}

function createLoadingScreen() {
  const mainContent = document.getElementById("content");
  const loaderContainer = document.createElement("div");
  const loaderWave = document.createElement("div");

  loaderContainer.setAttribute("id", "loading-screen");
  loaderContainer.className = "show";
  loaderWave.className = "loading-wave";

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
  localStorage.setItem("currentLocale", locale);
}

function createLangSelector(locale) {
  const container = document.createElement("span");
  const containerIcon = document.createElement("i");
  const containerOptions = document.createElement("span");

  container.classList.add("nav-button");
  container.setAttribute("id", "lang-selector");
  containerOptions.classList.add("lang-options");
  navbar.appendChild(container);
  container.appendChild(containerIcon);
  container.appendChild(containerOptions);

  updateLangSelector(locale);
}

function updateLangSelector(locale) {
  const container = document.getElementById("lang-selector");
  const containerIcon = container.querySelector("i");
  containerIcon.className = "fi fi-" + commonData.locales[locale].icon + " fis";
  containerIcon.setAttribute("aria-label", commonData.locales[locale].name);

  const containerOptions = container.querySelector(".lang-options");
  containerOptions.innerHTML = "";

  for (let lang in commonData.locales) {
    if ((lang !== "default") && (lang !== locale)) {
      let langOption = document.createElement("i");
      langOption.classList.add("lang-option", "fi", "fi-" + commonData.locales[lang].icon, "fis");
      langOption.setAttribute("data-lang-id", commonData.locales[lang].id);
      containerOptions.appendChild(langOption);

      langOption.addEventListener("click", function () {
        localStorage.setItem("currentLocale", commonData.locales[lang].id);
        updateLang(commonData.locales[lang].id);
      });
    }
  };
}

function createThemeToggle(theme) {
  const container = document.createElement("span");
  const icon = document.createElement("i");

  container.classList.add("nav-button");
  container.setAttribute("id", "theme-toggle");

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

  document.body.className = `${theme}-theme`;
  localStorage.setItem("currentTheme", theme);
}

await initIndexPage();
