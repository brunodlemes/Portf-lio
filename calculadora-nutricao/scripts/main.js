import Calculator from "./application/Calculator.js";

const app = new Calculator();
const calcButton = document.getElementById('calc-button');

calcButton.addEventListener('click', () => {
    app.displayResults();
});