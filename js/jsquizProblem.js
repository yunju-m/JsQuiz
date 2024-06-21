let timer = null;
let seconds = 10;
let problemCnt = 1;
let randNumList = [];

$(function () {
    timer = setInterval(() => {
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
    }, 1000);
});

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