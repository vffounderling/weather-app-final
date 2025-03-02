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
let minute = now.getMinutes();

let currentDT = document.querySelector("#current-Date-Time");

showDateTime();

function showCityInput(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#search-input-value");
  console.log(cityInput.value);
}

let form = document.querySelector("#search-ideas");

form.addEventListener("submit", showCityInput);

function roundTemp(temp) {
  console.log(temp);
  return Math.round(temp);
}

function showTemp(response) {
  console.log(response.data);
  console.log(response.data.temperature.current);
}

document
  .getElementById("search-ideas")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    var cityInput = document.getElementById("search-input-value");
    var city = cityInput.value;
    console.log(city);

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

//function showCity(weather) {
// const roundedTemp = roundTemp(weather.temp);
// console.log(weather.temp);

//  if (userCity === weather.city.toLowerCase()) {
//   alert(
//     `It is currently ${roundedTemp}° in ${weather.city} with a humidity of ${weather.humidity}%.`
//   );
// }
//}

//let cityFound = false;

//weather.forEach(function (item) {
// if (userCity === item.city.toLowerCase()) {
//   cityFound = true;
//   showCity(item);
// }
//});

//if (!cityFound) {
// alert(
//   `Sorry, we don't know the weather for this city, try going to https://www.google.com/search?q=weather+${userCity}.`
// );
//}
