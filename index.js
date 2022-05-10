let number1 = [];
let number2 = [];
let currentOperator, topLine, bottomLine;

// function operate(number1, number2, operator) {

// }

// function add(number1, number2) {

// }

// function subtract(number1, number2) {

// }

// function multiply(number1, number2) {

// }

// function divide(number1, number2) {

// }

function clickNumber() {
    console.log(this.textContent);
}

function clickOperator() {
    console.log(this.textContent);
}

function cancel() {
    console.log(this.textContent);
}

//Event Listeners

document.querySelectorAll('.button_number').forEach(e => e.addEventListener('click', clickNumber));
document.querySelectorAll('.button_operator').forEach(e => e.addEventListener('click', clickOperator));
document.querySelector('.cancel').addEventListener('click', cancel);