let timer = null;
let seconds = 10;
let problemCnt = 1;
let randNumList = [];

$(function () {
    $('#nextBtn').on('click', function () {
        console.log("다음문제!!");
        printNextProblem();
    });
    timer = setInterval(() => {
        printProblemEvery10Sec();
    }, 1000);
});

// 즉시 다음문제 생성 함수
function printNextProblem() {
    if (problemCnt < 10) {
        seconds = 10;
        problemCnt++;
        printProblemEvery10Sec();
    }
}

// 10초마다 문제 재생성 함수
function printProblemEvery10Sec() {
    $('#time').html(`${seconds}초`);
    if (seconds === 10) {
        $('#problemCnt').html(`Q) ${problemCnt}/10`);
        printProblem();
    }
    seconds--;
    if (seconds === 0) {
        seconds = 10;
        problemCnt++;
    }
    if (problemCnt > 10) {
        clearInterval(timer);
    }
}

// 문제 출력 함수
function printProblem() {
    axios.get("/quizJson.txt")
        .then(function (result) {
            const randNum = randNumFunc();
            $("#problemArea").html(result.data[randNum].question);
        });
}

// 문제 랜덤 함수
function randNumFunc() {
    const randNum = Math.floor(Math.random() * 51);
    if (randNumList.includes(randNum)) {
        return randNumFunc();
    } else {
        randNumList.push(randNum);
        return randNum;
    }
}