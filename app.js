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

  //error handling for apis

  function handleError(error) {
    console.error("API Error:", error);
    alert("There was an error fetching the weather data. Please try again.");
  }

  axios.get(weatherURL).then(showTemp).catch(handleError);

  //axios.get(weatherURL).then(showTemp);

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

    getForecast(response.data.city);
  }

  //get forecast info from api
  function getForecast(city) {
    let apiKey = "6d79336304f779ad3bt855cfc1ao01b4";
    let apiURL = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;

    axios.get(apiURL).then(displayForecast).catch(handleError);
  }

  //round temp values
  function roundTemp(currentTemp) {
    return Math.round(currentTemp);
  }

  //display forecast info

  function displayForecast(response) {
    let forecastHtml = "";

    response.data.daily.forEach(function (forecast, index) {
      if (index < 5) {
        let forecastDate = new Date(forecast.time * 1000);
        let day = forecastDate.toLocaleDateString("en-US", {
          weekday: "short",
        });

        forecastHtml =
          forecastHtml +
          `
      <div class="daily-forecast">
        <div class="forecast-day">${day}</div>
        <div class="forecast-icon">${forecast.daily.condition.icon_url}</div>
        <div class="forecast-max">${forecast.daily.temperature.maximum}°C</div>
        <div class="forecast-min">${forecast.daily.temperature.minimum}°C</div>
      </div>
      `;
      }
    });

    let forecastElement = document.querySelector("#forecast");

    forecastElement.innerHTML = forecastHtml;
  }
});
