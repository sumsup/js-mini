//  전역 변수들.
let classNum = 0; // 끝말잇기 단어 확인용.
let point = 0; // 점수.
let combo = 0; // 연속 성공 횟수.
let inputWords = []; // 입력단어들.

window.onload = function() {
    document.getElementById('word').focus();
    viewDate();
    eventListeners();
}

// 사용자가 단어를 입력시 작업시작.
function inputWord() {
    let word = document.getElementById('word').value;

    // 입력한 단어가 유효한지 검사.
    if (checkWordErrorYn(word)) {
        return;
    }
    // 문자의 유효성 검사. 영어/숫자/자음/모음/특수문자 를 입력시 실패.
    if (validateWord(word)) {
        return;
    }
    if (validateDuplicatedWord(word)) {
        return;
    }
    // 단어가 유효하다면 끝말잇기 진행. 끝말잇기 성공인지 실패인지.
    if (doWordChainning(word)) { // 실패면
        return;
    }
    // 성공시 출력부.
    outputWord(word);

}

// 단어 입력란을 초기화. 초기화 버튼.
function resetWordChain() {
    classNum = 0;
    point = 0;
    combo = 0;
    document.getElementById('wordBox').innerHTML = '';
    document.getElementById('word').value = '';
    document.getElementById('combo').innerHTML = combo;
    document.getElementById('point').innerHTML = point;
    document.getElementById('word').focus();
}

// 입력 유효성을 검사.
function validateWord(word) {
    const CHECK_ENG = /[a-zA-Z]/;
    const CHECK_SPC = /[~!@#$%^&*()_+|\[\]<>?:{}.]/;
    const CHECK_NUM = /[0-9]/;
    const CHECK_JA_MO = /([^가-힣\x20])/;

    let checkEngYn = CHECK_ENG.test(word);
    let checkSpcYn = CHECK_SPC.test(word);
    let checkNumYn = CHECK_NUM.test(word);
    let checkJaMoYn = CHECK_JA_MO.test(word);

    // 자모 체크 경고.
    if (checkJaMoYn) {
        alert('자음/모음만 입력해선 안됩니다.\n단어를 입력해 주세요.');
        document.getElementById('word').value = '';
        document.getElementById('word').focus();
        return true;
    }
    // 유효성 검사 실패.
    else if (checkSpcYn) {
        alert('특수문자는 안됩니다!');
        document.getElementById('word').value = '';
        document.getElementById('word').focus();
        return true;
    }
    else if (checkEngYn) {
        alert('영어는 안됩니다!');
        document.getElementById('word').value = '';
        document.getElementById('word').focus();
        return true;
    }
    else if (checkNumYn) {
        alert('숫자는 안됩니다!');
        document.getElementById('word').value = '';
        document.getElementById('word').focus();
        return true;
    }

    // 유효성 검사 통과.
    return false;
}

// 현재 날짜를 가지고 와서 표시.
function viewDate() {
    const TODAY = new Date();
    document.getElementById('today').innerText = TODAY.toLocaleString();
}

// 입력 단어 유효성 검사 과정.
function checkWordErrorYn(word) {
    // 값을 입력하지 않으면?
    if (word === "") {
        alert('단어를 입력해 주세요!');
        document.getElementById('word').focus();
        return true;
    }
    // 한글자만 입력한 경우엔.
    else if (word.length === 1) {
        alert('두글자 이상 입력해 주세요!');
        document.getElementById('word').value = '';
        document.getElementById('word').focus();
        return true;
    }
    else if (word.length > 20) {
        alert('20 글자 이하로 입력 해주세요!');
        document.getElementById('word').value = '';
        document.getElementById('word').focus();
        return true;
    }

    return false; // 값을 리턴하지 않으면 undefined를 리턴함. undefined는 false 취급.
}

//
function doWordChainning(word) {
    // 만약 classNum이 0보다 크면 word+(classNum-1) 값을 갖는 class를 가져온다.
    if (classNum > 0) {
        // 이전단어.
        let beforeWord = document.getElementsByClassName('word' + (classNum - 1))[0].innerText;

        // 이전단어의 시작문자와 입력단어의 끝문자를 비교.
        // 둘이 같으면 화면상에 입력.
        let beforeWordFirstChar = beforeWord.substring(beforeWord.length - 1); // 이전단어의 끝문자.
        let nowWordLastChar = word.substring(0,1); // 입력단어의 첫문자.

        // 둘이 다르면 경고창.
        if (beforeWordFirstChar !== nowWordLastChar) {
            if(point >= 0) {
                comboPlus(false);
                pointPlusController(false);
            }
            return true; // 종료.
        }
    }
    return false;
}

// 끝말잇기 성공시 단어를 화면에 출력하고 점수와 콤보를 올린다.
function outputWord(word) {
    let htmlWord = '<p class ="word-chain '+'word'+classNum+'">'+ (classNum + 1) + ' : '+ word + '</p>';
    document.getElementById('wordBox').insertAdjacentHTML('beforeend', htmlWord);
    pointPlusController(true);
    comboPlus(true);
    classNum++;
    inputWords.push(word);
}

// 이전에 입력한 단어인지 검사. 중복단어 검사.
function validateDuplicatedWord(word) {
    if (inputWords.length > 0) {
        for (var i = 0; i < inputWords.length; i++) {
            // 중복된 단어가 있다면 오류 출력.
            if (inputWords[i] === word) {
                alert('중복된 단어 입니다.\n다른단어를 입력해주세요!');
                pointPlusController(false);
                comboPlus(false);
                return true;
            }
        }
    }
    return false;
}
// 점수를 차감한 후 화면에 표시
function pointPlusController(flag) {
    // 점수를 올리면.
    if (flag === true) {
        point += 10;
    }
    // 점수를 내리면.
    if (flag === false) {
        point -= 10;
        // 점수가 0보다 작으면 게임오버 창 띄우고 모두 리셋.
        if (point < 0) {
            gameOver();
        }
        else if (point >= 0) {
            alert('끝말 잇기 실패! 올바른 단어를 입력해주세요!');
        }
    }
    document.getElementById('word').value = '';
    document.getElementById('word').focus();
    document.getElementById('point').innerHTML = point;
}

// 콤보를 표시.
function comboPlus(flag) {
    if (flag === true) {
        combo++;
    }
    if (flag === false) {
        combo = 0;
    }
    document.getElementById('combo').innerHTML = combo;
}

// 게임오버.
function gameOver() {
    alert('남은 점수가 없습니다. 실패하였습니다.');
    point = 0;
    classNum = 0;
    inputWords = [];
    viewDate();
    document.getElementById('wordBox').innerHTML = '';
    document.getElementById('point').innerHTML = point;
    document.getElementById('word').value = '';
    document.getElementById('word').focus();
}

// 이벤트 리스너들.
function eventListeners() {
    // 단어 입력란에 단어를 입력후 Enter 키를 눌렀을 경우 단어를 제출하도록.
    document.getElementById('word').addEventListener("keydown", function (e) {
        const KEY_CODE = e.keyCode;
        if (KEY_CODE === 13) {
            inputWord();
        }
    });
}