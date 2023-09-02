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
  let apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
  let apiUrl =
    "https://api.shecodes.io/weather/v1/current?query=";
  axios
    .get(`${apiUrl}${location}&key=${apiKey}&units=metric`)
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
  temperature.innerHTML = Math.round(response.data.temperature.current);
  let details = document.querySelector("#description");
  details.innerHTML = response.data.condition.description;
  document.querySelector("#place").innerHTML=response.data.city;
  let feelsLike = document.querySelector("#precip");
  let humidity = document.querySelector("#humid");
  let windShield = document.querySelector("#wind");
  feelsLike.innerHTML = `Feels like: ${Math.round(
    response.data.temperature.feels_like
  )}°C`;
  humidity.innerHTML = `Humidity: ${Math.round(response.data.temperature.humidity)}%`;
  windShield.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}  km/h`;
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`);
}

function activateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrent);
}
function displayCurrent(position){
let long = position.coords.longitude;
let lat = position.coords.latitude;
let apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
let apiUrl =
  "https://api.shecodes.io/weather/v1/current?";
axios
  .get(`${apiUrl}lat=${lat}&lon=${long}&key=${apiKey}&units=metric`)
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
//if (icon===rain) if(icon===sunny) if(icon===cloudy)
//setattribute(background,"insert new img url")


