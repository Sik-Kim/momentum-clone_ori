const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");
//html에서 가져오기

const TODOS_LS = "toDos"; //해야할일 상수 설정

/*
function filterFn(toDo) {
  //forEach에서 function 실행하는 것처럼 각각의 item과 같이 실행됨
  return toDo.id === 2;
  //filter는 array의 모든 아이템을 통해 함수를 실행하고 true인 아이템들만 가지고 새로운 array를 만듬(id 가 1일때)
}
밑에 filter() 안으로 함수 넣음. 밖으로 안빼고
*/

let toDos = []; //toDos 를 입력할 때 마다 toDos Array에 입력됨

function deleteToDo(event) {
  //ToDo 삭제 함수
  const btn = event.target; //target당한 버튼?
  const li = btn.parentNode; //btn의 부모 li 선택
  toDoList.removeChild(li); //toDoList에서 li삭제?
  //   console.log(event.target.parentNode);
  const cleanToDos = toDos.filter(function (toDo) {
    return toDo.id !== parseInt(li.id);
    //toDo id는 숫자, li id는 string 임... 초 헷갈..
    //li를 parseInt 써서 string에서 number로 변경함.
  });
  //filterFn함수에서 체크된 아이템의 array를 주는 역할
  //filterFn함수에 id===1만 있으면 id 1인 아이템만 가져온다.
  console.log(cleanToDos);
  //콘솔에 cleanToDos(새로운 array) 3개, toDos(예전 array)는 4개
  toDos = cleanToDos; //toDos let으로 정의 유의
  saveToDos(); //toDos를 저장할꺼임(즉 새로고침해도 다시 html에서 toDos 생기지 안음)
}

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
  delBtn.addEventListener("click", deleteToDo);
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

// function something(toDo) {
//   console.log(toDo.text);
// }
// forEach 안에 함수 이렇게 분리시켜도 되긴함.

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS); //해야할일 상수 설정
  if (loadedToDos !== null) {
    // console.log(loadedToDos); //JSON.parse 하기 전(String)
    const parsedToDos = JSON.parse(loadedToDos);
    // console.log(parsedToDos); //JSON.parse 변환(element)
    parsedToDos.forEach(function (toDo) {
      paintToDo(toDo.text); //각각의 toDo 요소에 대해서 paintToDo 함수가 적용되는거지
    });
    //localstorage에 있는 내용을 자동으로 paintToDo함수 적용되게 해줌.(원래 새로고침하면 LS에는 남아있으나 화면에선 사라졌었음)

    // forEach는 기본적으로 함수를 실행하는데 array에 담겨있는 것들 각각에 한번씩 함수를 실행시켜줌.
    // 다른거처럼 만들어논 함수를 호출하는게 아니라 안에다 바로 만드는거지
    //parsedToDos array에 있는 각각의 element에 지금 만들 함수를 적용함. 그 각각을 toDo로 칭할거고.
  }
}

function init() {
  loadToDos(); //loadToDos 함수 실행
  toDoForm.addEventListener("submit", handleSubmit); //submit event실행시 handleSubmit 함수 실행
}

init();

//JSON은 javascript의 object를 string으로 바꿔준다.
//데이터를 전달할 때 javascript가 그걸 다룰 수 있도록 object를 바꿔주는 것

//filter, forEach 중요. list에 있는 모든 item을 위한 함수 실행시킴
