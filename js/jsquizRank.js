$(function () {
    printRank();
    $("#startBtn").click(function () {
        showStartAlert();
    });

    $("#endBtn").click(function () {
        showEndAlert();
    });
});

// 10위 랭킹 출력 함수
function printRank() {
    const userList = getUserList();
    userList.sort((user1, user2) => user2.score - user1.score);
    for (let i = 0; i < 10; i++) {
        const user = userList[i] || { name: '', score: '' };
        $("tbody").append(`
            <tr>
                <th scope="row">${i + 1}</th>
                <td>${user.name}</td>
                <td>${user.score}</td>
            </tr>
        `);
    }
}

function showStartAlert() {
    let timerInterval;
    Swal.fire({
        title: "퀴즈 게임을 시작합니다!",
        html: "게임 시작 전 <b></b> 초 전",
        timer: 5000,
        timerProgressBar: true,
        didOpen: () => {
            $('body').attr("class", "");
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timer.textContent = 5;
            timerInterval = setInterval(() => {
                timer.textContent = Math.ceil(Swal.getTimerLeft() / 1000);
            }, 1000);
        },
        willClose: () => {
            clearInterval(timerInterval);
        }
    }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = 'jsquizProblem.html';
        }
    });
}

function showEndAlert() {
    Swal.fire({
        title: "Quiz 게임 종료",
        text: "정말로 종료하시겠습니까?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: '승인',
        cancelButtonText: '취소',
        reverseButtons: true, // 버튼 순서 거꾸로
        didOpen: () => {
            $('body').attr("class", "");
        }
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: '퀴즈 프로그램을 종료합니다.',
                text: '로그인 페이지로 이동합니다.',
                didOpen: () => {
                    $('body').attr("class", "");
                }
            }).then(() => {
                window.location.href = 'jsquizLogin.html';
            });
        }
    })
}