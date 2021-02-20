// TODO 전체 등록 메모 수 표시.
// TODO 메모 삭제 휴지통 아이콘에 드래그 앤 드랍해서.
// TODO 메모 수정 기능.
// TODO 메모를 텍스트 파일에 저장 하고 불러 오도록 하는 기능.
// TODO 메모 등록/삭제/수정 시 효과음 추가.
// TODO ctrl + enter 시 메모 등록.
// TODO 삭제 로직을 담당하는 하나의 함수를 만들어서 삭제할 요소를 매개변수로 받아서 삭제하도록 일원화.

// global variable.
let memoNum = 0; // 메모 번호.

window.onload = function() {
    eventListeners();
}

function eventListeners() {
    // 메모를 가지고 온다.
    document.querySelector('#add-memo').addEventListener('click',function() {
        let memo = document.querySelector('#memo-text').value;

        console.log(memo);
        outputMemo(memo);
        document.querySelector('#memo-text').value = '';
        document.querySelector('#memo-text').focus();
    });

    // 메모를 삭제한다. 이벤트 위임.
    document.querySelector('#memo-output-div').addEventListener('click', deleteMemo);

    // 선택삭제 한다.
    document.querySelector('#del-selected-memos').addEventListener('click', deleteSelectedMemos);
}

// 메모를 화면에 표시해 준다.
function outputMemo(memo) {
    memoNum++;
    let memoHTML = makeMemoElem(memo);
    let memoOutputElem = document.querySelector('#memo-output-div');
    memoOutputElem.insertAdjacentHTML('afterbegin', memoHTML);
}

// 화면에 출력할 메모요소를 생성.
function makeMemoElem(memo) {
    let nowDate = new Date().toLocaleString();
    let memoHTML = '<div style="white-space: pre;" id="memo-' + memoNum + '"><div><label><input type="checkbox" name="del-checked">' +
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

function deleteMemo() {
    // 클릭한 요소가 삭제 버튼인지 확인.
    let targetElem = event.target;
    if (targetElem.getAttribute('class') !== 'del-memo-btn') {
        return;
    }

    // 부모요소를 가지고 와서 자식 요소를 삭제.
    let parentDiv = targetElem.parentNode.parentNode;
    parentDiv.removeChild(targetElem.parentNode);
}
