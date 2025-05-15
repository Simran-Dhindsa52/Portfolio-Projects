// renderWeather function
const renderWeather = (weatherData, listElement) => {

   if (!weatherData || !weatherData.sys || !weatherData.main) {
    listElement.innerHTML = `<p>Error: Incomplete weather data.</p>`;
    return;
  }

  let element = `<div class="mt-2 card" >
  <div class="card-body">
    <h5 class="card-title">${weatherData.name}, ${weatherData.sys.country}</h5>
    <h6 class="card-subtitle mb-2 text-muted">${(weatherData.main.temp.toFixed(1))}  °C</h6>
    <p class="card-text">${weatherData.weather[0].description}</p>
  </div>
</div>`
listElement.innerHTML += element
}

 //export the renderWeather function
export {renderWeather}

