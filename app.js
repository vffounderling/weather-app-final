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

let apiKey = "6d79336304f779ad3bt855cfc1ao01b4"; // Global scope, before the event listener

function handleError(error) {
  console.error("API Error:", error);
  if (error.response && error.response.status) {
    alert(
      `Error: ${error.response.status} - There was an error fetching the weather data. Please try again.`
    );
  } else {
    alert("There was an error fetching the weather data. Please try again.");
  }
}

function roundTemp(temperature) {
  return Math.round(temperature);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

//display city input & current temp on the page

document
  .querySelector("#search-ideas")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    let cityInput = document.getElementById("search-input-value");
    let city = cityInput.value; //define city here
    let cityTrim = city.toLowerCase();
    let weatherURL = `https://api.shecodes.io/weather/v1/current?query=${cityTrim}&key=${apiKey}&units=metric`;

    axios.get(weatherURL).then(showTemp).catch(handleError);

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
      let conditions = response.data.condition.description;
      conditionsDisplay.innerHTML = `${conditions}`;

      getForecast(response.data.city);
    }
  });

//get forecast info from api
function getForecast(city) {
  let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiURL).then(displayForecast).catch(handleError);
}

//display forecast info

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="daily-forecast">
        <div class="forecast-day">${formatDay(day.time)}</div>
        <div class="forecast-icon"><img src="${day.condition.icon_url}"/></div>
        <div class="forecast-max"><strong>${Math.round(
          day.temperature.maximum
        )}°C</strong></div>
        <div class="forecast-min">${Math.round(day.temperature.minimum)}°C</div>
      </div>
      `;
    }
  });
  let forecastElement = document.querySelector("#forecast"); //get the element here
  forecastElement.innerHTML = forecastHtml; //update the html here after the loop.
}
