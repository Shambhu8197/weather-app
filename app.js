// Define the API key for OpenWeatherMap and the API URL for weather data
const apikey = "e4e045082eef68a1a86c2aff320a00fe";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

// Selecting the input field, search button, and weather icon element in the DOM
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

// Asynchronous function to fetch weather data based on the city name
async function checkWeather(city) {
  // Fetch data from the OpenWeatherMap API using the city name
  const response = await fetch(apiUrl + city + `&appid=${apikey}`);

  // Check if the response is a 404 error (city not found)
  if (response.status == 404) {
    // Display an error message and hide the weather information
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();

    console.log(data.weather[0].main); // Log the weather condition

    // Update the city name, temperature, humidity, and wind speed on the page
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    // Check and set the weather icon based on the condition
    if (data.weather[0].main.toLowerCase() === "clouds") {
      weatherIcon.src = "clouds.png";
    } else if (data.weather[0].main.toLowerCase() === "clear") {
      weatherIcon.src = "clear.png";
    } else if (data.weather[0].main.toLowerCase() === "rain") {
      weatherIcon.src = "rain.png";
    } else if (data.weather[0].main.toLowerCase() === "drizzle") {
      weatherIcon.src = "drizzle.png";
    } else if (data.weather[0].main.toLowerCase() === "mist") {
      weatherIcon.src = "mist.png";
    }
    // Display the weather information and hide the error message
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}
// Add an event listener to the search button that triggers the checkWeather function when clicked
searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value); // Pass the value from the search input to the checkWeather function
});
