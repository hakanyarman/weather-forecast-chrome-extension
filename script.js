document.addEventListener('DOMContentLoaded', () => {
    const weatherBox = document.getElementById("weather-box");
    const tempField = document.getElementById("temp");
    const weatherForecastField = document.getElementById("weather-forecast");
    const weatherIconImg = document.getElementById("weather-icon");
    const cityInputField = document.getElementById("city-text-input");
    const getForecastButton = document.getElementById('get-forecast-btn');
    const errorMessageField = document.getElementById("error-message");
    const humidityField = document.getElementById("hum");
    const feelsLikeField = document.getElementById("feels-like");
    const windField = document.getElementById("wind");

    const apiKey = 'cd45c0c21800a75b4f46ed9c7efb6c3a';

    const getForecast = () => {
        const city = cityInputField.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data["message"] == "city not found") {
                    errorMessageField.style.display = "block";
                    weatherBox.style.display = "none";
                    errorMessageField.innerHTML = "City not found";

                } else if (city == "") {
                    errorMessageField.innerHTML = "Please enter a city name";
                    errorMessageField.style.display = "block";
                    weatherBox.style.display = "none";
                }
                else {
                    errorMessageField.innerHTML = "";

                    errorMessageField.style.display = "none";
                    weatherBox.style.display = "block";

                    const weatherDescription = data["weather"][0]['description'];
                    const temperature = data["main"]['temp'];
                    const iconCode = data["weather"][0]["icon"];
                    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
                    const humidity = data["main"]["humidity"];
                    const feelsLike = data["main"]["feels_like"];
                    const wind = data["wind"]["speed"];

                    tempField.innerHTML = `${temperature}°C`;
                    weatherForecastField.innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
                    weatherIconImg.style.display = "block";
                    weatherIconImg.src = iconUrl;
                    weatherIconImg.alt = weatherDescription;
                    humidityField.innerHTML = `Humidity: ${humidity}%`;
                    feelsLikeField.innerHTML = `Feels Like: ${feelsLike}°C`;
                    windField.innerHTML = `Wind: ${wind} m/s`;
                }
            })
            .catch(error => {
                console.error('API çağrısında hata:', error);
            });
    }

    getForecastButton.addEventListener('click', getForecast);
    document.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            getForecast();
        }
    });

});
