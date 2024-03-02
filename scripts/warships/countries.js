import { data as unitsData } from "../data-sources/warships.js";
const countryContainer = document.getElementById('countries');

async function initConverters() {
    try {
        let currentLocale = localStorage.getItem("currentLocale");
        for (let i = 0; i < 3; i++) {
            unitsData.converterTypes.forEach(async unitType => {
                await generateConverterCard(unitType, currentLocale);
            });
        }
        await addListenerUpdateLang();
    } catch (error) {
        console.error("Error loading converters: ", error);
        throw error;
    }
}