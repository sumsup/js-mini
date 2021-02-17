// TODO
// phase 2.
// - 숫자 버튼 조합으로 계산 가능하게.
// - 키보드로 계산 가능하게.

let inputNum;
let outputStr = '';
let mark;
let resultNum = new Number();

window.onload = function() {
    eventListeners();
}

function eventListeners() {
    let outputStrElem = document.querySelector('#outputStrElem');
    let calcBtns = document.querySelectorAll('.calc-btn');
    let equalElem = document.querySelector('#calc-go-btn');
    let inputElem = document.querySelector('#inputNum');

    // 계산 기호를 눌렀을 때.
    for (let i = 0; i < calcBtns.length; i++) {
        calcBtns[i].addEventListener('click', function () {
            inputNum = Number(document.querySelector('#inputNum').value);
            mark = event.target.innerHTML;

            if (document.querySelector('#inputNum').value === '') {
                alert('숫자를 입력해 주세요!');
                return;
            }

            let isIncludeEqual = outputStr.includes('=') ? true : false;
            // 계산도 해야지.
            if (isIncludeEqual) {
                outputStr = resultNum + ' ' + mark + ' ';
                doCalc();
            }
            else if (outputStr !== '') {
                doCalc();
            }
            else if (outputStr === '') {
                resultNum = inputNum;
            }

            outputStr += inputNum;
            // 앞의 계산식이 + 나 - 일 경우.
            if (outputStr.length >= 4 && (mark === '×' || mark === '÷')) {
                outputStr = '(' + outputStr + ')';
            }
            if (!isIncludeEqual) {
                outputStr += ' ' + mark + ' ';
            }
            outputStrElem.innerHTML = outputStr;
            equalElem.disabled = false;
            inputElem.value = '';
            inputElem.focus();
        });
    }

    // = 를 눌렀을 때.
    document.querySelector('#calc-go-btn').addEventListener('click', function() {
        inputNum = document.querySelector('#inputNum').value;

        if (outputStr !== '') {
            doCalc();
            mark = '=';
        }

        outputStr += inputNum + ' = ' + resultNum;
        outputStrElem.innerHTML = outputStr;
        inputElem.value = '';
        inputElem.focus();
    });

    // c 버튼을 눌렀을 때. 리셋.
    document.querySelector('#reset-btn').addEventListener('click', function () {
        inputNum = new Number();
        resultNum = new Number();
        outputStr = '';
        mark = '';
        outputStrElem.innerHTML = '';
        inputElem.value = '';
        inputElem.focus();
    });
}

function doCalc() {
    resultNum =  Number(resultNum);
    if (inputNum !== '') {
        inputNum = Number(inputNum);
        if (mark === '+') {
            resultNum += inputNum;
        }
        else if (mark === '-') {
            resultNum -= inputNum;
        }
        else if (mark === '×') {
            resultNum *= inputNum;
        }
        else if (mark === '÷') {
            resultNum /= inputNum;
        }
    }
}