// User 사용자 객체 생성자 함수
function User(uid, name, score) {
    this.uid = uid;
    this.name = name;
    this.score = score;
}

// 사용자 생성 함수
function createUserObj(user) {
    const userObj = {
        uid: user.uid,
        name: user.name,
        score: user.score
    };
    addUser(userObj);
}

// localStorage에 사용자 저장 함수
function addUser(userObj) {
    const userList = getUserList();
    userList[userList.length] = userObj;
    localStorage.setItem("userList", JSON.stringify(userList));
}

// localStorage의 사용자 리스트 가져오는 함수
function getUserList() {
    let userList = localStorage.getItem("userList");
    if (userList == null || userList == "") {
        localStorage.setItem("userList", "[]");
        return [];
    } else {
        return JSON.parse(userList);
    }
}