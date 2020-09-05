const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
//html에서 가져오기

const TODOS_LS = "toDos"; //해야할일 상수 설정

const toDos = []; //toDos 를 입력할 때 마다 toDos Array에 입력됨

function saveToDos() {
  //여기 이 toDos를 가져와서 로컬(local storage)에 저장하는 역할.
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
// javascript는 모든걸 string으로 저장한다. 예를들어 boolean의 true,false 저장 못 함. 그래서 JSON.stringify을 사용함.
//JSON.stringify는 자바스크립트 object를 string으로 바꿔줌
//JSON = JavaScript Object Notation
//JSON은 데이터를 전달할 때 자바스크립트가 그걸 다룰 수 있도록 object로 바꿔주는 역할
// object <--> string
function paintToDo(text) {
  //입력한 값 생성하는 함수(핵심!)

  const li = document.createElement("li"); //<li> 생성(html 입력 안하고도 생성 된다!)
  const delBtn = document.createElement("button"); //<button> 생성
  const span = document.createElement("span"); //<span> 생성
  const newId = toDos.length + 1; //newId 상수는 toDos(할일 입력한거) 총개수 + 1
  delBtn.innerText = "❌";
  span.innerText = text; //<span> 내용에 text 삽입
  li.appendChild(delBtn); //li 밑에 delBtn
  li.appendChild(span); //li 밑에 span
  li.id = newId; //li에도 id값 입력
  toDoList.appendChild(li); //toDoList(js-toDoList) 밑에 li
  const toDoObj = {
    //array에 입력값 넣기위한 함수.
    text: text, //text에는 text(실제입력한값) 입력
    id: newId, // id에는 newId(toDos 수량+1) 입력
    //toDos array에 왜 이런식으로 저장하냐? 그건 localstorage에도 같이 저장해줘야 하기 떄문임. 아직 뭔말인지 잘 이해안감.
  };
  toDos.push(toDoObj); //toDos Array에다가 toDoObj(입력한 값들 element)을 넣음
  saveToDos(); //입력한값 localStorage에 저장. push 다음에 와야함.
}

function handleSubmit(event) {
  //입력하는 함수
  event.preventDefault();
  const currentValue = toDoInput.value; //currentValue 상수를 입력하는 값으로 지정
  paintToDo(currentValue);
  toDoInput.value = ""; //입력 후 입력칸 값 제거하기.
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); //해야할일 상수 설정
  if (loadedToDos !== null) {
    console.log(loadedToDos); //JSON.parse 하기 전(String)
    const parsedToDos = JSON.parse(loadedToDos);
    console.log(parsedToDos); //JSON.parse 변환(element)
  }
}

function init() {
  loadToDos(); //loadToDos 함수 실행
  toDoForm.addEventListener("submit", handleSubmit); //submit event실행시 handleSubmit 함수 실행
}

init();

//JSON은 javascript의 object를 string으로 바꿔준다.
//데이터를 전달할 때 javascript가 그걸 다룰 수 있도록 object를 바꿔주는 것
