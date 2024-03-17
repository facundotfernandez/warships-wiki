const data = {
    themes: {
        default: "dark", darkTheme: {
            es: "Modo Oscuro", en: "Dark Mode", pt: "Modo Escuro", ru: "Темный режим"
        }, lightTheme: {
            es: "Modo Claro", en: "Light Mode", pt: "Modo Claro", ru: "Светлый режим"
        }
    }, locales: {
        default: "es", es: {
            id: "es", name: "Español", icon: "mx",
        }, en: {
            id: "en", name: "English", icon: "us",
        }, pt: {
            id: "pt", name: "Português", icon: "br",
        }, ru: {
            id: "ru", name: "Русский", icon: "ru",
        }
    }, views: [{
        id: "index", reference: "", icon: "home", hrAfter: true, disabled: false, translations: {
            es: "Inicio", en: "Home", pt: "Início", ru: "Домой"
        }
    }, {
        id: "armies",
        reference: "armies.html",
        icon: "person-military-rifle",
        hrAfter: false,
        disabled: true,
        translations: {
            es: "Armadas", en: "Armies", pt: "Forças Armadas", ru: "Армии"
        }
    }, {
        id: "aircraft",
        reference: "aircraft.html",
        icon: "jet-fighter-up",
        hrAfter: false,
        disabled: true,
        translations: {
            es: "Aeronaves", en: "Aircraft", pt: "Aeronaves", ru: "Самолёты"
        }
    }, {
        id: "warships", reference: "warships.html", icon: "ship", hrAfter: false, disabled: false, translations: {
            es: "Buques", en: "Warships", pt: "Navios", ru: "Военные корабли"
        }
    }, {
        id: "armaments", reference: "armaments.html", icon: "gun", hrAfter: true, disabled: true, translations: {
            es: "Armamentos", en: "Armaments", pt: "Armamentos", ru: "Вооружение"
        }
    }, {
        id: "technologies",
        reference: "technologies.html",
        icon: "microchip",
        hrAfter: false,
        disabled: true,
        translations: {
            es: "Tecnologías", en: "Technologies", pt: "Tecnologias", ru: "Технологии"
        }
    }, {
        id: "policies", reference: "policies.html", icon: "landmark", hrAfter: false, disabled: true, translations: {
            es: "Políticas Navales", en: "Naval Policies", pt: "Políticas Navais", ru: "Военная политика"
        }
    }, {
        id: "terms", reference: "terms.html", icon: "spell-check", hrAfter: true, disabled: true, translations: {
            es: "Terminologías", en: "Terminologies", pt: "Terminologias", ru: "Терминологии"
        }
    }, {
        id: "cinema", reference: "cinema.html", icon: "film", hrAfter: false, disabled: true, translations: {
            es: "Cinematografía y Música",
            en: "Cinematography & Music",
            pt: "Cinematografia e Música",
            ru: "Кинематография и музыка"
        }
    }, {
        id: "gaming", reference: "gaming.html", icon: "gamepad", hrAfter: true, disabled: true, translations: {
            es: "Videojuegos", en: "Gaming", pt: "Videojogos", ru: "Игры"
        }
    }, {
        id: "misc", reference: "misc.html", icon: "shuffle", hrAfter: false, disabled: true, translations: {
            es: "Misceláneos", en: "Miscellaneous", pt: "Diversos", ru: "Разное"
        }
    }, {
        id: "docs", reference: "docs.html", icon: "file", hrAfter: false, disabled: true, translations: {
            es: "Documentación", en: "Documentation", pt: "Documentação", ru: "Документация"
        }
    }, {
        id: "links", reference: "links.html", icon: "link", hrAfter: false, disabled: true, translations: {
            es: "Enlaces Destacados", en: "Featured Links", pt: "Links em Destaque", ru: "Избранные ссылки"
        }
    }, {
        id: "calculations",
        reference: "calculations.html",
        icon: "calculator",
        hrAfter: true,
        disabled: false,
        translations: {
            es: "Cálculos", en: "Calculations", pt: "Cálculos", ru: "Расчеты"
        }
    }, {
        id: "about", reference: "about.html", icon: "anchor", hrAfter: false, disabled: true, translations: {
            es: "Proyecto Warships Wiki",
            en: "Warships Wiki Project",
            pt: "Projeto Warships Wiki",
            ru: "Военные корабли Вики Проекта"
        }
    }, {
        id: "faq", reference: "faq.html", icon: "question", hrAfter: false, disabled: true, translations: {
            es: "Preguntas Frecuentes",
            en: "Frequently Asked Questions",
            pt: "Perguntas Frequentes",
            ru: "Часто задаваемые вопросы"
        }
    }, {
        id: "our-team",
        reference: "our-team.html",
        icon: "people-group",
        hrAfter: false,
        disabled: true,
        translations: {
            "es": "Nuestros integrantes", "en": "Our Team", "pt": "Nossa Equipe", "ru": "Наша команда"
        }
    }, {
        id: "collaborators",
        reference: "collaborators.html",
        icon: "user-pen",
        hrAfter: false,
        disabled: true,
        translations: {
            "es": "Nuestros colaboradores",
            "en": "Our Collaborators",
            "pt": "Nossos Colaboradores",
            "ru": "Наши соавторы"
        }
    }, {
        id: "partners", reference: "partners.html", icon: "handshake", hrAfter: true, disabled: true, translations: {
            "es": "Vuestras colaboraciones", "en": "Your Contributions", "pt": "Suas Contribuições", "ru": "Ваши вклады"
        }
    }, {
        id: "warship", translations: {
            es: "Buque", en: "Warship", pt: "Navio", ru: "Военный корабль"
        }
    }, {
        id: "country", translations: {
            title: {es: "Pais", en: "Country", pt: "País", ru: "Страна" },
            subtitle: {es: "Tipos", en: "Types", pt: "Tipos", ru: "Типы" },
        }
    }], header: {
        translations: {
            "es": "Wiki de Buques de Guerra",
            "en": "Warships Wiki",
            "pt": "Wiki de Navios de Guerra",
            "ru": "Военные корабли Вики"
        }, searchBar: {
            placeholder: {
                "es": "Buscar", "en": "Search", "pt": "Procurar", "ru": "Поиск"
            }, searchIcon: {
                "es": "Ícono de Búsqueda", "en": "Search icon", "pt": "Ícone de pesquisa", "ru": "Значок поиска"
            }
        }
    }, footer: {
        donationButton: {
            id: "donation", reference: "#", icon: "hand-holding-dollar", translations: {
                "es": "Donaciones", "en": "Donations", "pt": "Doações", "ru": "Пожертвования"
            }
        }, socialButtons: [{
            id: "twitter", reference: "#", icon: "twitter", translations: {
                "es": "Twitter", "en": "Twitter", "pt": "Twitter", "ru": "Твиттер"
            }
        }, {
            id: "facebook", reference: "#", icon: "facebook", translations: {
                "es": "Facebook", "en": "Facebook", "pt": "Facebook", "ru": "Фейсбук"
            }
        }, {
            id: "instagram", reference: "#", icon: "instagram", translations: {
                "es": "Instagram", "en": "Instagram", "pt": "Instagram", "ru": "Инстаграм"
            }
        }], developerButton: {
            name: "Facundo 'Pastruken' Fernandez", reference: "#", translations: {
                "es": "Sitio web desarrollado por",
                "en": "Website developed by",
                "pt": "Site desenvolvido por",
                "ru": "Сайт разработан"
            }
        }
    }
};


export {data};
