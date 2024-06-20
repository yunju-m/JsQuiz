$(function () {
    $("#loginBtn").click(function () {
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
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    '퀴즈 프로그램에 접속합니다.',
                    `${$("#name").val()}님 환영합니다.`,
                    'success'
                )
            }
        })
    });
});