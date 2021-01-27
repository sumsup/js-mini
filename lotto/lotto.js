// 전역.
let nthTry = 1;

// 로또 번호를 생성.
function makeLottoNumbers() {

    let numberSet = new Set();
    while(numberSet.size < 6) {
        numberSet.add(Math.floor(Math.random() * 45) + 1);
    }

    // 로또번호는 한번에 20개까지 생성가능.
    if (nthTry > 50) {
        alert('생성 가능 횟수는 50회까지 입니다.\n초기화후 다시 시도해 주세요.');
        return;
    }

    outputLottoNumbers(numberSet);
}

// 로또 번호를 화면에 표시.
function outputLottoNumbers(numberSet) {
    let numbersElem = '';
    numbersElem += "<div><span>" + nthTry + "번째 생성 : </span>";

    let i = 1;
    for (let number of numberSet) {
        numbersElem += "<span class='lotto-num' id='num" + i + "'> " + number + "</span>";
        i++;
    }
    numbersElem += "</div>";

    const NOW_DATE = makeDate();
    numbersElem += '<span> 생성시간 : ' + NOW_DATE + '</span>';
    numbersElem += '<br><p>---------------------------------</p>';
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
    nthTry = 1;
}

