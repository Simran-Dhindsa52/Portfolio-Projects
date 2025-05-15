import 'bootstrap/dist/css/bootstrap.min.css';

import { getWeather } from './api/base';
import { renderWeather } from './dom/weather';

let weatherForecast = document.querySelector("#weather-search")


   weatherForecast.addEventListener("submit", (event)=> {
    event.preventDefault()
           const input = document.querySelector(".form-control");
  const city = input.value.trim();

  if (!city) {
    alert("Please enter a city name.");
    return;
}                                                                

    getWeather(city).then((weatherData)=>{
       console.log(weatherData)
        
        let weatherInfo = document.querySelector(".weather-container")
            renderWeather(weatherData, weatherInfo)
        })
        input = document.querySelector(".form-control")
        input.value = "";
                })
            