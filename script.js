const options = {
  method: "GET",
  headers: {
    "X-RapidAPI-Key": "1f834a1fbdmsh4ffa4b9622c1909p1f0ff2jsn399c87955502",
    "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
  },
};

// Function to convert time format to hr:min:sec
function formatTime(time) {
  const date = new Date(time);
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
}

const updateWeatherTable = () => {
  const commonPlaces = [
    { city: "Shanghai", row: 1 },
    { city: "Boston", row: 2 },
    { city: "Lucknow", row: 3 },
    { city: "Kolkata", row: 4 }
  ];

  commonPlaces.forEach(({ city, row }) => {
    fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
      .then((response) => response.json())
      .then((response) => {
        const tableRow = document.querySelector(`#weatherRow${row}`);
        if (tableRow) {
          tableRow.innerHTML = `
            <th scope="row" class="text-start">${city}</th>
            <td>${response.cloud_pct}</td>
            <td>${response.temp}</td>
            <td>${response.feels_like}</td>
            <td>${response.humidity}</td>
            <td>${response.min_temp}</td>
            <td>${response.max_temp}</td>
            <td>${response.wind_speed}</td>
            <td>${response.wind_degrees}</td>
            <td>${formatTime(response.sunrise)}</td>
            <td>${formatTime(response.sunset)}</td>
          `;
        }
      })
      .catch((err) => console.error(err));
  });
};

const getWeather = (city) => {
  const cityNameElement = document.querySelector('.cityName');
  const tempElement = document.querySelector('#temp');
  const feels_likeElement = document.querySelector('#feels_like');
  const humidityElement = document.querySelector('#humidity');
  const max_tempElement = document.querySelector('#max_temp');
  const min_tempElement = document.querySelector('#min_temp');
  const sunriseElement = document.querySelector('#sunrise');
  const sunsetElement = document.querySelector('#sunset');
  const wind_degreesElement = document.querySelector('#wind_degrees');
  const wind_speedElement = document.querySelector('#wind_speed');

  cityNameElement.innerHTML = city;

  fetch(`https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${city}`, options)
    .then((response) => response.json())
    .then((response) => {
      if (response.temp !== undefined) {
        tempElement.innerHTML = response.temp;
      } else {
        tempElement.innerHTML = 'N/A';
      }

      if (response.feels_like !== undefined) {
        feels_likeElement.innerHTML = response.feels_like;
      } else {
        feels_likeElement.innerHTML = 'N/A';
      }

      if (response.humidity !== undefined) {
        humidityElement.innerHTML = response.humidity;
      } else {
        humidityElement.innerHTML = 'N/A';
      }

      if (response.max_temp !== undefined) {
        max_tempElement.innerHTML = response.max_temp;
      } else {
        max_tempElement.innerHTML = 'N/A';
      }

      if (response.min_temp !== undefined) {
        min_tempElement.innerHTML = response.min_temp;
      } else {
        min_tempElement.innerHTML = 'N/A';
      }

      sunriseElement.innerHTML = response.sunrise !== undefined ? formatTime(response.sunrise) : 'N/A';
      sunsetElement.innerHTML = response.sunset !== undefined ? formatTime(response.sunset) : 'N/A';
      wind_degreesElement.innerHTML = response.wind_degrees !== undefined ? response.wind_degrees : 'N/A';
      wind_speedElement.innerHTML = response.wind_speed !== undefined ? response.wind_speed + 'km/hr' : 'N/A';
    })
    .catch((err) => console.error(err));
};

const submitButton = document.getElementById('submit');
const cityInput = document.getElementById('city');

submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  const city = cityInput.value;
  getWeather(city);
});

// Initialize weather data for the common places and default city
updateWeatherTable();
getWeather("Indore");
