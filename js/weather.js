const API_KEY = "3d12a474c2b6b29a679eb2b098bfe7d7"; //OpenWeather 사이트에서 API key값 가져옴
// const WEATHER_API =
const COORDS = "coords";

const weather = document.querySelector(".js-weather");

function getWeather(lat, lng) {
  fetch(
    //fetch안에는 가져올 데이터 넣어줌, https:// 입력하기, API_KEY 입력, $빼먹지말기..!
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json(); //여기서 json은 메소드. // then 사용함으로써 fetch 완료되기까지 기다리고 실행. 정보 가져오는데 시간이 좀 걸리니까.
    })
    .then(function (jsonDifferent) {
      console.log(jsonDifferent); //확인용
      const temperature = jsonDifferent.main.temp; //main 하위에 temp 정보 있음
      const place = jsonDifferent.name;

      weather.innerText = `현재 온도: ${temperature}도
       현재 위치: ${place}`; //weather html에 temp,place 값 불러와 입력
      //html에서 class명 weather 있는지 확인. js-weather만 있어서 계속 에러
    });
}

function saveCoords(coordsObj) {
  //coords 저장
  localStorage.setItem(COORDS, JSON.stringify(coordsObj)); //coordsObj(latitude, longitude) 정보값을 string으로 변경해서 LS에 저장
}

function handleGeoSuccess(position) {
  //위치정보 얻었을때 실해되는 함수
  //현재 position을 함수에 저장한다
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude, // latitude = latitude 이거랑 같은의미
    longitude, // longitude = longitude 이거랑 같은의미
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);

  //   console.log(position);
}
function handleGeoError() {
  //위치 가져오기 error 시 실행되는 함수(팝업창에서 차단하면 실행됨)
  console.log("Cant Access geo location");
}

function askForCoords() {
  //실제 position 가져오는거
  navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
}

function loadCoords() {
  //storage에 날씨 load하는 함수
  const loadedCoords = localStorage.getItem(COORDS); //LS의 coords 값 가져오고.
  if (loadedCoords === null) {
    askForCoords(); //LS에 값 없으면 askForCoords 함수 실행
    // 정리: 만약 local storage에 아무것도 없으면 결국 getWeather 함수가 실행 된다 왜냐면,
    // local storage에 아무것도 없으면 askForCoords 함수가 실행되고,
    // 이 함수 안에서 정상적인 위치정보를 가져오게 되면 handleGeoSuccess가 실행 되는데, 이안에서 API가 최종적으로 호출되기 때문.
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
    // = JSON.parse(loadedCoords); //JSON.parse : string -> object
    // console.log(parsedCoords); //확인용
  }
}

function init() {
  loadCoords();
}

init();

//network 패널은 우리가 request한 내용, 그에 대한 response 내용을 보여줌
