import { data as unitsData } from "/data-sources/calculations.js";
const converterContainer = document.getElementById('calculations');

async function initConverters() {
    try {
        let currentLocale = localStorage.getItem("currentLocale");
        for (let i = 0; i < 3; i++) {
            unitsData.converterTypes.forEach(unitType => {
                generateConverterCard(unitType, currentLocale);
            });
        }
        addListenerUpdateLang();
    } catch (error) {
        console.error("Error loading converters: ", error);
        throw error;
    }
}

function generateConverterCard(unitType, locale) {
    const defaultName = unitType.name["en"].toLowerCase();

    const card = document.createElement("div");
    card.classList.add("card");

    const cardHeader = document.createElement("div");
    cardHeader.classList.add("card-header");
    cardHeader.textContent = unitType.name[locale];
    cardHeader.setAttribute("data-unit-name", defaultName.toLowerCase());

    const icon = document.createElement("i");
    icon.classList.add("fas", `fa-${unitType.icon.toLowerCase()}`);

    const form = document.createElement("form");

    const inputGroup = document.createElement("div");
    inputGroup.classList.add("input-group");
    inputGroup.setAttribute("data-unit-name", defaultName.toLowerCase());

    const inputLabel = document.createElement("label");
    inputLabel.textContent = unitsData.placeholders.input[locale];
    inputLabel.setAttribute("for", `${defaultName}-value-input`);

    const inputValue = document.createElement("input");
    inputValue.type = "number";
    inputValue.placeholder = unitsData.placeholders.input[locale];
    inputValue.classList.add("input-value");
    inputValue.id = `${defaultName}-value-input`;

    const selectFrom = createSelect(unitType.units["en"], unitType.units[locale]);
    selectFrom.setAttribute("title", unitsData.placeholders.inputSelect[locale]);
    selectFrom.id = `${defaultName}-select-from`;
    selectFrom.name = `${defaultName}-select-from`;

    inputGroup.appendChild(inputLabel);
    inputGroup.appendChild(inputValue);
    inputGroup.appendChild(selectFrom);

    const outputGroup = document.createElement("div");
    outputGroup.classList.add("output-group");
    outputGroup.setAttribute("data-unit-name", defaultName.toLowerCase());

    const outputLabel = document.createElement("label");
    outputLabel.textContent = unitsData.placeholders.output[locale];
    outputLabel.setAttribute("for", `${defaultName}-result-output`);

    const outputValue = document.createElement("input");
    outputValue.type = "text";
    outputValue.placeholder = unitsData.placeholders.output[locale];
    outputValue.readOnly = true;
    outputValue.classList.add("output-value");
    outputValue.id = `${defaultName}-result-output`;

    const selectTo = createSelect(unitType.units["en"], unitType.units[locale]);
    selectTo.setAttribute("title", unitsData.placeholders.outputSelect[locale]);
    selectTo.id = `${defaultName}-select-to`;
    selectTo.name = `${defaultName}-select-to`;

    outputGroup.appendChild(outputLabel);
    outputGroup.appendChild(outputValue);
    outputGroup.appendChild(selectTo);

    cardHeader.appendChild(icon);
    form.appendChild(inputGroup);
    form.appendChild(outputGroup);
    card.appendChild(cardHeader);
    card.appendChild(form);

    inputValue.addEventListener('input', () => {
        calculateConversion(inputValue.value, selectFrom.value, selectTo.value, outputValue, unitType.conversions);
    });

    selectFrom.addEventListener('change', () => {
        calculateConversion(inputValue.value, selectFrom.value, selectTo.value, outputValue, unitType.conversions);
    });

    selectTo.addEventListener('change', () => {
        calculateConversion(inputValue.value, selectFrom.value, selectTo.value, outputValue, unitType.conversions);
    });

    converterContainer.appendChild(card);
}

function createSelect(defaultUnits, units) {
    const select = document.createElement('select');

    defaultUnits.forEach((defaultUnit, index) => {
        const option = document.createElement('option');
        const englishValue = defaultUnit.toLowerCase();
        const localizedValue = units[index];

        option.value = englishValue;
        option.textContent = localizedValue;

        select.appendChild(option);
    });

    return select;
}

function calculateConversion(value, fromUnit, toUnit, output, conversions) {
    if (!isNaN(value)) {
        const baseValue = value * conversions[fromUnit].toMain;
        const result = baseValue * conversions[toUnit].fromMain;
        output.value = (Number.isInteger(result)) ? result.toFixed(0) : result.toFixed(3);
    } else {
        output.value = '';
    }
}

function updateLang(locale) {
    const calculationsContainer = document.getElementById('calculations');

    const cardHeaders = calculationsContainer.querySelectorAll('.card-header');
    cardHeaders.forEach(header => {
        let unitName = header.dataset.unitName.toLowerCase();
        let unitType = unitsData.converterTypes.find(unitType => unitType.name.en.toLowerCase() === unitName);
        header.textContent = unitType.name[locale];

        let icon = document.createElement("i");
        icon.classList.add("fas", `fa-${unitType.icon.toLowerCase()}`);
        header.appendChild(icon);
    });

    const inputGroups = calculationsContainer.querySelectorAll('.input-group');
    inputGroups.forEach(inputGroup => {
        let unitName = inputGroup.dataset.unitName.toLowerCase();
        let unitType = unitsData.converterTypes.find(unitType => unitType.name.en.toLowerCase() === unitName);

        let units = unitType.units[locale];

        let label = inputGroup.querySelector('label');
        let input = inputGroup.querySelector('input');
        let select = inputGroup.querySelector('select');
        let options = inputGroup.querySelectorAll('option');

        label.textContent = unitsData.placeholders.input[locale];
        label.setAttribute("title", unitsData.placeholders.inputSelect[locale]);
        input.placeholder = unitsData.placeholders.inputSelect[locale];
        select.setAttribute("title", unitsData.placeholders.outputSelect[locale]);

        options.forEach((option, index) => {
            option.textContent = units[index];
        });
    });

    const outputGroups = calculationsContainer.querySelectorAll('.output-group');
    outputGroups.forEach(outputGroup => {
        let unitName = outputGroup.dataset.unitName.toLowerCase();
        let unitType = unitsData.converterTypes.find(unitType => unitType.name.en.toLowerCase() === unitName);

        let units = unitType.units[locale];

        let label = outputGroup.querySelector('label');
        let output = outputGroup.querySelector('input');
        let select = outputGroup.querySelector('select');
        let options = outputGroup.querySelectorAll('option');

        label.textContent = unitsData.placeholders.output[locale];
        label.setAttribute("title", unitsData.placeholders.outputSelect[locale]);
        output.placeholder = unitsData.placeholders.outputSelect[locale];
        select.setAttribute("title", unitsData.placeholders.outputSelect[locale]);

        options.forEach((option, index) => {
            option.textContent = units[index];
        });
    });

    addListenerUpdateLang();
};

function addListenerUpdateLang() {
    const langOptions = document.querySelectorAll('.lang-option');
    langOptions.forEach(langOption => {
        langOption.addEventListener("click", function () {
            updateLang(langOption.dataset.langId);
        });
    });
}

await initConverters();