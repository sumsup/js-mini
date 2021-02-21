// 컴퓨터 오브젝트.
let computer = {
    score : 0,
    percent2 : 0.5,
    percent3 : 0.33
};

// 사용자 오브젝트.
let user = {
    score : 0,
    percent2 : 0.5,
    percent3 : 0.33
};

// 게임 오브젝트.
let game = {
    isComputerTurn : true,
    shotsLeft : 15
};

function onComputerShoot() {
    if (!game.isComputerTurn) {
        return;
    }
    updateAI();

    let shootType = Math.random() < 0.5 ? 2 : 3;
    if (shootType === 2) {
        if (Math.random() < computer['percent'+shootType]) {
            showText('컴퓨터가 ' + shootType + '점 슛을 성공했습니다!');
            updateComputerScore(shootType);
        }
        else {
            showText('컴퓨터 ' + shootType + '점슛을 실패했습니다.');
        }
    }
    else {
        if (Math.random() < computer['percent' + shootType]) {
            showText('컴퓨터가 ' + shootType + '점슛을 성공시켰습니다!');
            updateComputerScore(shootType);
        }
        else {
            showText('컴퓨터가 ' + shootType + '점슛을 실패했습니다.');
        }
    }
    game.isComputerTurn = false;

    disableComputerButtons(true);
    disableUserButtons(false);
}

function onUserShoot(shootType) {
    if (game.isComputerTurn) {
        return;
    }

    if (shootType === 2) {
        if (Math.random() < user['percent' + shootType]) {
            showText(shootType + '점 슛이 성공했습니다!');
            updateUserScore(2);
        }
        else {
            showText(shootType + '점 슛이 실패했습니다!');
        }
    } else {
        if (Math.random() < user['percent' + shootType]) {
            showText(shootType + '점 슛이 성공했습니다!');
            updateUserScore(3);
        }
        else {
            showText(shootType + '점 슛이 실패 했습니다!');
        }
    }
    game.isComputerTurn = true;

    disableComputerButtons(false);
    disableUserButtons(true);

    game.shotsLeft--;

    let shotsLeftElem = document.getElementById('shots-left');
    shotsLeftElem.innerHTML = game.shotsLeft;

    if (game.shotsLeft === 0) {
        if (user.score > computer.score) {
            showText('승리했습니다!');
        }
        else if (user.score < computer.score) {
            showText('아쉽게도 졌습니다...');
        }
        else {
            showText('비겼습니다.');
        }

        disableComputerButtons(true);
        disableUserButtons(true);
    }
}

function showText(s) {
    let textElem = document.getElementById('text');
    textElem.innerHTML = s;
}

function updateComputerScore(score) {
    computer.score += score;
    let comScoreElem = document.getElementById('computer-score');
    comScoreElem.innerHTML = computer.score;
}

function updateUserScore(score) {
    user.score += score;
    let userScoreElem = document.getElementById('user-score');

    userScoreElem.innerHTML = user.score;
}

function disableComputerButtons(flag) {
    let computerButtons = document.getElementsByClassName('btn-computer');

    for (let i = 0; i < computerButtons.length; i++) {
        computerButtons[i].disabled = flag;
    }
}

function disableUserButtons(flag) {
    let userButtons = document.getElementsByClassName('btn-user');

    for (let i = 0; i < userButtons.length; i++) {
        userButtons[i].disabled = flag;
    }
}

function updateAI() {
    let diff = user.score - computer.score;

    if (diff >= 10) {
        computer.percent2 = 0.7;
        computer.percent3 = 0.43;
    }
    else if (diff >= 6) {
        computer.percent2 = 0.6;
        computer.percent3 = 0.38;
    }
    else if (diff <= -10) {
        computer.percent2 = 0.3;
        computer.percent3 = 0.23;
    }
    else if (diff <= -6) {
        computer.percent2 = 0.4;
        computer.percent3 = 0.28;
    }
}

// 다시 하기 기능.
function restartGame() {
    computer = {
        score : 0,
        percent2 : 0.5,
        percent3 : 0.33
    };

    user = {
        score : 0,
        percent2 : 0.5,
        percent3 : 0.33
    };

    game = {
        isComputerTurn : true,
        shotsLeft : 15,
        startMsg : '컴퓨터부터 시작합니다!'
    };

    document.getElementById('shots-left').innerHTML = 15;
    document.getElementById('computer-score').innerHTML = 0;
    document.getElementById('user-score').innerHTML = 0;
    document.getElementsByClassName('btn-computer')[0].disabled = false;
    document.getElementById('text').innerHTML = game.startMsg;


}