$(function () {
    $("#startBtn").click(function () {
        let timerInterval;
        Swal.fire({
            title: "퀴즈 게임을 시작합니다!",
            html: "게임 시작 전 <b></b> 초 전",
            timer: 5000,
            timerProgressBar: true,
            didOpen: () => {
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
    });
});