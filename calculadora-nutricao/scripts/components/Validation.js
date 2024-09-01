export default class Validation {
    constructor(elementsManager) {
        this.elementsManager = elementsManager;
        this.cards = this.elementsManager.getElementsByClass('card');
        this.cardsCheckboxes =  this.elementsManager.getElementsByClass('checkbox');
        this.isTheCardSuitableForDisplay = false;
    }

    checkWhichCardCanBeDisplayed() {
        this.#setsInputsValues();
        this.#checkWhichCardWasSelected();
        this.#checkWhichCardIsReadyToBeDisplayed();
    }

    checkIfAtLeastOneCardIsAbleToBeDisplayed() {
        return this.isTheCardSuitableForDisplay;
    }

    #setsInputsValues() {
        const inputs = this.elementsManager.getElementsByClass('input');

        this.inputsValues = {
            'peso': inputs['people-weight'].value,
            'altura': inputs['people-height'].value,
            'idade': inputs['people-age'].value
        };
    }

    #checkWhichCardWasSelected() {
        for (const [id, card] of Object.entries(this.cards)) {
            const checkbox = this.cardsCheckboxes[id.replace('card', 'checkbox')];
            const displayProperty = checkbox.checked ? 'block' : 'none';
            card.style.display = displayProperty;
        }
    }

    #checkWhichCardIsReadyToBeDisplayed() {
        for (const cardID of Object.keys(this.cards)) {
            switch (cardID) {
                case 'basal-metabolic-rate-card':
                case 'total-energy-expenditure-card':
                case 'diet-type-card':
                    this.#checkWhichCardHasMissingInputs(cardID, ['peso', 'altura', 'idade']);
                    break;
                case 'body-mass-index-card':
                    this.#checkWhichCardHasMissingInputs(cardID, ['peso', 'altura']);
                    break;
                case 'ideal-weight-range-card':
                    this.#checkWhichCardHasMissingInputs(cardID, ['altura']);
                    break;
                case 'macronutrients-card':
                    this.#checkWhichCardHasMissingInputs(cardID, ['peso']);
                    break;
                case 'amount-of-water-card':
                    this.#checkWhichCardHasMissingInputs(cardID, ['peso', 'idade']);
                    break;
                default:
                    break;
            }
        }
    }

    #checkWhichCardHasMissingInputs(cardID, messagesList) {
        if (messagesList.some(message => this.inputsValues[message] < 1)) {
            this.elementsManager.hideAllElementsInDiv(cardID, 'p');
            this.#addErrorMessageToCard(cardID, messagesList);
        } else {
            this.elementsManager.showAllElementsInDiv(cardID, 'p');
            this.elementsManager.hideAllElementsInDiv(cardID, '.error-message');
            this.isTheCardSuitableForDisplay = true;
        }
    }

    #addErrorMessageToCard(cardID, messagesList) {
        const filteredMessagesList = messagesList.filter((message) => this.inputsValues[message] < 1);
        const errorMessage = this.#generateErrorMessage(filteredMessagesList);
        this.cards[cardID].appendChild(errorMessage);
    }

    #generateErrorMessage(messagesList) {
        const errorMessage = this.elementsManager.createElementWithClass('p', 'error-message');
        errorMessage.textContent = (
            messagesList > 1 ? 
            `Não foi informado os valores de: ${messagesList.join(', ')}` : 
            `Não foi informado o valor de: ${messagesList.join(', ')}`
        );
        return errorMessage;
    }
}