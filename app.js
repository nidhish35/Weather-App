apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=London";
apiKey = "5e7c075bba3fd5b9e5ef9565459626f1"
const btn = document.querySelector(".search-section button");
const icon = document.querySelector(".weather-icon");

async function getWeatherData() {
    try {
        const response = await fetch(apiUrl + `&appid=${apiKey}`);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);

        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
        document.querySelector(".humidity").innerHTML = data.main.humidity + " %";

        if (data.weather[0].main == "Clouds") {
            icon.src = "clouds.png";
        } else if (data.weather[0].main == "Rain") {
            icon.src = "rain.png";
        } else if (data.weather[0].main == "Clear") {
            icon.src = "clear.png";
        } else if (data.weather[0].main == "Drizzle") {
            icon.src = "drizzle.png";
        } else if (data.weather[0].main == "Mist") {
            icon.src = "mist.png";
        } else if (data.weather[0].main == "Snow") {
            icon.src = "snow.png";
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Please check the city name and try again.");
    }
}

btn.addEventListener("click", () => {
    const searchValue = document.querySelector(".search-section input").value;
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=${searchValue}`;
    getWeatherData();
});
