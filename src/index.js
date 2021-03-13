function formatDate(timestamp) {
  let date = new Date(timestamp);
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let year = date.getFullYear();
  let dayOfMounth = date.getDate();
  return `${day}, ${month} ${dayOfMounth}, ${year}`;
}
function formatTime(timestamp) {
  let date = new Date(timestamp);
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  return `${hours}:${minutes}`;
}

function showTemperature(response) {
  let cityElement = document.querySelector("h1");
  let temperatureElement = document.querySelector("h2");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let precipitationElement = document.querySelector("#precipitation");
  let pressureElement = document.querySelector("#pressure");
  let convertPressure = Math.round(response.data.main.pressure * 0.75);
  let dataElement = document.querySelector("#date");
  let timeElement = document.querySelector("#time");

  celsiusTemperature = response.data.main.temp;
  timeElement.innerHTML = `Updated: ${formatTime(response.data.dt * 1000)}`;
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  precipitationElement.innerHTML = `${response.data.weather[0].description}`;
  pressureElement.innerHTML = `Pressure: ${convertPressure} mmHg`;
  dataElement.innerHTML = formatDate(response.data.dt * 1000);
}
function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `  
  <div class="card" style="width: 8rem">
    <img
        src="http://openweathermap.org/img/wn/${
          forecast.weather[0].icon
        }@2x.png"
    />
    <div class="card-body">
      <p class="card-text nextDateToday">
        ${formatTime(forecast.dt * 1000)}
        <br />
        ${Math.round(forecast.main.temp_max)}° / ${Math.round(
      forecast.main.temp_min
    )}°C
      </p>
    </div>
  </div>
  `;
  }
}

function search(city) {
  let apiKey = "92bae01c9a19537ef478ef8ad568eb5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showForecast);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("h2");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
}
function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector("h2");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function handlePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "92bae01c9a19537ef478ef8ad568eb5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(handlePosition);
}
getCurrentPosition();

let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);
let currentCityButton = document.querySelector("#currentCity");
currentCityButton.addEventListener("click", getCurrentPosition);

search("New York");
