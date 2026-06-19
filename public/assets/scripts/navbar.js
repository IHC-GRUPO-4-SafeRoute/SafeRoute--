const navbarToggle = document.getElementById("navbar-toggle");
const navbarContent = document.getElementById("navbar-content");

const languageButton = document.getElementById("language-button");
const languageMenu = document.getElementById("language-menu");
const selectedFlag = document.getElementById("selected-flag");
const selectedLanguage = document.getElementById("selected-language");
const languageOptions = document.querySelectorAll(".navbar__language-option");

const defaultLanguage = "es";

const getNestedValue = (object, path) => {
  return path.split(".").reduce((current, key) => current && current[key], object);
};

const applyTranslations = (translations) => {
  const translatableElements = document.querySelectorAll("[data-i18n]");

  translatableElements.forEach((element) => {
    const translationKey = element.dataset.i18n;
    const translatedText = getNestedValue(translations, translationKey);

    if (translatedText) {
      element.innerHTML = translatedText;
    }
  });
};

const loadLanguage = async (language) => {
  try {
    const response = await fetch(`assets/i18n/${language}.json`);

    if (!response.ok) {
      throw new Error("Language file not found");
    }

    const translations = await response.json();
    applyTranslations(translations);
    document.documentElement.lang = language;
  } catch (error) {
    console.error("Error loading language:", error);
  }
};

navbarToggle.addEventListener("click", () => {
  navbarContent.classList.toggle("navbar__content--active");
});

languageButton.addEventListener("click", (event) => {
  event.stopPropagation();
  languageMenu.classList.toggle("navbar__language-menu--active");
});

languageOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const language = option.dataset.lang;
    const code = option.dataset.code;
    const flag = option.dataset.flag;
    const alt = option.dataset.alt;

    selectedFlag.src = flag;
    selectedFlag.alt = alt;
    selectedLanguage.textContent = code;

    loadLanguage(language);

    languageMenu.classList.remove("navbar__language-menu--active");
  });
});

document.addEventListener("click", () => {
  languageMenu.classList.remove("navbar__language-menu--active");
});

document.querySelectorAll(".navbar__link").forEach((link) => {
  link.addEventListener("click", () => {
    navbarContent.classList.remove("navbar__content--active");
  });
});

loadLanguage(defaultLanguage);