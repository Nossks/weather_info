const apiKey = "2c33ea21c4df631641d2d7ca613f2ae1";

document.getElementById("fetch-weather").addEventListener("click", fetchWeatherData);

function fetchWeatherData() {
    const cityName = document.getElementById("city").value.trim();

    if (!cityName) {
        alert("City name is required.");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);
            return response.json();
        })
        .then(data => {
            if (data.cod === "401") {
                alert("Invalid API key.");
                return;
            }
            if (data.cod === "404") {
                alert("City not found.");
                return;
            }

            displayWeather(data);
        })
        .catch(error => {
            console.error("Error:", error);
            alert(`Error: ${error.message}`);
        });
}

function displayWeather(data) {
    document.getElementById("weather-info").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Weather: ${data.weather[0].description}</p>
    `;
}
