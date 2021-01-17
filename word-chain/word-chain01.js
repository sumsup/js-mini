let classNum = 0; // 끝말잇기 단어 확인용.
let point = 0; // 점수.
let combo = 0;

function inputWord() {
    let word = document.getElementById('word').value;
    let htmlWord = '<p class ="word-chain '+'word'+classNum+'">' + word + '</p>';

    // 값을 입력하지 않으면?
    if (word === "") {
        alert('단어를 입력해 주세요!');
        document.getElementById('word').focus();
        return;
    }
    // 특수문자 유효성 검사.
    else if (!validateWord(word)) {
            alert('단어만 입력해주세요. 특수문자, 숫자, 영어는 안됩니다!');
            document.getElementById('word').value = '';
            document.getElementById('word').focus();
            return;
    }
    // 만약 classNum이 0보다 크면 word+(classNum-1) 값을 갖는 class를 가져온다.
    else if (classNum > 0) {
        // 이전단어.
        let beforeWord = document.getElementsByClassName('word' + (classNum - 1))[0].innerText;
        
        // 이전단어의 시작문자와 입력단어의 끝문자를 비교.
        // 둘이 같으면 화면상에 입력.
        let beforeWordFirstChar = beforeWord.substring(beforeWord.length - 1); // 이전단어의 끝문자.
        let nowWordLastChar = word.substring(0,1); // 입력단어의 첫문자.
                    
        // 둘이 다르면 경고창.
        if (beforeWordFirstChar !== nowWordLastChar) {
            if(point > 0) {
                alert('끝말 잇기 실패! 올바른 단어를 입력해주세요!');
                combo = 0;
                document.getElementById('combo').innerHTML = combo;
            }
            document.getElementById('word').value = '';
            document.getElementById('word').focus();
            point -= 10;
            // 점수가 0보다 작으면 게임오버 창 띄우고 모두 리셋.
            if (point < 0) {
                alert('남은 점수가 없습니다. 실패하였습니다.');
                document.getElementById('wordBox').innerHTML = '';
                point = 0;
                return;
            }
            document.getElementById('point').innerHTML = point;
            return; // 종료.
        }

    }

    // 출력부.
    classNum++;
    point += 10;
    combo += 1;
    document.getElementById('wordBox').insertAdjacentHTML('beforeend', htmlWord);
    document.getElementById('word').value = '';
    document.getElementById('point').innerHTML = point;
    document.getElementById('combo').innerHTML = combo;
    document.getElementById('word').focus();
}

// 단어 입력란을 초기화. 초기화 버튼.
function resetWordChain() {
    classNum = 0;
    point = 0;
    document.getElementById('wordBox').innerHTML = '';
    document.getElementById('word').value = '';
    document.getElementById('point').innerHTML = point;
    document.getElementById('word').focus();
}

// 입력 유효성을 검사.
function validateWord(word) {
    const CHECK_ENG = /[a-zA-Z]/;
    const CHECK_SPC = /[~!@#$%^&*()_+|\[\]<>?:{}]/;
    const CHECK_NUM = /[0-9]/;

    let checkEngYn = CHECK_ENG.test(word);
    let checkSpcYn = CHECK_SPC.test(word);
    let checkNumYn = CHECK_NUM.test(word);

    // 유효성 검사 실패.
    if (checkEngYn == true || checkSpcYn == true || checkNumYn == true) {
        return false;
    }

    // 유효성 검사 통과.
    if (checkEngYn == false && checkSpcYn == false && checkNumYn == false) {
        return true;
    }
}

// 현재 날짜를 가지고 와서 표시.
function viewDate() {
    const TODAY = new Date();
    document.getElementById('today').innerText = TODAY.toLocaleString();
}

window.onload = function() {
    viewDate();

    // 단어 입력란에 단어를 입력후 Enter 키를 눌렀을 경우 단어를 등록하도록.
    document.getElementById('word').addEventListener("keydown", function (e) {
        const KEY_CODE = e.keyCode;
        if (KEY_CODE === 13) {
            inputWord();
        }
    });
}