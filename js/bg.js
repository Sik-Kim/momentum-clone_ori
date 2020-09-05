const body = document.querySelector("body");

const IMG_NUMBER = 5;

/* function handleImgLoad() {
  console.log("finished loading");
} <API였으면 필요> */

function paintImage(imgNumber) {
  //이미지 실제로 body에 적용
  //이미지
  const image = new Image();
  image.src = `images/${imgNumber + 1}.jpg`;
  /*image.addEventListener("loadend", handleImgLoad); API면 필요*/
  image.classList.add("bgImage");
  body.appendChild(image); //body 안에 image
}

function genRandom() {
  //랜덤 수 도출하는 함수 0~4
  const number = Math.floor(Math.random() * IMG_NUMBER);
  return number;
}

function init() {
  //genRandom함수에서 랜덤값 도출해서 PaintImage 함수 실행
  const randomNumber = genRandom();
  paintImage(randomNumber);
}

init();

// Math.random() javascript 랜덤수학
// Math.ceil() 올림
// Math.floor() 내림
