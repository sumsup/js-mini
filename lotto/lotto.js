// 전역.
let nthTry = 1;

function makeLottoNumbers() {

    let numberSet = new Set();
    while(numberSet.size < 6) {
        numberSet.add(Math.floor(Math.random() * 45) + 1);
    }
    for (let number of numberSet) {
        console.log(number);
    }

    outputLottoNumbers(numberSet);
}

// 로또 번호를 화면에 표시.
function outputLottoNumbers(numberSet) {
    let numbersElem = '';
    numbersElem += "<span>" + nthTry + "번째 생성 : </span>";

    let i = 1;
    for (let number of numberSet) {
        numbersElem += "<span class='lotto-num' id='num" + i + "'> " + number + "</span>";
        i++;
    }

    const NOW_DATE = makeDate();
    numbersElem += ' 생성시간 : ' + NOW_DATE;
    numbersElem += '<br>';
    document.getElementById('lotto-num-div').insertAdjacentHTML('afterbegin',numbersElem);
    nthTry++;
}

// 생성날짜를 생성.
function makeDate() {
    const now = new Date().toLocaleString();

    return now;
}

// 로또 생성 필드를 초기화.
function resetLotto() {
    document.getElementById('lotto-num-div').innerHTML = '';
}