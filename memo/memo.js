// TODO
// - 전체 등록 메모 수 표시.
// - 메모 번호 표시.
// - 메모 출력후 줄바꿈 적용 되도록.
// - 메모 등록 날짜 추가.
// - 메모 삭제 버튼 기능.
// - 메모 삭제 휴지통 아이콘에 드래그 앤 드랍해서.
// - 메모 셀렉트 해서 일괄 삭제 기능.
// - 메모 수정 기능.
// - 메모를 텍스트 파일에 저장 하고 불러오도록 하는 기능.
// - 메모 등록/삭제/수정 시 효과음 추가.

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
}

// 메모를 화면에 표시해 준다.
function outputMemo(memo) {
    let memoFull = '<div id="memo-'+ memoNum + '"><p>' + memo + '</p>------------------------<br>';

    let memoOutputElem = document.querySelector('#memo-output-div');
    memoOutputElem.insertAdjacentHTML('afterbegin', memoFull);
}
