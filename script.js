const city = document.getElementById("cityName");
const submitButton = document.getElementById("submitButton");
const hourlyWeather = document.getElementById("hourlyWeather");
const weatherDiv = document.getElementById("weatherDivs");
const hourlyDivs = document.getElementById("hourlyDivs");
var myKey = config.SECRET_KEY;
submitButton.addEventListener("click", getDailyWeather);
hourlyWeather.addEventListener("click", getHourlyWeather);

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
  dateElement.textContent = weatherData.dt_txt.split(" ")[0];
  cardDiv.appendChild(dateElement);

  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = weatherData.main.temp + "\u00B0C";
  cardDiv.appendChild(temperatureElement);

  const weatherDescElement = document.createElement("p");
  weatherDescElement.textContent = weatherData.weather[0].description;
  cardDiv.appendChild(weatherDescElement);

  const weatherIcon = document.createElement("img");
  weatherIcon.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  cardDiv.appendChild(weatherIcon);

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

  const timeElement = document.createElement("p");
  timeElement.textContent = weatherData.dt_txt.split(" ")[1];
  cardDiv.appendChild(timeElement);

  const temperatureElement = document.createElement("p");
  temperatureElement.textContent = weatherData.main.temp + "\u00B0C";
  cardDiv.appendChild(temperatureElement);

  const weatherDescElement = document.createElement("p");
  weatherDescElement.textContent = weatherData.weather[0].description;
  cardDiv.appendChild(weatherDescElement);

  const weatherIcon = document.createElement("img");
  weatherIcon.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
  cardDiv.appendChild(weatherIcon);

  return cardDiv;
}

// const city = document.getElementById("cityName");
// const submitButton = document.getElementById("submitButton");
// const hourlyWeather = document.getElementById("hourlyWeather");
// const weatherDiv = document.getElementById("weatherDivs");
// const hourlyDivs = document.getElementById("hourlyDivs");
// submitButton.addEventListener("click", getWeather);
// hourlyWeather.addEventListener("click", createPrognozaHourlyDiv);

// function getWeather() {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?appid=899ebe2b8a35dfdf38dd465a71c3f9fa&units=metric&q=${city.value}`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       var dailyWeather = 0;
//       for (let i = 0; i < data.list.length; i++) {
//         if (
//           data.list[i].dt_txt.split(" ")[0] !==
//           data.list[i + 1].dt_txt.split(" ")[0]
//         ) {
//           dailyWeather = i + 1;
//           break;
//         }
//       }
//       createPrognozaBoxDiv(data, weatherDiv);

//       hourlyDivs.innerHTML = "";
//       createPrognozaBoxDiv(data, hourlyDivs, 0, dailyWeather - 1);
//       createPrognozaBoxDiv(data, hourlyDivs, dailyWeather, dailyWeather + 7);
//       createPrognozaBoxDiv(
//         data,
//         hourlyDivs,
//         dailyWeather + 8,
//         dailyWeather + 15
//       );
//       createPrognozaBoxDiv(
//         data,
//         hourlyDivs,
//         dailyWeather + 16,
//         dailyWeather + 23
//       );
//       createPrognozaBoxDiv(
//         data,
//         hourlyDivs,
//         dailyWeather + 24,
//         dailyWeather + 31
//       );
//       createPrognozaBoxDiv(
//         data,
//         hourlyDivs,
//         dailyWeather + 32,
//         data.list.length - 1
//       );
//     });
//   createPrognozaHourlyDiv();
// }

// function createPrognozaBoxDiv(data, weatherDiv) {
//   weatherDiv.innerHTML = "";

//   for (let i = 0; i < 5; i++) {
//     const weatherData = data.list[i * 8];
//     const weatherCard = createWeatherCard(weatherData);
//     weatherDiv.appendChild(weatherCard);
//   }

//   function createWeatherCard(weatherData) {
//     const cardDiv = document.createElement("div");
//     cardDiv.className = "weather-card";

//     const dateElement = document.createElement("p");
//     dateElement.textContent = weatherData.dt_txt.split(" ")[0];
//     cardDiv.appendChild(dateElement);

//     const temperatureElement = document.createElement("p");
//     temperatureElement.textContent = "Temperature: " + weatherData.main.temp;
//     cardDiv.appendChild(temperatureElement);

//     const weatherDescElement = document.createElement("p");
//     weatherDescElement.textContent =
//       "Weather: " + weatherData.weather[0].description;
//     cardDiv.appendChild(weatherDescElement);

//     const weatherIcon = document.createElement("img");
//     weatherIcon.src = `https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`;
//     cardDiv.appendChild(weatherIcon);

//     return cardDiv;
//   }
// }
// function createPrognozaHoursOutput(
//   name,
//   date,
//   hour,
//   icon,
//   description,
//   temp,
//   feels_like,
//   temp_min,
//   temp_max
// ) {
//   let imgURL = "http://openweathermap.org/img/w/";
//   const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
//     weekday: "long",
//   });
//   output = `
//             <div class="card">
//                <h2>${name}</h2>
//                <h5 class="date"> ${dayOfWeek}, ${date}</h5>

//                <img src="${imgURL}${icon}.png">
//                <p> ${description}</p>
//                <h3>Temp: ${temp} C </h3>
//                <p>Feels like: ${feels_like} C</p>
//                <p>Min: ${temp_min} C</p>
//                <p>Max: ${temp_max} C</p>
//                <p> ${description}</p>
//             </div>
//          `;
//   return output;
//   // document.getElementById("weatherDivs").innerHTML += output;

//   // .catch((error) => {
//   //   console.log("An error occurred:", error);
//   // });
// }

// function createPrognozaHourlyDiv(data, startIndex, endIndex) {
//   let prognozaBox = document.createElement("div");
//   prognozaBox.classList.add("prognozaBox");

//   for (let i = startIndex; i <= endIndex; i++) {
//     prognozaBox.innerHTML += createPrognozaHoursOutput(
//       city.value,
//       data.list[i].dt_txt.split(" ")[0],
//       data.list[i].dt_txt.split(" ")[1],
//       data.list[i].weather[0].icon,
//       data.list[i].weather[0].description,
//       data.list[i].main.temp,
//       data.list[i].main.feels_like,
//       data.list[i].main.temp_min,
//       data.list[i].main.temp_max
//     );
//   }
//   hourlyDivs.appendChild(prognozaBox);
// }
