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
    return `Last update: ${todayDay}, ${hour}:${minutes}`;
  }
}
function revealPlaces(event) {
  event.preventDefault();
  let location = document.querySelector("#citySearch").value;
  let apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?query=";
  axios
    .get(`${apiUrl}${location}&key=${apiKey}&units=metric`)
    .then(currentTemp);
}
function changeUnit(event) {
  event.preventDefault();
  let temperature = document.querySelector("#degrees");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  fahrenheit.classList.add("active");
  celsius.classList.remove("active");
  temperature.innerHTML = Math.round(fahrenheitTemp);
  feelsLike.innerHTML = `Feels like: ${Math.round(
    (weatherImpression * 9) / 5 + 32
  )}°F`;
  let daily = document.querySelector("#dailyForecast");
  let forecastInFahrenheit = `<div class="row">`;
  dailyWeather.forEach(function (dailyWeatherDay, index) {
    if (index > 0 && index < 7) {
      forecastInFahrenheit =
        forecastInFahrenheit +
        `<div class="col-sm-4">
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        dailyWeatherDay.condition.icon
      }.png"></img>
        <div class="row days">${formatDailyTime(dailyWeatherDay.time)}</div>
         <div class="row highlow">⬆️<span class="weather-max">${Math.round(
           (dailyWeatherDay.temperature.maximum * 9) / 5 + 32
         )}°</span> ⬇️<span class="weather-min">${Math.round(
          (dailyWeatherDay.temperature.minimum * 9) / 5 + 32
        )}°</span></div>
        </div>`;
    }
  });
  forecastInFahrenheit = forecastInFahrenheit + `</div>`;
  daily.innerHTML = forecastInFahrenheit;
}
function changeBack(event) {
  event.preventDefault();
  let temperature = document.querySelector("#degrees");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperature.innerHTML = Math.round(celsiusTemp);
  feelsLike.innerHTML = `Feels like: ${Math.round(weatherImpression)}°C`;
  let daily = document.querySelector("#dailyForecast");
  let forecastContent = `<div class="row">`;
  dailyWeather.forEach(function (dailyWeatherDay, index) {
    if (index > 0 && index < 7) {
      forecastContent =
        forecastContent +
        `<div class="col-sm-4">
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        dailyWeatherDay.condition.icon
      }.png"></img>
        <div class="row days">${formatDailyTime(dailyWeatherDay.time)}</div>
         <div class="row highlow">⬆️<span class="weather-max">${Math.round(
           dailyWeatherDay.temperature.maximum
         )}°</span> ⬇️<span class="weather-min">${Math.round(
          dailyWeatherDay.temperature.minimum
        )}°</span></div>
        </div>`;
    }
  });
  forecastContent = forecastContent + `</div>`;
  daily.innerHTML = forecastContent;
}

function currentTemp(response) {
  let temperature = document.querySelector("#degrees");
  let details = document.querySelector("#description");
  let humidity = document.querySelector("#humid");
  let windShield = document.querySelector("#wind");
  let body = document.querySelector("body");

  weatherIcon = response.data.condition.icon;
  celsiusTemp = response.data.temperature.current;
  weatherImpression = response.data.temperature.feels_like;

  celsius.classList.add("active");
  fahrenheit.classList.remove("active");

  temperature.innerHTML = Math.round(celsiusTemp);
  details.innerHTML = response.data.condition.description;
  document.querySelector("#place").innerHTML = response.data.city;
  feelsLike.innerHTML = `Feels like: ${Math.round(weatherImpression)}°C`;
  humidity.innerHTML = `Humidity: ${Math.round(
    response.data.temperature.humidity
  )}%`;
  windShield.innerHTML = `Wind: ${Math.round(response.data.wind.speed)}  km/h`;

  iconElement.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${weatherIcon}.png`
  );

  if (
    weatherIcon === "scattered-clouds-day" ||
    weatherIcon === "few-clouds-night" ||
    weatherIcon === "scattered-clouds-night" ||
    weatherIcon === "broken-clouds-night" ||
    weatherIcon === "few-clouds-day" ||
    weatherIcon === "broken-clouds-day"
  ) {
    body.style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/095/935/original/pexels-donald-tong-139366.jpg?1693942970")`;
  } else if (
    weatherIcon === "thunderstorm-night" ||
    weatherIcon === "thunderstorm-day"
  ) {
    body.style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/096/298/original/pexels-johannes-plenio-1118869.jpg?1694206762")`;
  } else if (weatherIcon === "snow-night" || weatherIcon === "snow-day") {
    body.style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/096/303/original/pexels-choice-6153987.jpg?1694208611")`;
  } else if (weatherIcon === "mist-night" || weatherIcon === "mist-day") {
    body.style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/096/305/original/pexels-kabita-darlami-18168288.jpg?1694209704")`;
  } else if (
    weatherIcon === "shower-rain-night" ||
    weatherIcon === "rain-night" ||
    weatherIcon === "shower-rain-day" ||
    weatherIcon === "rain-day"
  ) {
    body.style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/091/640/original/pexels-lumn-1028600.jpg?1690747709")`;
  } else {
    body.style.backgroundImage = `url("https://s3.amazonaws.com/shecodesio-production/uploads/files/000/096/373/original/pexels-francesco-ungaro-281260.jpg?1694276260")`;
  }
  activateDailyForecast(response.data.coordinates);
  showPhotoCredits();
}

