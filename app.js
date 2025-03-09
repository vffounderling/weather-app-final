//display data & time

function showDateTime() {
  currentDT.innerHTML = `${day}, ${date} ${month} ${year} at ${hour}:${minute}`;
}

let now = new Date();

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
  "December",
];
let month = months[now.getMonth()];

let date = now.getDate();
let year = now.getFullYear();
let hour = now.getHours();
let minute = String(now.getMinutes()).padStart(2, "0");

let currentDT = document.querySelector("#current-Date-Time");

showDateTime();

//display city input & current temp on the page

let form = document.querySelector("#search-ideas");
let city;
form.addEventListener("submit", function (event) {
  event.preventDefault();
  let cityInput = document.getElementById("search-input-value");
  city = cityInput.value;

  let apiKey = "6d79336304f779ad3bt855cfc1ao01b4";
  let cityTrim = city.toLowerCase();
  let weatherURL = `https://api.shecodes.io/weather/v1/current?query=${cityTrim}&key=${apiKey}&units=metric`;

  axios.get(weatherURL).then(showTemp);

  function showTemp(response) {
    let cityDisplay = document.querySelector("#city");
    cityDisplay.innerHTML = response.data.city;

    let currentTemp = response.data.temperature.current;
    currentTemp = roundTemp(currentTemp);

    let tempDisplay = document.querySelector("#temp");
    tempDisplay.innerHTML = `${currentTemp}°C`;

    let humidityDisplay = document.querySelector("#humidity");
    let humidityValue = response.data.temperature.humidity;
    humidityDisplay.innerHTML = `${humidityValue}% Humidity`;

    let windDisplay = document.querySelector("#wind");
    let windValue = response.data.wind.speed;
    windDisplay.innerHTML = `${windValue} m/sec Wind Speed`;

    let iconDisplay = document.querySelector("#condition-icon");
    let conditionIcon = response.data.condition.icon_url;
    iconDisplay.src = `${conditionIcon}`;

    let conditionsDisplay = document.querySelector("#conditions");
    let conditionsData = response.data.condition.description;
    let conditions = conditionsData.toUpperCase();
    conditionsDisplay.innerHTML = `${conditions}`;
  }

  function roundTemp(currentTemp) {
    return Math.round(currentTemp);
  }
});

//display forecast info

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
    <div class="daily-forecast">
      <div class="forecast-day">${day}</div>
      <div class="forecast-icon">conditions icon</div>
      <div class="forecast-max">max temp</div>
      <div class="forecast-min">min temp</div>
    </div>
    `;
  });

  let forecastElement = document.querySelector("#forecast");

  forecastElement.innerHTML = forecastHtml;
}

displayForecast();
