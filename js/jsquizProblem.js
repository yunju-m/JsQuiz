let timer = null;
let seconds = 10;
let problemCnt = 1;
let randomQuizList = [];

$(function () {
    initQuizList();
    $('#nextBtn').on('click', function () {
        printNextProblem();
    });
    timer = setInterval(() => {
        printProblemEvery10Sec();
    }, 1000);
});

// 초기 50문제 localStorage에 저장 함수
function initQuizList() {
    axios.get("/quizJson.txt")
        .then(function (result) {
            for (let i = 0; i < 50; i++) {
                let quiz = result.data[i];
                let newQuiz = new Quiz(quiz.qid, quiz.question, quiz.answer);
                createQuizObj(newQuiz);
            }
        }).then(function () {
            createRandomQuizList();
        });
}

// 랜덤 10개 문제 배열 생성 함수
function createRandomQuizList() {
    const quizList = getQuizList();
    for (let i = 0; i < 10; i++) {
        let randomQid = Math.floor(Math.random() * 51);
        if (randomQuizList.includes(quizList[randomQid])) {
            i--;
        } else {
            randomQuizList.push(quizList[randomQid]);
        }
    }
}

// 즉시 다음문제 생성 함수
function printNextProblem() {
    if (problemCnt < 10) {
        seconds = 10;
        problemCnt++;
        printProblemEvery10Sec();
    } else {
        printLastProblem();
    }
}

// 종료 결과 창 출력 함수
function printEndProblem() {
    Swal.fire({
        title: "게임 종료",
        width: 600,
        padding: "2em",
        color: "#716add",
        background: "#fff",
        backdrop: `
            rgba(0,0,123,0.4)
            url("/image/EndImg.gif")
            center top
            no-repeat
            `,
        didOpen: () => {
            $('body').attr("class", "");
        }
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = 'jsquizRank.html';
        }
    });
}

// 마지막 문제에서 다음 문제 클릭 시 안내창 출력 함수
function printLastProblem() {
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });
    Toast.fire({
        icon: "warning",
        title: "마지막 문제입니다."
    });
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
        printEndProblem();
    }
}

// 문제 출력 함수
function printProblem() {
    $("#problemArea").html(randomQuizList[problemCnt - 1].question);
}