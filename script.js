const city = document.getElementById("cityName");
const submitButton = document.getElementById("submitButton");
const weatherDiv = document.getElementById("weatherDivs");

// const urlForecast =
//   "https://api.openweathermap.org/data/2.5/forecast?appid=899ebe2b8a35dfdf38dd465a71c3f9fa&units=metric&q=";

submitButton.addEventListener("click", getWeather);
function getWeather() {
    //   const cityName = city.value;
    //   var city = document.getElementById("cityName").value;
    //   let urlCity = urlForecast + city.value;
    //   console.log(urlCity);
    fetch(
      `https://api.openweathermap.org/data/2.5/forecast?appid=899ebe2b8a35dfdf38dd465a71c3f9fa&units=metric&q=${city.value}`
    )
      .then((response) => response.json())
      .then((data) => {
        //   console.log(data.list[0].dt_txt.split(" ")[0]);
        //   console.log(data.list[0].dt_txt.split(" ")[1]);
        //   console.log(data.list[0].main.temp_max);
        var dailyWeather = 0;
        for (let i = 0; i < data.list.length; i++) {
          if (
            data.list[i].dt_txt.split(" ")[0] !==
            data.list[i + 1].dt_txt.split(" ")[0]
          ) {
            dailyWeather = i + 1;
            break;
          }
        }
        weatherDiv.innerHTML = "";

        createPrognozaBoxDiv(data, weatherDiv, dailyWeather, dailyWeather);
        createPrognozaBoxDiv(
          data,
          weatherDiv,
          dailyWeather + 12,
          dailyWeather + 12
        );
        createPrognozaBoxDiv(
          data,
          weatherDiv,
          dailyWeather + 22,
          dailyWeather + 22
        );
        createPrognozaBoxDiv(
          data,
          weatherDiv,
          dailyWeather + 30,
          dailyWeather + 30
        );
        createPrognozaBoxDiv(
          data,
          weatherDiv,
          dailyWeather + 45,
          dailyWeather + 45
        );
        createPrognozaBoxDiv(
          data,
          weatherDiv,
          dailyWeather + 57,
          dailyWeather + 57
        );
      });
  }

function createPrognozaHoursOutput(
  name,
  date,
  hour,
  icon,
  description,
  temp,
  feels_like,
  temp_min,
  temp_max
) {
  let imgURL = "http://openweathermap.org/img/w/";
  const dayOfWeek = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
  });
  output = `
            <div class="card">
               <h2>${name}</h2>
               <h5 class="date"> ${dayOfWeek}, ${date}</h5>
              
               <img src="${imgURL}${icon}.png">
               <p> ${description}</p>
               <h3>Temp: ${temp} C </h3> 
               <p>Feels like: ${feels_like} C</p>
               <p>Min: ${temp_min} C</p>
               <p>Max: ${temp_max} C</p>
               <p> ${description}</p>
            </div>
         `;
  return output;
  // document.getElementById("weatherDivs").innerHTML += output;

  // .catch((error) => {
  //   console.log("An error occurred:", error);
  // });
}

function createPrognozaBoxDiv(data, divElement, startIndex, endIndex) {
  let prognozaBox = document.createElement("div");
  prognozaBox.classList.add("prognozaBox");

  for (let i = startIndex; i <= endIndex; i++) {
    prognozaBox.innerHTML += createPrognozaHoursOutput(
      city.value,
      data.list[i].dt_txt.split(" ")[0],
      data.list[i].dt_txt.split(" ")[1],
      data.list[i].weather[0].icon,
      data.list[i].weather[0].description,
      data.list[i].main.temp,
      data.list[i].main.feels_like,
      data.list[i].main.temp_min,
      data.list[i].main.temp_max
    );
  }
  divElement.appendChild(prognozaBox);
}
