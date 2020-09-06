const clockContainer = document.querySelector(".js-clock"), // 클래스명 앞에 .은 왜찍지????
  clockTitle = clockContainer.querySelector("h1");
//querySelector는 element의 하위(자식)요소(함수)를 찾아줌
// console.log(clockContainer);
// console.log(clockTitle);

function getTime() {
  const date = new Date();
  const minutes = date.getMinutes();
  const hours = date.getHours();
  const seconds = date.getSeconds();
  clockTitle.innerText = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }:${seconds < 10 ? `0${seconds}` : seconds}
  `;
}
//   const seconds = date.getSeconds();

function init() {
  getTime();
  setInterval(getTime, 1000);
} // 함수는 최대한 나눠서 해결!!
init();

/*
function sayHi(){console.log("say, Hi")
}
setInterval(sayHi,1000)
//첫번째 인자: 함수, 두번째 인자: 실행할 시간 간격(milliseconds)
*/
