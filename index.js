let topLine = [];
let bottomLine = ['0'];
let validBottomLine = [];
let operator, number1, number2, lastPushedButton;

document.onload = refreshBottomLine();

function operate(number1, number2, operator) {
    let result;

    switch (operator) {
        case '+':
            result = number1 + number2;
            break;
        case '-':
            result = number1 - number2;
            break;
        case '*':
            result = number1 * number2;
            break;
        case '/':
            result = number1 / number2;
            break;
    }

    return result.toString().split('');
};


//Numbers or Point clicked

function clickNumber() {
    buttonAnimation(this);

    if (lastPushedButton == '=') {
        cancel();
    }

    if (bottomLine.join('') === '0' && this.textContent != 0) {
        bottomLine.pop();
    } else if (bottomLine.join('') === '0' && this.textContent == 0) {
        return;
    }

    bottomLine.push(this.textContent);
    refreshBottomLine();
    lastPushedButton = this.textContent;
};


function point() {
    buttonAnimation(this);

    if (lastPushedButton === '=') {

        bottomLine = ['0'];
    }

    if (bottomLine.includes('.')) {

        return;
    }

    bottomLine.push(this.textContent);
    refreshBottomLine();
}


//Operators or Cancel clicked

function clickOperator() {

    buttonAnimation(this);

    if (bottomLine.slice(-1) == '.') {

        bottomLine.pop();
        refreshBottomLine();
    }

    if (operator === undefined || lastPushedButton === '=') {

        firstOperator(this.textContent);

    } else {

        secondaryOperator(this.textContent);
    }
};


function firstOperator(lastOperator) {

    topLine = [...numberValidator(bottomLine)];
    topLine.push(' ', lastOperator);
    lastPushedButton = lastOperator;
    operator = lastOperator;
    number1 = +bottomLine.join('')
    refreshTopLine();
    bottomLine = ['0'];
}


function secondaryOperator(lastOperator) {

    if (lastPushedButton === '+' || lastPushedButton === '-' || lastPushedButton === '*' || lastPushedButton === '/' || lastPushedButton === '=') {

        lastPushedButton = lastOperator;
        topLine.pop();
        topLine.push(lastOperator);

    } else {

        lastPushedButton = lastOperator;
        number2 = +bottomLine.join('');
        bottomLine = [...operate(number1, number2, operator)];
        topLine = [...numberValidator(bottomLine)];
        topLine.push(' ', lastOperator);
        number1 = +bottomLine.join('');
        refreshBottomLine();
        bottomLine = ['0'];
    }

    operator = lastOperator;
    refreshTopLine();
}


function cancel() {
    topLine = [];
    bottomLine = ['0'];
    lastPushedButton = undefined;
    operator = undefined;
    number1 = undefined;
    number2 = undefined;
    refreshBottomLine();
    refreshTopLine();
};


function equals() {
    buttonAnimation(this);

    if (bottomLine.slice(-1) == '.') {

        bottomLine.pop();
        refreshBottomLine();
    }

    if (operator === undefined) {

        topLine = [...numberValidator(bottomLine)];
        topLine.push(' ', this.textContent);
        refreshTopLine();
        return;
    }

    if (lastPushedButton == operator) {

        number2 = number1;

    } else if (lastPushedButton != this.textContent) {

        number2 = +bottomLine.join('');
    }

    topLine = [topLine.slice(0,-1).join(''), ' ', operator, ' ', validBottomLine.join(''), ' ='];
    bottomLine = [...operate(number1, number2, operator)];
    topLine = [...numberValidator(number1), ' ', operator, ' ', ...numberValidator(number2), ' ='];
    number1 = +bottomLine.join('');
    lastPushedButton = this.textContent;
    refreshTopLine();
    refreshBottomLine();

}


//Display and animation

function numberValidator(arr) {

    if (typeof (arr) === 'number') { //Check arr is array
        arr = arr.toString().split('');
    }

    if (arr.includes('.') && arr.length <= 11 && !arr.includes('e')) { //Return short numbers without e
        return arr;
    } else if (arr.length <= 10) {
        return arr;
    }

    let e = 0;
    let num = +arr.join('');

    if (arr.includes('e')) {

        let eIndex = arr.indexOf('e');

        if (+arr.slice(eIndex + 1).join === 0) { //Check e+-0, recursion
            arr = arr.slice(eIndex);
            numberValidator(arr);
        }

        e = +arr.slice(eIndex + 1).join('');
        num = +arr.slice(0, eIndex).join('');

    } else {
        if (+arr.join('') < 999999999.9 && +arr.join('') > 0.000000001) { //Check valid numbers with point without e
            return arr.slice(0, 11);
        }
    }

    if (num === 0) {
        return ['0', '.', 'e', '-', arr.length - 2]
    } else if (num >= 10) { //Set 1 < num < 10
        while (num >= 10) {
            num /= 10;
            e++;
        }
    } else if (num < 1) {
        while (num < 1) {
            num *= 10;
            e--;
        }
    }

    if ((num * (10 ** e)).toString().length <= 10) { //Check if number valid without e
        return (num * (10 ** e)).toString().split('');
    }

    num = num.toFixed(6 - e.toString.length);
    num = (num * 1).toString().split('')

    if (e > 0) {
        return [...num, 'e', '+', ...e.toString().split('')];
    } else if (e < 0) {
        return [...num, 'e', ...e.toString().split('')];
    } else {
        return num.toFixed(9);
    }
}

function refreshTopLine() {

    if (topLine.slice(-3, -2) == '.') {
        topLine = [...topLine.slice(0, -3), ...topLine.slice(-2)];
    }

    document.querySelector('.top_line').textContent = topLine.join('');
};


function refreshBottomLine() {
    document.querySelector('.bottom_line').textContent = [...numberValidator(bottomLine)].join('');
};


function validateLongNumbers(longNumber) {

    if (longNumber.length <= 10) {
        validBottomLine = [...longNumber];
        return longNumber;
    }

    let float = +longNumber.join('');
    let e = 0;

    if (float < 0) {
        while (float < 0) {
            float *= 10;
            e--;
        }
    } else if (float > 0) {
        while (float >= 10) {
            float /= 10;
            e++;
        }
    } 

    float = float.toFixed(8 - e.toString().length);
    validBottomLine = [float, 'e', e]

    return validBottomLine;

}

function buttonAnimation(button) {
    button.classList.add('pressed');
    setTimeout(() => {
        button.classList.remove('pressed');
    }, 100);
}


//Event Listeners

document.querySelectorAll('.button_number').forEach(e => e.addEventListener('click', clickNumber));
document.querySelectorAll('.button_operator').forEach(e => e.addEventListener('click', clickOperator));
document.querySelector('.cancel').addEventListener('click', cancel);
document.querySelector('.point').addEventListener('click', point);
document.querySelector('.equals').addEventListener('click', equals);