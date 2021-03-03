function formatDate(timestamp) {
  let now = new Date();
  let date = now.getDate();
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
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  return `${day}, ${month} ${date}, ${year}`;
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

  return `Time: ${hours}:${minutes}`;
}

function showTemperature(response) {
  let cityElement = document.querySelector("h1");
  let temperatureElement = document.querySelector("h2");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let precipitationElement = document.querySelector("#precipitation");
  let pressureElement = document.querySelector("#pressure");
  let convertPressure = Math.round(response.data.main.pressure * 0.75);
  let dataElement = document.querySelector("#time");
  let timeElement = document.querySelector("#date");
  cityElement.innerHTML = response.data.name;
  temperatureElement.innerHTML = Math.round(response.data.main.temp);
  windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  precipitationElement.innerHTML = `${response.data.weather[0].description}`;
  pressureElement.innerHTML = `Pressure: ${convertPressure} mmHg`;
  dataElement.innerHTML = formatDate(response.data.dt * 1000);
  timeElement.innerHTML = formatTime(response.data.dt);
}
function search(city) {
  let apiKey = "92bae01c9a19537ef478ef8ad568eb5c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showTemperature);
}
function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

// function displayFahrenheitTemperature(event) {
//   event.preventDefault();
//   let temperatureElement = document.querySelector("#temperature");
//   celsiusLink.classList.remove("active");
//   fahrenheitLink.classList.add("active");
//   let fahrenheiTemperature = (celsiusTemperature * 9) / 5 + 32;
//   temperatureElement.innerHTML = Math.round(fahrenheiTemperature);
// }
// function displayCelsiusTemperature(event) {
//   event.preventDefault();
//   celsiusLink.classList.add("active");
//   fahrenheitLink.classList.remove("active");
//   let temperatureElement = document.querySelector("#temperature");
//   temperatureElement.innerHTML = Math.round(celsiusTemperature);
// }
// let celsiusTemperature = null;
let form = document.querySelector("#searchForm");
form.addEventListener("submit", handleSubmit);
// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);
// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("New York");

// let apiKey = "92bae01c9a19537ef478ef8ad568eb5c";
// let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&units=metric&appid=${apiKey}`;

// axios.get(apiUrl).then(showTemperature);
