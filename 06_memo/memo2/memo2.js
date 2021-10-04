window.onload = () => {
    document.querySelector('#memo-ta').focus();

    const $memoTextarea = document.querySelector('#memo-ta');

    document.querySelector('#submit-memo').addEventListener('click', outputMemo);

    function outputMemo() {
        let memo = $memoTextarea.value;
        document.querySelector('#memo-output').insertAdjacentHTML('beforeend', '<div><pre>'
            + memo + '</pre></div>');

        $memoTextarea.value = '';
        $memoTextarea.focus();
    }
}