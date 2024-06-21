// Quiz 객체 생성자 함수
function Quiz(qid, question, answer) {
    this.qid = qid;
    this.question = question;
    this.answer = answer;
}

// 퀴즈 생성자 생성 함수
function createQuizObj(quiz) {
    const quizObj = {
        qid: quiz.id,
        question: quiz.question,
        answer: quiz.answer
    };
    addQuiz(quizObj);
}

// localStorage에 퀴즈 저장 함수
function addQuiz(quizObj) {
    const quizList = getQuizList();
    quizList[quizList.length] = quizObj;
    localStorage.setItem("quizList", JSON.stringify(quizList));
}

// localStorage의 퀴즈 리스트 가져오는 함수
function getQuizList() {
    let quizList = localStorage.getItem("quizList");
    if (quizList == null || quizList == "") {
        localStorage.setItem("quizList", "[]");
        return [];
    } else {
        return JSON.parse(quizList);
    }
}