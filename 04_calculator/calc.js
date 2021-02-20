let calcStr = '';
let calcResult;
let mark;
let continueYn = false;

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
            mark = event.target.innerHTML;
            if (continueYn === true) {
                outputResult();
            }

            inputNum = getValue();
            if (calcResult === undefined) {
                calcResult = inputNum;
                calcStr = calcResult + ' ' + mark + ' ';
            }
            else if (calcResult !== undefined) {
                doCalc(inputNum);
                calcStr += inputNum + ' ' + mark + ' ';
            }
            document.querySelector('#calc-go-btn').disabled = false;
            outputResult();
        });
    }

    document.querySelector('#calc-go-btn').addEventListener('click', function() {
        let inputNum = getValue();
        if (inputNum === '') {
            calcStr += ' = ' + calcResult;
        }
        else if (inputNum !== '') {
            doCalc(inputNum);
            calcStr += inputNum + ' = ' + calcResult;
        }
        outputResult();
        continueYn = true;
    });

    document.querySelector('#reset-btn').addEventListener('click', function() {
        resetCalc();
    });
}

function doCalc(inputNum) {
    if (mark === '+') {
        calcResult = calcResult + inputNum;
    }
    else if (mark === '-') {
        calcResult = calcResult - inputNum;
    }
    else if (mark === '×') {
        calcResult = calcResult * inputNum;
    }
    else if (mark === '÷') {
        calcResult = calcResult / inputNum;
    }
}

function outputResult() {
    document.querySelector('#result').innerHTML = calcStr;
    document.querySelector('#inputNum').value = '';
    document.querySelector('#inputNum').focus();
}

function resetCalc() {
    mark = undefined;
    calcResult = undefined;
    calcStr = '';
    document.querySelector('#result').innerHTML = '';
    document.querySelector('#inputNum').value = '';
    document.querySelector('#inputNum').focus();
    document.querySelector('#calc-go-btn').disabled = true;
}