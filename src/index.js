function showFindCityWeather(response) {
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = `${temperature}`;
  let wind = document.querySelector("#wind");
  let currentWind = response.data.wind.speed;
  wind.innerHTML = `Wind: ${currentWind} km/h`;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  let precipitation = document.querySelector("#precipitation");
  let currentPrecipitation = response.data.weather[0].description;
  precipitation.innerHTML = `${currentPrecipitation}`;
  let pressure = document.querySelector("#pressure");
  let currentPressure = Math.round(response.data.main.pressure * 0.75);
  pressure.innerHTML = `Pressure: ${currentPressure} mmHg`;

  function changeCelsius(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("h2");
    currentTemperature.innerHTML = `${temperature}`;
  }
  let celsius = document.querySelector("#celsius-link");
  celsius.addEventListener("click", changeCelsius);

  function changeFahrenheit(event) {
    event.preventDefault();
    let currentTemperature = document.querySelector("h2");
    currentTemperature.innerHTML = `${temperatureFahrenheit}`;
  }
  let temperatureFahrenheit = Math.round((temperature * 9) / 5 + 32);
  let fahrenheit = document.querySelector("#fahrenheit-link");
  fahrenheit.addEventListener("click", changeFahrenheit);
}

function findCityWeather(event) {
  event.preventDefault();
  let inputCity = document.querySelector("#searchCity");
  let findCity = document.querySelector("#city");
  findCity.innerHTML = `${inputCity.value}`;
  let apiKey = `92bae01c9a19537ef478ef8ad568eb5c`;
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity.value}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showFindCityWeather);
}

function showCurrentWeather(response) {
  let h2 = document.querySelector("h2");
  let temperature = Math.round(response.data.main.temp);
  h2.innerHTML = `${temperature}`;
  let h1 = document.querySelector("#city");
  let city = response.data.name;
  h1.innerHTML = `${city}`;
  let wind = document.querySelector("#wind");
  let currentWind = response.data.wind.speed;
  wind.innerHTML = `Wind: ${currentWind} km/h`;
  let humidity = document.querySelector("#humidity");
  let currentHumidity = response.data.main.humidity;
  humidity.innerHTML = `Humidity: ${currentHumidity}%`;
  let precipitation = document.querySelector("#precipitation");
  let currentPrecipitation = response.data.weather[0].description;
  precipitation.innerHTML = `${currentPrecipitation}`;
  let pressure = document.querySelector("#pressure");
  let currentPressure = Math.round(response.data.main.pressure * 0.75);
  pressure.innerHTML = `Pressure: ${currentPressure} mmHg`;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = `92bae01c9a19537ef478ef8ad568eb5c`;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showCurrentWeather);
}

let enterCity = document.querySelector("#enterCitySearch");
enterCity.addEventListener("submit", findCityWeather);

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

let now = new Date();
let date = now.getDate();
let day = days[now.getDay()];
let year = now.getFullYear();
let month = months[now.getMonth()];
let currentDate = document.querySelector("#date");
currentDate.innerHTML = `${day}, ${month} ${date}, ${year}`;

function formatTime(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `Time: ${hours}:${minutes}`;
}
let currentTime = document.querySelector("#time");
currentTime.innerHTML = formatTime(now);

navigator.geolocation.getCurrentPosition(retrievePosition);
