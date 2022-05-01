let city = document.getElementById('search-input');
let searchButton = document.getElementById('search-button');

async function fetchWeatherInformation(location){
    try {
        const requestURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
        const api = '&APPID=c5760956ddcf8bd3a318cadcdfcf3466';
        const metricParamenter = '&units=metric';
        const request = requestURL + location + api + metricParamenter;
        const errorMessage = document.getElementById('errorMessage')
        if(location === ''){
            errorMessage.innerText = "Input the name of a city!";
            errorMessage.style.display = 'block';
        } else {
            errorMessage.style.display = 'none'
            const response = await fetch(request, { mode:'cors' });
        
            // Check if the contect type is correct through the response header
            const contentType = response.headers.get('content-type');
            if (!contentType || !contentType.includes('application/json')) {
              throw new TypeError("Oops, we haven't got JSON!");
            }
        
            let data = await response.json();
            
            processJsonData(data);
            displayWeatherImage(data);
        }
    } catch(error) {
        console.log(error)
        errorMessage.style.display = 'block';
        errorMessage.innerText = `Location not found!`;
    }
}

function processJsonData(data){
    const dataInfo = {
        weatherDescription: data.weather[0].description,
        cityName: data.name,
        temperature: data.main.temp,
        temperatureFeel: data.main.feels_like,
        humidity: data.main.humidity,
        windSpeed: data.wind.speed
    }

    populateDOM(dataInfo);
}

function populateDOM(obj){
    let weatherInfoDescription  = document.getElementById('weather-info-description');
    let weatherInfoLocation     = document.getElementById('weather-info-location');
    let weatherInfoTemp         = document.getElementById('weather-info-temp');
    let weatherInfoFeel         = document.getElementById('weather-info-feel-value');
    let weatherInfoHumidity     = document.getElementById('weather-info-humidity-value');
    let weatherInfoWind         = document.getElementById('weather-info-wind-value');

    weatherInfoDescription.textContent  = obj.weatherDescription;
    weatherInfoLocation.textContent     = obj.cityName;
    weatherInfoTemp.textContent         = Math.round(obj.temperature);
    weatherInfoFeel.textContent         = Math.round(obj.temperatureFeel);
    weatherInfoHumidity.textContent     = Math.round(obj.humidity);
    weatherInfoWind.textContent         = Math.round(obj.windSpeed * 10) / 10;
}

searchButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetchWeatherInformation(city.value);
});

function celsiusFahrenheit(x){
    let result = (x * 9/5) + 32;
    return result;
};

function fahrenheitCelsius(x){
    let result = (x - 32) * 5/9;
    return result;
};

let displayCelsius      = document.getElementById('weather-info-temp-c');
let displayFahrenheit   = document.getElementById('weather-info-temp-f');
let weatherTempSign     = document.getElementById('weather-info-temp-sign');
let weatherInfoTemp     = document.getElementById('weather-info-temp');
let weatherFeelSign     = document.getElementById('weather-info-feel-sign');
let weatherFeelTemp     = document.getElementById('weather-info-feel-value');

displayFahrenheit.addEventListener('click', () => {
    displayCelsius.style.display    = 'block';
    displayFahrenheit.style.display = 'none';
    weatherTempSign.textContent     = '°F';
    weatherFeelSign.textContent     = '°F';
    weatherInfoTemp.textContent     = Math.round(celsiusFahrenheit(Number(weatherInfoTemp.textContent)));
    weatherFeelTemp.textContent     = Math.round(celsiusFahrenheit(Number(weatherFeelTemp.textContent)));
});

displayCelsius.addEventListener('click', () => {
    displayCelsius.style.display    = 'none';
    displayFahrenheit.style.display = 'block'
    weatherTempSign.textContent     = '°C';
    weatherFeelSign.textContent     = '°C';
    weatherInfoTemp.textContent     = Math.round(fahrenheitCelsius(Number(weatherInfoTemp.textContent)));
    weatherFeelTemp.textContent     = Math.round(fahrenheitCelsius(Number(weatherFeelTemp.textContent)));

});

let container   = document.getElementById('container');

// container.style.backgroundImage = "url('rain.jpeg')";
container.style.backgroundRepeat = 'none';
container.style.backgroundSize = 'cover';
container.style.backgroundPosition = 'center';

function displayWeatherImage(data){
    let weatherDescription = data.weather[0].description;
    if(weatherDescription === 'overcast clouds'){

    } else if(weatherDescription === 'light snow'){
        container.style.backgroundImage = "url('lightSnow.jpeg')";
    } else if(weatherDescription === 'mist'){
        container.style.backgroundImage = "url('mist.jpeg')";
    } else if(weatherDescription === 'clear sky'){
        container.style.backgroundImage = "url('clearSky.jpeg')";
    } else if(weatherDescription === 'light rain'){
        container.style.backgroundImage = "url('lightRain.jpeg')";
    } else if(weatherDescription === 'scattered clouds'){
        container.style.backgroundImage = "url('scatteredClouds.jpeg')";
    } else if(weatherDescription === 'broken clouds'){
        container.style.backgroundImage = "url('brokenClouds.jpeg')";
    }
}

fetchWeatherInformation('abuja');
