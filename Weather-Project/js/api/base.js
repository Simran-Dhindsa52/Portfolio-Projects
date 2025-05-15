// replace your api key
//test
//const API_KEY = "http://api.openweathermap.org/data/2.5/weather?q=Edmonton&appid=02eb3a14475c5ad031b4fea51d49e2b8"
  const apiKey = '02eb3a14475c5ad031b4fea51d49e2b8';
 

// create getWeather function here

const getWeather = (city) => {
 const API_KEY = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    return fetch(`${API_KEY}`)
      .then((response)=> {
          return response.json()
      }).then((data)=> {
          return data
      })

}

// export the getWeather function
export { getWeather }