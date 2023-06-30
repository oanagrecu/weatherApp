const city = document.getElementById("cityName");
const submitButton = document.getElementById("submitButton");
const hourlyWeather = document.getElementById("hourlyWeather");
const weatherDiv = document.getElementById("weatherDivs");
const hourlyDivs = document.getElementById("hourlyDivs");
var myKey = config.SECRET_KEY;
var splashKey = config.Access_Key;
submitButton.addEventListener("click", getDailyWeather);
hourlyWeather.addEventListener("click", getHourlyWeather);

city.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    getDailyWeather();
  }
});
function getDailyWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?appid=${myKey}&units=metric&q=${city.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createPrognozaBoxDiv(data);
      weatherDiv.style.display = "flex";
      hourlyDivs.style.display = "none";
    })
    .catch((error) => {
      console.log("An error occurred:", error);
    });
}

function getHourlyWeather() {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?appid=${myKey}&units=metric&q=${city.value}`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      createPrognozaHourlyDiv(data);
      weatherDiv.style.display = "none";
      hourlyDivs.style.display = "flex";
    })
    .catch((error) => {
      console.log("An error occurred:", error);
    });
}

function createPrognozaBoxDiv(data) {
  weatherDiv.innerHTML = "";
  displayCityImage(city.value, data);
  for (let i = 0; i < 5; i++) {
    const weatherData = data.list[i * 8];
    const weatherCard = createWeatherCard(weatherData);
    weatherDiv.appendChild(weatherCard);
  }
}

function createWeatherCard(weatherData) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "weather-card";

  const dateElement = document.createElement("p");
  const date = new Date(weatherData.dt_txt.split(" ")[0]);
  const options = { weekday: "long" };
  const weekday = date.toLocaleString("en-US", options);
  dateElement.textContent = weekday;
  cardDiv.appendChild(dateElement);

  const weatherIcon = document.createElement("img");
  weatherIcon.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  weatherIcon.style.height = "80px";
  weatherIcon.style.width = "80px";
  cardDiv.appendChild(weatherIcon);

  const minTemperatureElement = document.createElement("p");
  minTemperatureElement.textContent =
    "Min: " + Math.round(weatherData.main.temp_min) + "\u00B0C";
  cardDiv.appendChild(minTemperatureElement);

  const maxTemperatureElement = document.createElement("p");
  maxTemperatureElement.textContent =
    "Max: " + Math.round(weatherData.main.temp_max) + "\u00B0C";
  cardDiv.appendChild(maxTemperatureElement);

  const weatherDescElement = document.createElement("p");
  weatherDescElement.textContent = weatherData.weather[0].description;

  cardDiv.appendChild(weatherDescElement);

  return cardDiv;
}

function createPrognozaHourlyDiv(data) {
  hourlyDivs.innerHTML = "";

  for (let i = 0; i < data.list.length; i++) {
    const weatherData = data.list[i];
    const weatherCard = createHourlyWeatherCard(weatherData);
    hourlyDivs.appendChild(weatherCard);
  }
}

function createHourlyWeatherCard(weatherData) {
  const cardDiv = document.createElement("div");
  cardDiv.className = "hourly-weather-card";

  const dateElement = document.createElement("p");
  dateElement.textContent = weatherData.dt_txt.split(" ")[0];
  // const date = new Date(weatherData.dt_txt.split(" ")[0]);
  // const options = { weekday: "long" };
  // const weekday = date.toLocaleString("en-US", options);
  // dateElement.textContent = weekday;
  cardDiv.appendChild(dateElement);

  const timeElement = document.createElement("p");
  const timeString = weatherData.dt_txt.split(" ")[1];
  const formattedTime = timeString.slice(0, 5); // Extract only the first 5 characters (HH:mm)
  timeElement.textContent = formattedTime;

  cardDiv.appendChild(timeElement);

  const temperatureElement = document.createElement("p");
  temperatureElement.textContent =
    Math.round(weatherData.main.temp) + "\u00B0C";
  cardDiv.appendChild(temperatureElement);

  const weatherIcon = document.createElement("img");
  weatherIcon.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  weatherIcon.style.height = "80px";
  weatherIcon.style.width = "80px";
  cardDiv.appendChild(weatherIcon);

  const weatherDescElement = document.createElement("p");
  weatherDescElement.textContent = weatherData.weather[0].description;
  cardDiv.appendChild(weatherDescElement);

  return cardDiv;
}
function displayCityImage(city, data) {
  const currentWeather = data.list[0];
  const weatherIconCode = currentWeather.weather[0].icon;
  fetch(
    `https://api.unsplash.com/search/photos?query=${city}&client_id=${splashKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      const imageUrl = data.results[0].urls.regular;
      const imageDiv = document.createElement("div");
      imageDiv.classList.add("imageDiv");
      const imageElement = document.createElement("img");
      imageElement.src = imageUrl;
      imageElement.classList.add("city-image");
      imageDiv.appendChild(imageElement);
      weatherDiv.insertBefore(imageDiv, weatherDiv.firstChild);

      const cityInfoDiv = document.createElement("div");
      cityInfoDiv.classList.add("city-info");
      imageDiv.appendChild(cityInfoDiv);
      const cityNameElement = document.createElement("h2");
      cityNameElement.textContent = city;
      cityNameElement.classList.add("info-title");
      cityInfoDiv.appendChild(cityNameElement);

      const currentTemperature = document.createElement("p");
      currentTemperature.textContent = `${Math.round(
        currentWeather.main.temp
      )}\u00B0C`;
      currentTemperature.classList.add("info-temp1");
      cityInfoDiv.appendChild(currentTemperature);

      const realFeelTemperature = document.createElement("p");
      realFeelTemperature.textContent = `Real Feel: ${Math.round(
        currentWeather.main.feels_like
      )}\u00B0C`;
      realFeelTemperature.classList.add("info-temp");
      cityInfoDiv.appendChild(realFeelTemperature);

      const weatherIcon = document.createElement("img");
      weatherIcon.src = `https://openweathermap.org/img/w/${weatherIconCode}.png`;
      // weatherIcon.alt = currentWeather.weather[0].description;
      weatherIcon.classList.add("info-icon");
      cityInfoDiv.appendChild(weatherIcon);

      cityInfoDiv.insertBefore(cityInfoDiv, imageDiv.firstChild);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

// function generateBackgroundImage() {
//   fetch(
//     `https://api.unsplash.com/photos/random?query=europe&client_id=${splashKey}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       const imageUrl = data.urls.regular;
//       document.body.style.backgroundImage = `url(${imageUrl})`;
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }
// generateBackgroundImage();
