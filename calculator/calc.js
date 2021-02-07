let num1;
let num2;
let calcStr = '';
let calcResult;
let mark;

window.onload = function () {
    eventListeners();
}

function getValue() {
    let inputNum = document.querySelector('#inputNum').value;
    return Number(inputNum);
}

function eventListeners() {
    let calcBtns = document.querySelectorAll('.calc-btn');
    for (let i = 0; i < calcBtns.length; i++) {
        calcBtns[i].addEventListener('click', function() {
            if (num1 === undefined) {
                num1 = getValue();
                mark = event.target.innerHTML;
                calcStr += num1 + " " + mark + " ";
            }
            else if (num1 !== undefined) {
                num2 = Number(getValue());
                doCalc(num2);
                outputContinue();
            }
            inputNumReset();

        });
    }

    document.querySelector('#calc-go-btn').addEventListener('click', function() {
        num2 = getValue();
        doCalc(num2);
        outputResult();
    });

    document.querySelector('#reset-btn').addEventListener('click', function() {
        resetCalc();
    });
}

function doCalc(num2) {
    num1 = Number(num1);

    if (mark === '+') {
        calcResult = num1 + num2;
    }
    else if (mark === '-') {
        calcResult = num1 - num2;
    }
    else if (mark === '×') {
        calcResult = num1 * num2;
    }
    else if (mark === '÷') {
        calcResult = num1 / num2;
    }
}

function outputContinue() {
    calcStr = calcResult + " " + mark + " ";
    document.querySelector('#result').innerHTML = calcStr;
    document.querySelector('#inputNum').value = '';
}

function outputResult() {
    calcStr = calcResult;
    document.querySelector('#result').innerHTML = calcStr;
    document.querySelector('#inputNum').value = '';
}

function inputNumReset() {
    document.querySelector('#result').innerHTML = calcStr;
    document.querySelector('#inputNum').value = '';
    document.querySelector('#inputNum').focus();
    document.querySelector('#calc-go-btn').disabled = false;
}

function resetCalc() {
    num1 = undefined;
    num2 = undefined;
    mark = undefined;
    calcResult = undefined;
    calcStr = '';
    document.querySelector('#result').innerHTML = '';
    document.querySelector('#inputNum').value = '';
    document.querySelector('#inputNum').focus();
    document.querySelector('#calc-go-btn').disabled = true;
}