function activateDailyForecast(coordinates) {
  let apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showDaily);
}

function formatDailyTime(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let week = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return week[day];
}

function showDaily(response) {
  dailyWeather = response.data.daily;
  let daily = document.querySelector("#dailyForecast");
  let forecastContent = `<div class="row">`;
  dailyWeather.forEach(function (dailyWeatherDay, index) {
    if (index > 0 && index < 7) {
      forecastContent =
        forecastContent +
        `<div class="col-sm-4">
      <img src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${
        dailyWeatherDay.condition.icon
      }.png"></img>
        <div class="row days">${formatDailyTime(dailyWeatherDay.time)}</div>
         <div class="row highlow">⬆️<span class="weather-max">${Math.round(
           dailyWeatherDay.temperature.maximum
         )}°</span> ⬇️<span class="weather-min">${Math.round(
          dailyWeatherDay.temperature.minimum
        )}°</span></div>
        </div>`;
    }
  });
  forecastContent = forecastContent + `</div>`;
  daily.innerHTML = forecastContent;
}

function activateLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayCurrent);
}

function displayCurrent(position) {
  let long = position.coords.longitude;
  let lat = position.coords.latitude;
  let apiKey = "cbc90ba0a21t28a990f44b7f6f3ea68o";
  let apiUrl = "https://api.shecodes.io/weather/v1/current?";
  axios
    .get(`${apiUrl}lat=${lat}&lon=${long}&key=${apiKey}&units=metric`)
    .then(currentTemp);
}
function showPhotoCredits() {
  let photoCreditElement = document.querySelector("#photographer");
  if (
    weatherIcon === "scattered-clouds-day" ||
    weatherIcon === "few-clouds-night" ||
    weatherIcon === "scattered-clouds-night" ||
    weatherIcon === "broken-clouds-night" ||
    weatherIcon === "few-clouds-day" ||
    weatherIcon === "broken-clouds-day"
  ) {
    photoCreditElement.innerHTML = `<div id="photographer">Photo by <a href="https://www.pexels.com/@donaldtong94/" target="_blank" class="photographer">Donald Tong</a></div>`;
  } else if (
    weatherIcon === "thunderstorm-night" ||
    weatherIcon === "thunderstorm-day"
  ) {
    photoCreditElement.innerHTML = `<div id="photographer">Photo by <a href="https://www.pexels.com/@jplenio/" target="_blank" class="photographer">Johannes Plenio</a></div>`;
  } else if (weatherIcon === "snow-night" || weatherIcon === "snow-day") {
    photoCreditElement.innerHTML = `<div id="photographer">Photo by <a href="https://www.pexels.com/@choice-8805855/" target="_blank" class="photographer">Choice</a></div>`;
  } else if (weatherIcon === "mist-night" || weatherIcon === "mist-day") {
    photoCreditElement.innerHTML = `<div id="photographer">Photo by <a href="https://www.pexels.com/@kabita-darlami-2613403/" target="_blank" class="photographer">kabita Darlami</a></div>`;
  } else if (
    weatherIcon === "shower-rain-night" ||
    weatherIcon === "rain-night" ||
    weatherIcon === "shower-rain-day" ||
    weatherIcon === "rain-day"
  ) {
    photoCreditElement.innerHTML = `<div id="photographer">Photo by <a href="https://www.pexels.com/@lum3n-44775/" target="_blank" class="photographer">Lum3n</a></div>`;
  } else {
    photoCreditElement.innerHTML = `
  <div id="photographer">
    Photo by <a
      href="https://www.pexels.com/@francesco-ungaro/"
      target="_blank"
      class="photographer"
    >
      Francesco Ungaro
    </a>
  </div>`;
  }
}

let time = document.querySelector("#timeDay");
let date = new Date();
time.innerHTML = formatTime(date);

let engine = document.querySelector("#searchEngine");
engine.addEventListener("submit", revealPlaces);

let button = document.querySelector("#currentButton");
button.addEventListener("click", activateLocation);

let weatherImpression = null;
let celsiusTemp = null;
let dailyWeather = null;
let weatherIcon = null;
let iconElement = document.querySelector("#icon");
let feelsLike = document.querySelector("#precip");
let fahrenheit = document.querySelector("#units");
fahrenheit.addEventListener("click", changeUnit);
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", changeBack);
