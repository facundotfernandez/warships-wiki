const data = {
  themes: {
    default: "dark",
    darkTheme: {
      es: "Modo Oscuro",
      en: "Dark Mode",
      pt: "Modo Escuro",
      ru: "Темный режим"
    },
    lightTheme: {
      es: "Modo Claro",
      en: "Light Mode",
      pt: "Modo Claro",
      ru: "Светлый режим"
    }
  },
  locales: {
    default: "es",
    es: {
      id: "es",
      name: "Español",
      icon: "mx",
    },
    en: {
      id: "en",
      name: "English",
      icon: "us",
    },
    pt: {
      id: "pt",
      name: "Português",
      icon: "br",
    },
    ru: {
      id: "ru",
      name: "Русский",
      icon: "ru",
    },
  },
  navbarButtons:
    [
      {
        id: "home",
        reference: "./home.html",
        icon: "home",
        hrAfter: true,
        translations: {
          es: "Inicio",
          en: "Home",
          pt: "Início",
          ru: "Домой"
        }
      },
      {
        id: "armies",
        reference: "./armies.html",
        icon: "person-military-rifle",
        hrAfter: false,
        translations: {
          es: "Armadas",
          en: "Armies",
          pt: "Forças Armadas",
          ru: "Армии"
        }
      },
      {
        id: "aircraft",
        reference: "./aircraft.html",
        icon: "jet-fighter-up",
        hrAfter: false,
        translations: {
          es: "Aeronaves",
          en: "Aircraft",
          pt: "Aeronaves",
          ru: "Самолёты"
        }
      },
      {
        id: "warships",
        reference: "./warships.html",
        icon: "ship",
        hrAfter: false,
        translations: {
          es: "Buques",
          en: "Warships",
          pt: "Navios",
          ru: "Военные корабли"
        }
      },
      {
        id: "armaments",
        reference: "./armaments.html",
        icon: "gun",
        hrAfter: true,
        translations: {
          es: "Armamentos",
          en: "Armaments",
          pt: "Armamentos",
          ru: "Вооружение"
        }
      },
      {
        id: "technologies",
        reference: "./technologies.html",
        icon: "microchip",
        hrAfter: false,
        translations: {
          es: "Tecnologías",
          en: "Technologies",
          pt: "Tecnologias",
          ru: "Технологии"
        }
      },
      {
        id: "policies",
        reference: "./policies.html",
        icon: "landmark",
        hrAfter: false,
        translations: {
          es: "Políticas Navales",
          en: "Naval Policies",
          pt: "Políticas Navais",
          ru: "Военная политика"
        }
      },
      {
        id: "terms",
        reference: "./terms.html",
        icon: "spell-check",
        hrAfter: true,
        translations: {
          es: "Terminologías",
          en: "Terminologies",
          pt: "Terminologias",
          ru: "Терминологии"
        }
      },
      {
        id: "cinema",
        reference: "./cinema.html",
        icon: "film",
        hrAfter: false,
        translations: {
          es: "Cinematografía y Música",
          en: "Cinematography & Music",
          pt: "Cinematografia e Música",
          ru: "Кинематография и музыка"
        }
      },
      {
        id: "gaming",
        reference: "./gaming.html",
        icon: "gamepad",
        hrAfter: true,
        translations: {
          es: "Videojuegos",
          en: "Gaming",
          pt: "Videojogos",
          ru: "Игры"
        }
      },
      {
        id: "misc",
        reference: "./misc.html",
        icon: "shuffle",
        hrAfter: false,
        translations: {
          es: "Misceláneos",
          en: "Miscellaneous",
          pt: "Diversos",
          ru: "Разное"
        }
      },
      {
        id: "docs",
        reference: "./docs.html",
        icon: "file",
        hrAfter: false,
        translations: {
          es: "Documentación",
          en: "Documentation",
          pt: "Documentação",
          ru: "Документация"
        }
      },
      {
        id: "links",
        reference: "./links.html",
        icon: "link",
        hrAfter: false,
        translations: {
          es: "Enlaces Destacados",
          en: "Featured Links",
          pt: "Links em Destaque",
          ru: "Избранные ссылки"
        }
      },
      {
        id: "calculations",
        reference: "./calculations.html",
        icon: "calculator",
        hrAfter: true,
        translations: {
          es: "Calculadora",
          en: "Calculator",
          pt: "Calculadora",
          ru: "Калькулятор"
        }
      },
      {
        id: "faq",
        reference: "./faq.html",
        icon: "question",
        hrAfter: false,
        translations: {
          es: "Preguntas Frecuentes",
          en: "Frequently Asked Questions",
          pt: "Perguntas Frequentes",
          ru: "Часто задаваемые вопросы"
        }
      },
    ],
};

export { data };
