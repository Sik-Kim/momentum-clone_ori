{
  /* <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>; 
  ?? */
}

const form = document.querySelector(".js-form"), //제출
  input = form.querySelector("input"), //입력
  greeting = document.querySelector(".js-greetings"); //제출 후

const USER_LS = "currentUser", //Application에 저장된 현재유저
  SHOWING_CN = "showing"; //(class name) 이걸로 display 조정

function saveName(text) {
  localStorage.setItem(USER_LS, text);
}
//saveName함수가 application에 입력값을 저장하게 해줌. (새로고침해도 값 그대로 저장됨)

function handleSubmit(event) {
  //event 발생시
  event.preventDefault(); //event가 document까지 올라가는 것? 방지(기본기능 저지)
  const currentValue = input.value;
  paintGreeting(currentValue);
  saveName(currentValue);
}
//event 금지. 엔터쳐도 text 그대로 있음
// value가 의미하는게 뭐지

function askForName() {
  form.classList.add(SHOWING_CN);
  //form의 classList에 SHOWING_CN(showing)을 추가한다.
  form.addEventListener("submit", handleSubmit);
} //submit(제출) 했을떄 handleSubmit 함수 실행

function paintGreeting(text) {
  //paint함수
  //갈호안 text는 argument(인수)
  //argument 관련 tip : 함수 안에 인수는 3개 이하가 좋다.
  // 넘어갈꺼같으면 복잡하니 configuration object 사용하는게 좋다.
  //인수에 boolean은 지양. 그런상황이면 if, else if 따로따로 함수를 만든다. 1개 함수는 1가지 기능만!
  form.classList.remove(SHOWING_CN);
  greeting.classList.add(SHOWING_CN);
  greeting.innerText = `Hello! ${text}`;
}

function loadName() {
  //local storage에서 username을 가져오는 함수임
  const currentUser = localStorage.getItem(USER_LS); //현재 LS의 USER_LS에 저장된 값을 currentUser로 넣어라.
  if (currentUser === null) {
    //만약 값이 null이면?
    askForName(); //이름 넣는 함수 실행
  } else {
    // 값이 있으면 (이건 입력하고 새로고침할떄만 해당되는 경우군)
    paintGreeting(currentUser); //paint함수 실행
  }
}

function init() {
  loadName();
}
init();

//local storage는 urls을 기초로 동작함. 예를들면 페북이 거기에 넣은 ls를 가져올수는 없음.
