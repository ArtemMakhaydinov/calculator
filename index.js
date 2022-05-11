let topLine = [];
let bottomLine = [];
let operator, number1, number2, lastPushedButton;


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


//Numbers or point clicked

function clickNumber() {

    buttonAnimation(this);
    bottomLine.push(this.textContent);
    refreshBottomLine();
    lastPushedButton = this.textContent;
};


function point() {
    console.log(this.textContent);

}


//Operators or Cancel clicked

function clickOperator() {
    buttonAnimation(this);

    if (operator == undefined) {
        firstOperator(this.textContent);
    } else {
        secondaryOperator(this.textContent);
    }
};


function firstOperator(lastOperator) {

    if(lastPushedButton == undefined){
        return;
    }

    topLine = [...bottomLine];
    topLine.push(' ', lastOperator);
    lastPushedButton = lastOperator;
    operator = lastOperator;
    number1 = +bottomLine.join('')
    console.log('n1 = ' + number1);
    refreshTopLine();
    bottomLine = [];
}


function secondaryOperator(lastOperator) {

    if (lastPushedButton == /[/\-+=*]/) {

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
        bottomLine = [];
    }

    operator = lastOperator;
    refreshTopLine();
}


function cancel() {
    topLine = [];
    bottomLine = [];
    lastPushedButton = undefined;
    operator = undefined;
    number1 = undefined;
    number2 = undefined;
    refreshBottomLine();
    refreshTopLine();
};


function equals(lastOperator) {
    

}


//Display and animation

function refreshTopLine() {
    document.querySelector('.top_line').textContent = topLine.join('');
};


function refreshBottomLine() {
    document.querySelector('.bottom_line').textContent = bottomLine.join('');
};


function buttonAnimation(button){
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