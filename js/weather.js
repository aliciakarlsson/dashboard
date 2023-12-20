// Hämtar användarens plats
function getLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(getWeather);
  } else {
    console.log("Error");
  }
}

//Hämtar väderinformationen baserat på plats
function getWeather(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=9c72aed1751adb576f1b1295a4006a13&lang=se&units=metric`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      // Hantera väderdatan här
      console.log(data);
      // Visar väderinformationen
      displayWeather(data);
    })
    .catch((error) => {
      console.log("Could not fetch weather data:", error);
    });
}

// Funktion för att visa väderinformationen på sidan
function displayWeather(weatherData) {
  // Här kan du manipulera DOM för att visa väderdata på din webbsida
  // Till exempel:
  const weatherElement = document.getElementById("weathersection");
  weatherElement.innerHTML = `<h2>Dagens väder</h2>
    <p id="temperature"> ${Math.floor(weatherData.main.temp)} °C</p>
    <p id="windspeed">${weatherData.wind.speed} m/s</p>
    <p id="description">${weatherData.weather[0].description}</p>`;
}

// Anropa getLocation för att starta processen
getLocation();

