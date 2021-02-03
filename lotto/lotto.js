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
    numbersElem += "<div id='try-" + nthTry + "'><span>" + nthTry + "번째 생성 : </span>";

    let i = 1;
    for (let number of numberSet) {
        numbersElem += "<span class='lotto-num' id='num" + i + "'> " + number + "</span>";
        i++;
    }
    numbersElem += "</div>";

    const NOW_DATE = makeDate();
    numbersElem += '<div><span> 생성시간 : ' + NOW_DATE + '</span></div>';
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

// 금주의 로또번호를 화면에 표시.
function outputWinningNumber() {
    const winNumDiv = document.getElementById('winning-nums-div');
    const winNums = document.getElementById('winning-nums');

    let numArr = winNums.value.split(',');

    if (numArr.length != 6) {
        alert('당첨번호는 6개를 정확히 입력해주세요!');
        winNums.focus();
        return;
    }

    let winNumElem = '<span>당첨번호 : </span>';
    for (let i = 0; i < numArr.length; i++) {
        winNumElem += '<span class="winning-nums" id="winning-num-' + (i + 1) + '">' + numArr[i];
        if (i === (numArr.length -1)) {
            winNumElem += '</span>';
        }
        else if (i !== (numArr.length - 1)) {
            winNumElem += ', </span>';
        }
    }
    winNumDiv.innerHTML = '';
    winNumDiv.insertAdjacentHTML('afterbegin',winNumElem);

    for(let i = 1; i < nthTry; i++) {
        matchingNums(i);
    }
}

// 생성번호들과 당첨번호를 맞춰보기.
function matchingNums(tryNth) {
    let winNums = document.getElementsByClassName('winning-nums'); // 당첨번호들 가져오기.
    // 로또 번호를 가져오기.
    let tryElems = document.getElementById('try-'+tryNth).getElementsByClassName('lotto-num');

    // 로또 번호를 비교하기.
    let matchedNums = []; // 당첨된 번호 저장.
    let winNum; // 이번주 당첨 번호.
    let tryNum; // 내가 산 로또 번호.
    let matchedNumCnt = 0; // 당첨된 갯수.
    for (let i = 0; i < winNums.length; i++) {
        for (let j = 0; j < tryElems.length; j++) {
            winNum = winNums[i].innerHTML.trim().replace(',','');
            tryNum = tryElems[j].innerHTML.trim();
            if (winNum === tryNum) {
                matchedNums.push(tryNum);
                matchedNumCnt++;
            }
        }
    }

    outputMatchedNumCnt(matchedNumCnt, tryNth);
    outputMatchedNum(matchedNums, tryNth);
    console.log(matchedNums);

    // 당첨번호 엘리먼트 만들기.
    let matchedNumElem = '';
}

// 당첨번호 갯수를 표시.
function outputMatchedNumCnt(matchedNumCnt, tryNth) {
    let cntElem = '<div><span> 당첨 갯수 : ' + matchedNumCnt + '</span></div>';
    document.getElementById('try-'+tryNth).insertAdjacentHTML('afterend', cntElem);
}

// 시도한 것중에 당첨된 숫자를 표시
function outputMatchedNum(matchedNumArr, tryNth) {
    let matchedNums = '';
    for (let i = 0; i < matchedNumArr.length; i++) {
        if (i !== (matchedNumArr.length - 1)) {
            matchedNums += matchedNumArr[i] + ", ";
        }
        else if (i === (matchedNumArr.length - 1)) {
            matchedNums += matchedNumArr[i];
        }
    }

    matchedNumElem = '<div><span>당첨번호 : ' + matchedNums + '</span></div>';
    document.getElementById('try-'+tryNth).insertAdjacentHTML('afterend',matchedNumElem);
}


