function getCity(){
    let submitButton = document.querySelector('#fetchData');
    let city = document.querySelector('#city');
    submitButton.addEventListener('click', () =>{
        getWeather(city.value);
        city.value = '';
    });
}

async function getWeather(location){
    try{
        let weatherData = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=73e6d1abf997a1ed2cb08919bfb92d20`);
        let realData = await weatherData.json();
        let temp = parseWeather(realData);
        let container = document.querySelector('.container');
        if(container){
            container.remove();
        }
        displayWeatherData(temp);
    } catch{
        alert("Please enter a valid city and try again!");
    }
}

function parseWeather(data){
    let forecast = data.weather[0].main;
    let feels_like = Math.round(((data.main.feels_like - 273.15) * 9/5 + 32)*100) / 100;
    let temp = Math.round(((data.main.temp - 273.15) * 9/5 + 32)*100) / 100;
    let highTemp = Math.round(((data.main.temp_max - 273.15) * 9/5 + 32)*100) / 100;
    let lowTemp = Math.round(((data.main.temp_min - 273.15) * 9/5 + 32)*100) / 100;
    let city = data.name;

    return {forecast, feels_like, temp, highTemp, lowTemp, city};
}

function displayWeatherData(data){
    let container = document.createElement('div');
    container.classList.add('container');

    let cityName = document.createElement('div');
    cityName.classList.add('cityName');
    cityName.innerHTML = data.city;
    
    let temperature = document.createElement('div');
    temperature.innerHTML = data.temp + '\u00B0 F';

    let feels_like = document.createElement('div');
    feels_like.innerHTML = 'Feels like: ' + data.feels_like  + '\u00B0 F';

    let highTemp = document.createElement('div');
    highTemp.innerHTML = 'High: ' + data.highTemp + '\u00B0 F';

    let lowTemp = document.createElement('div');
    lowTemp.innerHTML = 'Low: ' + data.lowTemp + '\u00B0 F';

    let forecast = document.createElement('div');
    forecast.innerHTML = 'Forecast: ' + data.forecast;

    container.appendChild(cityName);
    container.appendChild(forecast);
    container.appendChild(temperature);
    container.appendChild(feels_like);
    container.appendChild(lowTemp);
    container.appendChild(highTemp);

    let body = document.querySelector('.body');
    body.appendChild(container);
}

function convertFtoC(temp){
    return Math.round(((temp-32)*5/9) * 100) / 100;
}

function converCtoF(temp){
    return (temp* 9 / 5) + 32;
}

getCity();