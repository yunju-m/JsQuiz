$(function () {
    $("#loginBtn").click(function () {
        showLoginAlert();
    });
});

function showLoginAlert() {
    Swal.fire({
        title: "사용자 이름 확인창",
        text: `\"${$("#name").val()}\"님으로 하시겠습니까?`,
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
            showConfirmAlert();
        }
    });
}

function showConfirmAlert() {
    Swal.fire({
        title: '퀴즈 프로그램에 접속합니다.',
        text: `${$("#name").val()}님 환영합니다.`,
        icon: 'success',
        didOpen: () => {
            $('body').attr("class", "");
        }
    }
    ).then(() => {
        const user = new User(Date.now(), $("#name").val(), 0);
        createUserObj(user);
        window.location.href = 'jsquizRank.html';
    });
}