export default class ElementsManager {
     createElementWithClass(tagName, className) {
        const element = document.createElement(tagName);
        element.classList.add(className);
        return element;
    }

    getElementsByClass(className) {
        const elements = document.querySelectorAll('.' + className);
        const elementsMap = {};

        for (const element of elements) {
            const id = element.id;
            elementsMap[id] = element;
        }

        return elementsMap;
    }

    updateTextInElements(elements, texts) {
        elements.forEach((element, index) => {
            element.textContent = texts[index];
        });
    }

    showAllElementsInDiv(divID, element) {
        const elements = document.querySelectorAll(`#${divID} ${element}`);
        elements.forEach(element => {element.style.display = ''});
    }

    hideAllElementsInDiv(divID, element) {
        const elements = document.querySelectorAll(`#${divID} ${element}`);
        elements.forEach(element => {element.style.display = 'none'});
    }

    updateRangeText() {
        const inputs = this.getElementsByClass('input');
        const textsRange = this.getElementsByClass('text-range');
        
        this.#handleRangeElement(inputs['diet-type-range'], textsRange['diet-type-range-text'], true);
        this.#handleRangeElement(inputs['protein-range'], textsRange['protein-range-text']);
        this.#handleRangeElement(inputs['fat-range'], textsRange['fat-range-text']);
        this.#handleRangeElement(inputs['carbohydrate-range'], textsRange['carbohydrate-range-text']);
    }

    #handleRangeElement(rangeElement, textElement, dietTypeOption = false) {
        rangeElement.oninput = () => {
            if (!dietTypeOption) {
                textElement.textContent = rangeElement.value;
            } else {
                const dietTypeOptionValue = this.getElementsByClass('input')['diet-type-option'].value;
                switch(dietTypeOptionValue) {
                    case 'def':
                        textElement.textContent = `Deficit: ${rangeElement.value}kcal`;
                        break;
                    case 'sup':
                        textElement.textContent = `Superavit: ${rangeElement.value}kcal`;
                        break;
                    default:
                        break;
                }
            }
        }
    }
}