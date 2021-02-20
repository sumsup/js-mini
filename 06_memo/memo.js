// TODO 전체 등록 메모 수 표시.
// TODO 메모 삭제 휴지통 아이콘에 드래그 앤 드랍해서. 휴지통에 마우스 오버 되면 뭔가 다른 효과 주기. 빨간색 박스라던가??
// TODO 메모 수정 기능.
// TODO 메모를 텍스트 파일에 저장 하고 불러 오도록 하는 기능.
// TODO 메모 등록/삭제/수정 시 효과음 추가.

// TODO 삭제 로직을 담당하는 하나의 함수를 만들어서 삭제할 요소를 매개변수로 받아서 삭제하도록 일원화. 매개변수를 안받으면 함수화하는 의미가 없지....
// 그런데 이게 parentNode와 childNode가 달라서 공통화 하기가 까다롭네....
// 더 나은 요소 삭제 로직이 없을까?

// global variable.
let memoNum = 0; // 메모 번호.
let keydownObj = {};

window.onload = function() {
    eventListeners();
}

function eventListeners() {
    // 메모를 가지고 온다.
    document.querySelector('#add-memo').addEventListener('click', registerMemo);

    // 메모를 삭제한다. 이벤트 위임.
    document.querySelector('#div-memo-output').addEventListener('click', deleteOneMemo);

    // 선택삭제 한다.
    document.querySelector('#del-selected-memos').addEventListener('click', deleteSelectedMemos);

    // 메모 컨트롤 엔터 등록.
    document.querySelector('#memo-text').addEventListener('keydown', ctrlEnterMemoRegisterEvent);

    // 메모 컨트롤 엔터 등록 이벤트 해제.
    document.querySelector('#memo-text').addEventListener('keyup', deleteKeyDownFlag);

    // 메모를 휴지통에 drag & drop 으로 삭제하도록.
    // 마우스 다운 이벤트가 발생했을때, 메모 아이디를 글로벌에 저장.
    // 휴지통에 마우스 업 이벤트가 발생했을 때, 글로벌에 저장된 요소 삭제.
    // 이벤트 위임.
    document.querySelector('#div-memo-output').addEventListener('');
}

// 메모 등록 진행.
function registerMemo() {
    let memo = document.querySelector('#memo-text').value;

    outputMemo(memo);
    document.querySelector('#memo-text').value = '';
    document.querySelector('#memo-text').focus();
}

// 메모를 화면에 표시해 준다.
function outputMemo(memo) {
    memoNum++;
    let memoHTML = makeMemoElem(memo);
    let memoOutputElem = document.querySelector('#div-memo-output');
    memoOutputElem.insertAdjacentHTML('afterbegin', memoHTML);
    let thisMemoElem = document.querySelector('#memo-'+memoNum);
    setAttributeToMemos(thisMemoElem);
}

// 화면에 출력할 메모요소를 생성.
function makeMemoElem(memo) {
    let nowDate = new Date().toLocaleString();
    let memoHTML = '<div id="memo-' + memoNum + '"><div><label><input type="checkbox" name="del-checked">' +
        '</label><span>메모 번호 : '
        + memoNum + '</span></div><p>' + memo + '</p><span>등록날짜 : ' + nowDate + '<br>' +
        '------------------------</span><button class="del-memo-btn">삭제</button></div>';

    return memoHTML;
}

// 선택삭제 한다.
function deleteSelectedMemos() {
    // 체크된 메모들을 가지고 온다.
    let checkedMemos = document.querySelectorAll('input[name="del-checked"');
    for (let i = 0; i < checkedMemos.length; i++) {
       if (checkedMemos[i].checked) {
           // 체크되있으면 삭제.
           let child = checkedMemos[i].parentNode.parentNode.parentNode;
           let parentNode = checkedMemos[i].parentNode.parentNode.parentNode.parentNode;

           parentNode.removeChild(child);
       }
    }
}

// 메모 하나만 삭제.
function deleteOneMemo() {
    // 클릭한 요소가 삭제 버튼인지 확인.
    let targetElem = event.target;
    if (targetElem.getAttribute('class') !== 'del-memo-btn') {
        return;
    }

    // 부모요소를 가지고 와서 자식 요소를 삭제.
    let parentDiv = targetElem.parentNode.parentNode;
    parentDiv.removeChild(targetElem.parentNode);
}

// ctrl + enter로 메모등록.
function ctrlEnterMemoRegisterEvent() {
    keydownObj[event.key] = true;
    if (keydownObj['Control'] && keydownObj['Enter']) {
        registerMemo();
    }
}

// 키보드 이벤트를 삭제.
function deleteKeyDownFlag() {
    delete keydownObj[event.key];
}

// 메모요소에 속성을 추가해 준다.ㅏ
function setAttributeToMemos(thisMemoElem) {
    thisMemoElem.setAttribute('draggable', 'true');

    let setStyle = 'white-space: pre;';
    thisMemoElem.setAttribute('style', setStyle);
}