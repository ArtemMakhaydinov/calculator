let topLine = [];
let bottomLine = ['0'];
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
    console.log(result);
    return result.toString().split('');
};


//Numbers or Point clicked

function clickNumber() {
    buttonAnimation(this);

    if(lastPushedButton == '='){
        bottomLine = ['0'];
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

    if(lastPushedButton === '='){
        bottomLine = ['0'];
    }

    if(bottomLine.includes('.')){
        return;
    }

    bottomLine.push(this.textContent);
    refreshBottomLine();
}


//Operators or Cancel clicked

function clickOperator() {
    buttonAnimation(this);

    if (operator === undefined || lastPushedButton === '=') {
        firstOperator(this.textContent);
    } else {
        secondaryOperator(this.textContent);
    }
};


function firstOperator(lastOperator) {

    topLine = [...bottomLine];
    topLine.push(' ', lastOperator);
    lastPushedButton = lastOperator;
    operator = lastOperator;
    number1 = +bottomLine.join('')
    refreshTopLine();
    bottomLine = ['0'];
}


function secondaryOperator(lastOperator) {

    if (lastPushedButton === /[/\-+=*]/) {

        lastPushedButton = lastOperator;
        topLine.pop().push(lastOperator);

    } else {

        lastPushedButton = lastOperator;
        number2 = +bottomLine.join('');
        bottomLine = [...operate(number1, number2, operator)];
        topLine = [...bottomLine];
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

    if (operator === undefined) {

        topLine = [...bottomLine];
        topLine.push(' ', this.textContent);
        refreshTopLine();
        return;
    }

    if (operator == lastPushedButton) {

        number2 = number1;
        bottomLine = [...operate(number1, number2, operator)];
        number1 = +bottomLine.join('');

    } else {

        if (lastPushedButton != this.textContent) {
            number2 = +bottomLine.join('');
        }

        bottomLine = [...operate(number1, number2, operator)];
        topLine = [number1, ' ', operator, ' ', number2, ' ='];
        number1 = +bottomLine.join('');

    }

    lastPushedButton = this.textContent;
    refreshTopLine();
    refreshBottomLine();

}


//Display and animation

function refreshTopLine() {
    document.querySelector('.top_line').textContent = topLine.join('');
};


function refreshBottomLine() {
    document.querySelector('.bottom_line').textContent = bottomLine.join('');
};


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