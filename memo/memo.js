// TODO 전체 등록 메모 수 표시.
// TODO 메모 삭제 휴지통 아이콘에 드래그 앤 드랍해서.
// TODO 메모 셀렉트 해서 일괄 삭제 기능.
// TODO 메모 수정 기능.
// TODO 메모를 텍스트 파일에 저장 하고 불러 오도록 하는 기능.
// TODO 메모 등록/삭제/수정 시 효과음 추가.
// TODO ctrl + enter 시 메모 등록.

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
}

// 메모를 화면에 표시해 준다.
function outputMemo(memo) {
    let nowDate = new Date().toLocaleString();
    memoNum++;
    let memoHTML = '<div style="white-space: pre;" id="memo-' + memoNum + '"><div><span>메모 번호 : '
        + memoNum + '</span></div><p>' + memo + '</p>' + '<span>등록날짜 : ' + nowDate + '<br>' +
        '------------------------</span><button class="del-memo-btn">삭제</button></div>';

    let memoOutputElem = document.querySelector('#memo-output-div');
    memoOutputElem.insertAdjacentHTML('afterbegin', memoHTML);
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
