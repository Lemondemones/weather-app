const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");
const notFoundPage = document.querySelector(".not-found");

function handleButtonClick(event) {
  const key = "04166a35eeb42ae55d7e3e0db92d32f5";
  const city = document.querySelector(".search-box input").value.trim();

  if (!city) {
    return;
  }

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${key}`;
  fetch(url)
    .then((response) => response.json())
    .then((weatherData) => {
      try {
        notFoundPage.style.display = "none";
        notFoundPage.classList.remove("fadeIn");

        const weatherImage = document.querySelector(".weather-box img");
        const temperature = document.querySelector(".weather-box .temperature");
        const location = document.querySelector(".weather-box .location");
        const humidity = document.querySelector(".weather-details .humidity span");
        const wind = document.querySelector(".weather-details .wind span");

        console.log(weatherData.weather[0].main);

        switch (weatherData.weather[0].main) {
          case "Clear":
            weatherImage.src = `images/clear.png`;
            break;
          case "Clouds":
            weatherImage.src = "/images/cloud.png";
            break;
          case "Mist":
            weatherImage.src = "/images/mist.png";
            break;
          case "Rain":
            weatherImage.src = "/images/rain.png";
            break;
          case "Snow":
            weatherImage.src = "/images/snow.png";
            break;
          // default:
          //   weatherImage.src = "";
        }

        temperature.innerHTML = `${parseInt(weatherData.main.temp)} <span>C</span>`;
        wind.innerHTML = `${parseInt(weatherData.wind.speed)} Km/h`;
        location.innerHTML = `${weatherData.weather[0].description}`;
        humidity.innerHTML = `${weatherData.main.humidity}%`;

        weatherBox.style.display = "";
        weatherDetails.style.display = "";
        weatherBox.classList.add("fadeIn");
        weatherDetails.classList.add("fadeIn");
        container.style.height = "600px";
      } catch (error) {
        console.log(error);

        container.style.height = "400px";
        weatherBox.style.display = "none";
        weatherDetails.style.display = "none";
        notFoundPage.style.display = "block";
        notFoundPage.classList.add("fadeIn");
        return;
      }
    });
}

search.addEventListener("click", handleButtonClick);
