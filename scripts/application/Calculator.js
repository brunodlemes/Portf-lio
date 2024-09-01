import ElementsManager from '../components/ElementsManager.js';
import Operations from '../components/Operations.js';
import Validation from '../components/Validation.js'

export default class Calculator {
    constructor() {   
        this.elementsManager = new ElementsManager();
        this.validation = new Validation(this.elementsManager);
        this.operations = new Operations(this.elementsManager);
        this.elementsManager.updateRangeText();
    }

    displayResults() {
        const textElements = Object.values(this.elementsManager.getElementsByClass('text-card'));
        const texts = this.#generateTextsFromResults(this.operations.getAllResults());

        this.validation.checkWhichCardCanBeDisplayed();
        if (this.validation.checkIfAtLeastOneCardIsAbleToBeDisplayed()) {
            this.elementsManager.updateTextInElements(textElements, texts);
        }
        this.#showResultsContainer();
    }

    #generateTextsFromResults(results) {
        const {
            basalMetabolicRate,
            totalEnergyExpenditure,
            caloriesOfDietType,
            bodyMassIndex,
            idealWeightRange,
            macronutrients,
            amountOfWater
        } = results;

        return [
            `${basalMetabolicRate.toFixed()}kcal`,
            `${totalEnergyExpenditure.toFixed()}kcal`,
            `${caloriesOfDietType.title}`,
            `${caloriesOfDietType.calories.toFixed()}kcal`,
            `${bodyMassIndex.value.toFixed(1)}kg/m`,
            `${bodyMassIndex.text}`,
            `${`${idealWeightRange.minIdealWeight.toFixed(1)}kg 
            ~ ${idealWeightRange.maxIdealWeight.toFixed(1)}kg`}`,
            `${macronutrients.protein.toFixed()}g`,
            `${macronutrients.fat.toFixed()}g`,
            `${macronutrients.carbohydrate.toFixed()}g`,
            `${amountOfWater.toFixed()/1000}L`
        ]
    }

    #showResultsContainer() {
        const containerCard = document.getElementById('container-card');
        if (containerCard) {
            containerCard.style.display = 'block';
        }
    }
}