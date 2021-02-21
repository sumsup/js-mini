// TODO
// phase 2.
// - 숫자 버튼 조합으로 계산 가능하게.
// - 키보드로 계산 가능하게.

// TODO
// 문제점.
// 처리 로직이 여기저기 분산되 있고.
// flag도 하나의 목적으로 사용해야 하는데 여러가지 목적으로 사용하다보니까
// flag를 변경하면 의도치 않은 부작용들이 발생한다.
// 하나의 flag는 하나의 책임을 지도록 하자.
// 함수도 마찬가지.
// 단일책임의 원칙이 여기서 나왔구나.
// - 단일책임의 원칙. 하나의 flag는 하나의 목적으로.
// - 분산된 로직을 하나로 모으기.

// TODO
// 리펙토링을 통해서 로직 단순화.

let inputNum;
let outputStr = '';
let outputMark; // 화면에 표시용 기호.
let calcMark; // 실제 계산용 기호.
let resultNum = new Number();
let isDoEqualFlag = false; // = 을 한번이라도 실행했는지 여부를 체크.

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
            outputMark = event.target.innerHTML;

            // 최초에 계산용 기호에 할당.
            // = 을 실행한 이후에는 즉시 할당.
            // 이후부터는, 한번 계산이 끝나면 doCalc()에서 변경해줌.
            if (calcMark === undefined || isDoEqualFlag === true) {
                calcMark = outputMark;
            }

            if (document.querySelector('#inputNum').value === '') {
                alert('숫자를 입력해 주세요!');
                document.getElementById('inputNum').focus();
                return;
            }

            let isIncludeEqual = outputStr.includes('=') ? true : false;
            // 계산도 해야지.
            if (isIncludeEqual) {
                outputStr = resultNum + ' ' + outputMark + ' ';
                calcMark = outputMark;
                doCalc();
            }
            else if (outputStr !== '') {
                doCalc();
            }
            else if (outputStr === '') {
                resultNum = inputNum;
            }

            // 앞의 계산식이 + 나 - 이고 뒤에 곱셈이나 나눗셈을 할때 앞 숫자들에 괄호를 씌워줘야 함.
            if (outputStr.length >= 4 && (outputMark === '×' || outputMark === '÷')) {
                if (isDoEqualFlag === true) {
                    if (isIncludeEqual === false) {
                        outputStr += outputMark + ' ';
                    }
                    outputStr += inputNum;
                    outputStr = '(' + outputStr + ') ';
                }
                else if (isDoEqualFlag === false) {
                    outputStr += inputNum;
                    outputStr = '(' + outputStr + ') ';
                    outputStr += outputMark + ' ';
                }
            }
            else if (!isIncludeEqual && isDoEqualFlag === false) {
                outputStr += inputNum + ' ' + outputMark + ' ';
            }
            else if (!isIncludeEqual && isDoEqualFlag === true) {
                outputStr += ' ' + outputMark + ' ' + inputNum;
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
            outputMark = '=';
        }

        outputStr += inputNum + ' = ' + resultNum;
        outputStrElem.innerHTML = outputStr;
        inputElem.value = '';
        inputElem.focus();
        isDoEqualFlag = true;
    });

    // c 버튼을 눌렀을 때. 리셋.
    document.querySelector('#reset-btn').addEventListener('click', function () {
        inputNum = new Number();
        resultNum = new Number();
        outputStr = '';
        outputMark = undefined;
        calcMark = undefined;
        isDoEqualFlag = false;
        outputStrElem.innerHTML = '';
        inputElem.value = '';
        inputElem.focus();
    });
}

function doCalc() {
    resultNum =  Number(resultNum);
    if (inputNum !== '') {
        inputNum = Number(inputNum);
        if (calcMark === '+') {
            resultNum += inputNum;
        }
        else if (calcMark === '-') {
            resultNum -= inputNum;
        }
        else if (calcMark === '×') {
            resultNum *= inputNum;
        }
        else if (calcMark === '÷') {
            resultNum /= inputNum;
        }
    }
    calcMark = outputMark;
}