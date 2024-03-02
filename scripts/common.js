import { data as commonData } from "../data-sources/common.js";
const navbar = document.getElementById("navbar");

async function initIndexPage() {
  try {
    let currentLocale = localStorage.getItem("currentLocale") || commonData.locales.default;
    let currentTheme = localStorage.getItem("currentTheme") || commonData.themes.default;
    localStorage.setItem("currentLocale", currentLocale);
    localStorage.setItem("currentTheme", currentTheme);
    createLoadingScreen();
    createNavbar(currentTheme, currentLocale);
    createFooter(currentLocale);
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

    const currentPath = window.location.pathname;
    const isIndexPath = currentPath === "/" || currentPath === "/warships-wiki/";

    buttonContainer.classList.add("nav-button");
    buttonContainer.setAttribute("data-button-id", button.id.toLowerCase());
    if ((currentPath.endsWith("/" + button.id + ".html")) || (isIndexPath && button.id === "index")) {
      buttonContainer.setAttribute("href", "#top");
    } else if (!button.disabled) {
      var href = button.reference.toLowerCase();
      if (currentPath.includes("/")) {
        var depth = currentPath.split("/").length - 2;
        var backPath = "";
        for (var i = 0; i < depth; i++) {
          backPath += "../";
        }
        href = backPath + href;
      }
      buttonContainer.setAttribute("href", href);
    }
    buttonIcon.classList.add("fas", `fa-${button.icon.toLowerCase()}`);
    buttonIcon.setAttribute("role", "img");
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
      buttonIcon.setAttribute("role", "img");
      buttonIcon.setAttribute("aria-label", button.translations[locale]);
      buttonTooltip.innerHTML = button.translations[locale];
    }
  });
  updateLangSelector(locale)
}

function createFooter(locale) {
  const mainContent = document.getElementById("content");
  const footer = document.querySelector("footer");

  const socialIcons = document.createElement("div");
  socialIcons.className = "social-icons";

  commonData.footer.socialButtons.forEach((button) => {
    let socialIcon = document.createElement("a");
    socialIcon.setAttribute("href", button.reference);
    socialIcon.setAttribute("title", button.translations[locale]);
    socialIcon.className = "social-icon";

    let socialIconImage = document.createElement("i");
    socialIconImage.setAttribute("role", "img");
    socialIconImage.setAttribute("aria-label", button.translations[locale]);
    socialIconImage.classList.add("fab", `fa-${button.icon.toLowerCase()}`);

    socialIcon.appendChild(socialIconImage);
    socialIcons.appendChild(socialIcon);
  });

  const donateData = commonData.footer.donationButton;

  const donateBanner = document.createElement("a");
  donateBanner.className = "donate-banner";
  donateBanner.textContent = donateData.translations[locale];
  donateBanner.setAttribute("href", donateData.reference);
  donateBanner.setAttribute("title", donateData.translations[locale]);

  const donateImage = document.createElement("i");
  donateImage.setAttribute("role", "img");
  donateImage.setAttribute("aria-label", donateData.translations[locale]);
  donateImage.classList.add("fas", `fa-${donateData.icon.toLowerCase()}`);
  donateBanner.appendChild(donateImage);

  const developerData = commonData.footer.developerButton;

  const developerInfo = document.createElement("div");
  developerInfo.className = "developer-info";
  developerInfo.textContent = (developerData.translations[locale] + " ");

  const developerLink = document.createElement("a");
  developerLink.setAttribute("href", developerData.reference);
  developerLink.setAttribute("title", developerData.translations[locale] + " " + developerData.name);
  developerLink.textContent = developerData.name;
  developerInfo.appendChild(developerLink);

  footer.appendChild(socialIcons);
  footer.appendChild(donateBanner);
  footer.appendChild(developerInfo);
  mainContent.appendChild(footer);
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
  donateBanner.appendChild(donateImage);

  const developerData = commonData.footer.developerButton;
  developerInfo.textContent = (developerData.translations[locale] + " ");

  const developerLink = document.createElement("a");
  developerLink.setAttribute("href", developerData.reference);
  developerLink.setAttribute("title", developerData.translations[locale] + " " + developerData.name);
  developerLink.textContent = developerData.name;
  developerInfo.appendChild(developerLink);
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
  updateFooter(locale);
  localStorage.setItem("currentLocale", locale);
}

function createLangSelector(locale) {
  const container = document.createElement("span");
  const containerIcon = document.createElement("i");
  const containerOptions = document.createElement("span");

  container.classList.add("nav-button");
  container.setAttribute("id", "lang-selector");
  containerIcon.setAttribute("role", "img");
  containerIcon.setAttribute("aria-label", "Lang selector");
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
      langOption.setAttribute("role", "img");
      langOption.setAttribute("aria-label", commonData.locales[lang].name);
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

  document.body.className = `${theme}-theme`;
  localStorage.setItem("currentTheme", theme);
}

await initIndexPage();
