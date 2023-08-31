function formatTime(date) {
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let todayDay = week[date.getDay()];
  let hour = date.getHours();
  let minutes = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  {
    return `Last update: ${todayDay},${hour}:${minutes}`;
  }
}
function revealPlaces(event) {
  event.preventDefault();
  let location = document.querySelector("#citySearch").value;
  let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
  let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
  axios
    .get(`${apiUrl}q=${location}&appid=${apiKey}&units=metric`)
    .then(currentTemp);
}
function changeUnit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#degrees");
  temperature.innerHTML = 88;
}
function changeMeasurement(event) {
  event.preventDefault();
  let temperature = document.querySelector("#degrees");
  temperature.innerHTML = 31;
}

function currentTemp(response) {
  let temperature = document.querySelector("#degrees");
  temperature.innerHTML = Math.round(response.data.main.temp);
  let details = document.querySelector("#description");
  details.innerHTML = response.data.weather[0].description;
  document.querySelector("#place").innerHTML=response.data.name;
  let feelsLike = document.querySelector("#precip");
  let humidity = document.querySelector("#humid");
  let windShield = document.querySelector("#wind");
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.main.feels_like
  )}°C`;
  humidity.innerHTML = `Humidity: ${Math.round(response.data.main.humidity)}%`;
  windShield.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}  km/h`;
}

function activateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrent);
}
function displayCurrent(position){
let long = position.coords.longitude;
let lat = position.coords.latitude;
let apiKey = "cf6b50b908fa2e0baca3eed8a569a5f6";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather?";
axios
  .get(`${apiUrl}lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`)
  .then(currentTemp);
}
let time = document.querySelector("#timeDay");
let date = new Date();
time.innerHTML = formatTime(date);

let engine = document.querySelector("#searchEngine");
engine.addEventListener("submit", revealPlaces);
let button = document.querySelector("#currentButton");
button.addEventListener("click", activateLocation);

let fahrenheit = document.querySelector("#units");
fahrenheit.addEventListener("click", changeUnit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeMeasurement);


