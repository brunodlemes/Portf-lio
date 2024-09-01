export default class Operations {
    constructor(elementsManager) {
        this.elementsManager = elementsManager;
        this.SEX_FACTOR = {
            'masc': 5,
            'fem': -161
        };
        this.ACTIVITY_FACTOR = {
            'act-l1': 1.2,
            'act-l2': 1.375, 
            'act-l3': 1.5,
            'act-l4': 1.725,
            'act-l5': 1.9
        };
        this.DIET_TYPE_TITLE = {
            'def': 'Deficit',
            'sup': 'Superavit'
        };
    }

    getAllResults() {
        this.#setInputsValues();

        return {
            basalMetabolicRate: this.calculateBasalMetabolicRate(),
            totalEnergyExpenditure: this.calculateTotalEnergyExpenditure(),
            caloriesOfDietType: this.calculateCaloriesOfDietType(),
            bodyMassIndex: this.calculateBodyMassIndex(),
            idealWeightRange: this.calculateIdealWeightRange(),
            macronutrients: this.calculateMacronutrients(),
            amountOfWater: this.calculateAmountOfWater(),
        }
    }
    
    #setInputsValues() {
        const inputs = this.elementsManager.getElementsByClass('input');

        this.weight = inputs['people-weight'].value;
        this.height = inputs['people-height'].value;
        this.age = inputs['people-age'].value;
        this.sexOption = inputs['sex-option'].value; 
        this.activityLevelOption =  inputs['activity-level-option'].value;
        this.dietTypeOption = inputs['diet-type-option'].value;
        this.dietTypeValue = inputs['diet-type-range'].value;
        this.protein = inputs['protein-range'].value;
        this.fat = inputs['fat-range'].value;
        this.carbohydrate = inputs['carbohydrate-range'].value;
    }

    calculateBasalMetabolicRate() {
        const sexFactor = this.SEX_FACTOR[this.sexOption];
        
        return (10 * this.weight) + (6.25 * (this.height * 100)) - (5 * this.age) + sexFactor;
    }

    calculateTotalEnergyExpenditure() {
        const basalMetabolicRate = this.calculateBasalMetabolicRate();
        const activityFactor = this.ACTIVITY_FACTOR[this.activityLevelOption];

        return basalMetabolicRate * activityFactor;
    }

    calculateCaloriesOfDietType() {
        const totalEnergyExpenditure = this.calculateTotalEnergyExpenditure();
        const dietTypeTitle = this.DIET_TYPE_TITLE[this.dietTypeOption];
        const dietTypeCalories = (
            this.dietTypeOption == 'def' ? 
            Number(totalEnergyExpenditure) - Number(this.dietTypeValue) : 
            Number(totalEnergyExpenditure) + Number(this.dietTypeValue)
        );

        return { 
            title: dietTypeTitle, 
            calories: dietTypeCalories 
        }
    }

    calculateBodyMassIndex() {
        const bodyMassIndex = this.weight / (this.height ** 2);
        let bodyMassIndexText;

        if (bodyMassIndex < 18.5) {
            bodyMassIndexText = 'Abaixo do peso';
        } else if (bodyMassIndex >= 18.5 && bodyMassIndex <= 24.9) {
            bodyMassIndexText = 'Peso normal';
        } else if (bodyMassIndex >= 25 && bodyMassIndex <= 29.9) {
            bodyMassIndexText = 'Sobrepeso';
        } else if (bodyMassIndex >= 30 && bodyMassIndex <= 34.9) {
            bodyMassIndexText = 'Obesidade I';
        } else if (bodyMassIndex >= 35 && bodyMassIndex <= 39.9) {
            bodyMassIndexText = 'Obesidade II';
        } else {
            bodyMassIndexText = 'Obesidade III';
        }

        return { value: bodyMassIndex, text: bodyMassIndexText }
    }

    calculateIdealWeightRange() {
        const minIdealWeight = 18.5 * (this.height ** 2);
        const maxIdealWeight = 24.9 * (this.height ** 2);

        return { minIdealWeight, maxIdealWeight };
    }

    calculateMacronutrients() {
        return {
            protein: this.protein * this.weight,
            fat: this.fat * this.weight,
            carbohydrate: this.carbohydrate * this.weight
        };
    }

    calculateAmountOfWater() {
        let amountOfWater;
    
        if(this.age >= 0 && this.age <= 17) {
            amountOfWater = 40 * this.weight;
        } else if(this.age >= 18 && this.age <= 55) {
            amountOfWater = 35 * this.weight;
        } else if(this.age >= 56 && this.age <= 65) {
            amountOfWater = 30 * this.weight;
        } else {
            amountOfWater = 25 * this.weight;
        }
    
        return amountOfWater;
    }
}