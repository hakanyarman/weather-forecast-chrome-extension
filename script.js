document.addEventListener('DOMContentLoaded', () => {
    const tempField = document.getElementById("temp");
    const weatherForecastField = document.getElementById("weather-forecast");
    const weatherIconImg = document.getElementById("weather-icon");
    // const selectElement = document.getElementById('cities-menu');ü
    const cityInputField = document.getElementById("city-text-input");
    const getForecastButton = document.getElementById('get-forecast-btn');
    const errorMessageField = document.getElementById("error-message");


    const apiKey = 'cd45c0c21800a75b4f46ed9c7efb6c3a';
    // inputtan al 

    const getForecast = () => {
        const city = cityInputField.value;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                errorMessageField.style.display = "none";
                if (data["message"] == "city not found") {
                    errorMessageField.style.display = "block";
                }
                const weatherDescription = data["weather"][0]['description'];
                const temperature = data["main"]['temp'];
                const iconCode = data["weather"][0]["icon"];
                const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

                tempField.innerHTML = `${temperature}°C`;
                weatherForecastField.innerHTML = weatherDescription.charAt(0).toUpperCase() + weatherDescription.slice(1);
                weatherIconImg.style.display = "block";
                weatherIconImg.src = iconUrl;
                weatherIconImg.alt = weatherDescription;
            })
            .catch(error => {
                console.error('API çağrısında hata:', error);
            });
    }

    getForecastButton.addEventListener('click', getForecast);
});
