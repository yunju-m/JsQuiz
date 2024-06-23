# JsQuiz
**javaScript, ajax, sweetAlert2를 활용한 퀴즈 프로그램** <br/>
**개발기간: 2024.06.20~2024.06.23**

### 프로젝트 소개
타이밍함수, 콜백함수를 이용한 퀴즈 프로그램을 구현해본다. <br />
사용자는 이름을 입력 후 랭크가 등록된 화면으로 이동한다. <br />
시작 버튼을 클릭하면 게임 시작 10초 전 창이 나타나면서 자동으로 게임이 시작된다. <br />
총 10문제로 구성되며 각 문제당 10초 이내에 정답을 입력한다. <br />
문제마다 즉시 정답, 오답 결과를 알려주며 게임 종료시 게임 결과 출력한다. <br />
최고 점수를 기준으로 랭킹 등록된다.

## Stacks ⭐
### Environment
![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=Git&logoColor=white)
![Github](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white)
![visualstudiocode](https://img.shields.io/badge/visualstudiocode-007ACC?style=for-the-badge&logo=visualstudiocode&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-000000?style=for-the-badge&logo=Notion&logoColor=white)

### Development
![html5](https://img.shields.io/badge/html5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white)
![tailwindcss](https://img.shields.io/badge/tailwindcss-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)

### 💡 기능 요구사항
```
# - 프로그램이 시작되면 이름을 입력 받는다.
# - 초기화면에서 이름과 점수를 고득점자 순으로 출력한다.
# - 10개의 단답형 퀴즈를 10초마다 한 문제씩 출제한다.
# - 건너뛰기 버튼을 클릭하면 다음퀴즈로 넘어간다.
# - 10개의 퀴즈를 끝내면 이름과 점수를 localStorage에 저장한다.

```

## 디자인 설계
### 화면 구성 📺
| 화면 디자인 설계 |
| :----------: |
|![jsquiz 화면설계](https://github.com/yunju-m/JsQuiz/assets/74498379/ca8cf70e-ef7b-41c7-95e3-5ba3dcb0390a)|

### ✏️ 기능 구현 설계
```
user.js
	User()
		- [X] 사용자 객체 생성자 함수(uid, name, score)
	createUserObj()
		- [X] 사용자 생성 함수
	addUser()
		- [X] localStorage에 사용자 저장
	getUserList()
		- [X] localStorage에 사용자 리스트 가져오기
		- [X] userList가 없으면 빈배열([])로 생성하고 반환
quiz.js
	Quiz()
		- [X] Quiz 객체 생성자 함수(qid, question, answer)
	createQuizObj
		- [X] 퀴즈 생성자 함수
	addQuiz()
		- [X] localStorage에 퀴즈 저장
	getQuizList()
		- [X] localStorage에 퀴즈 리스트 가져오기
		- [X] quizList가 없으면 빈배열([])로 생성하고 반환
jsquizLogin.js
	showLoginAlert()
		- [X] 이름 입력 후 확인 버튼 클릭 시 재차 이름을 확인하는 창 띄우기
	showConfirmAlert()
		- [X] 재확인 버튼 클릭 시 해당 이름과 환영인사 창 띄우기
		- [X] 확인 버튼 클릭 시 퀴즈랭킹 화면(jsquizRank.html) 이동
jsquizRank.js
	printRank()
		- [X] 1~10등까지의 랭킹 순위 정보(등수, 이름, 점수) 출력
		- [X] 각 1~10등 참가자의 등수, 이름, 점수를 내림차순으로 출력
		- [X] 1등, 2등, 3등은 금, 은, 동의 색깔의 등수 표현
	showStartAlert()
		- [X] 도전 버튼을 클릭하면 퀴즈를 시작하는 창 출력
		- [X] 5초 동안 대기하다가 퀴즈화면(jsquizProblem.html)으로 이동
	showEndAlert()
		- [X] 종료 버튼을 클릭하면 게임을 종료하겠습니까? 팝업창 띄우기
		- [X] 확인 버튼을 클릭하면 로그인 화면(jsquizLogin.html)로 이동
jsquizProblem.js
	initQuizList()
		- [X] 초기 50문제 localStorage에 저장
		- 50문제는 임의로 quizJson.txt에 저장
	createRandomQuizList()
		- [X] 랜덤으로 중복되지않는 10문제 배열 생성
	printPloblemEvery10Sec()
		- [X] 왼쪽 상단에는 현재 문제 번호/전체 문제 개수를 출력
		- [X] 오른쪽 상단에는 10초 타이머 쓰레드 출력
		- [X] 정답, 오답 확인 창은 1초동안 출력되고 자동으로 종료
	printNextQuiz()
		- [X] 다음버튼을 클릭하면 즉시 다음문제를 출력
		- [X] 문제 번호와 타이머도 자동으로 초기화 후 시작
	printQuiz()
		- [X] 랜덤으로 10문제 추출해서 10초마다 1문제씩 제시
		- [X] 제한시간이 초과되면 자동으로 다음 문제가 출력
		- [X] 사용자 정답칸 ''으로 초기화
	calculateScore()
		- [X] 사용자 정답과 해답 동일한지 판단하여 맞으면 O, 틀리면 X창 출력
		- [X] 정답인 경우 사용자의 점수 1씩 증가
		printTrueAlert()
			- [X] 정답인 경우의 정답을 출력하는 창 구현
		printWrongAlert()
			- [X] 오답인 경우의 정답과 함께 오답을 출력하는 창 구현
	printEndQuiz()
		- [X] 10번 문제까지 모두 종료되면 시간종료 팝업창 띄우기
		- [X] 현재 점수/전체문제개수 출력
		- [X] 확인 버튼을 클릭하면 초기화면으로 이동	
	printLastQuizAlert()
		- [X] 마지막 문제에서는 마지막 문제임을 나타내는 팝업창 출력
  updateUserScore()
	  - [X] 이전의 점수보다 높으면 현재 사용자 점수를 갱신
	  - [X] 갱신된 점수는 localStorage에 저장되며 랭킹에 반영
```

## 결과
| 로그인 화면 | 랭킹 화면 | 게임시작 화면 | 게임결과 화면 |
| :----------: | :----------: | :----------: | :----------: |
|![로그인화면](https://github.com/yunju-m/JsQuiz/assets/74498379/9cb8af22-67b9-4c95-bc8c-a4c7a5cf70db)|![랭킹화면](https://github.com/yunju-m/JsQuiz/assets/74498379/a39dd5e8-72cd-4d63-bc7f-0b4d9dcfdd95)|![게임실행화면](https://github.com/yunju-m/JsQuiz/assets/74498379/87ccf245-37df-4e1e-aa32-5d63c927bd95)|![게임결과화면](https://github.com/yunju-m/JsQuiz/assets/74498379/6121b453-1ca5-44b4-8b25-b0f5cda1851b)|

## 팝업창
| 닉네임 확인여부 | 게임 접속 |
| :----------: | :----------: |
|![로그인1](https://github.com/yunju-m/JsQuiz/assets/74498379/0e99b7b4-c0a6-4720-a8c0-84d965768233)|![로그인2](https://github.com/yunju-m/JsQuiz/assets/74498379/104587a3-335d-48fb-8870-bd639869f339)|

| 게임시작 | 게임종료1 | 게임종료2 |
| :----------: | :----------: | :----------: |
|![게임시작](https://github.com/yunju-m/JsQuiz/assets/74498379/fe50e7a7-98be-409c-86e5-a00f510f6dc7)|![게임종료1](https://github.com/yunju-m/JsQuiz/assets/74498379/b142fecd-a894-49fc-a6ae-aefe9685d903)|![게임종료2](https://github.com/yunju-m/JsQuiz/assets/74498379/3fc18152-d2fa-4a94-b498-abb31b5d577b)|

