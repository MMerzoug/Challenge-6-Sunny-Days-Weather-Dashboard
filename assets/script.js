// fba06e5080ea71f1a51acc6fdb02dafb
//Current weather API key

// call variables to link to html
var userInput = document.getElementById("userInput");
var submitBtn = document.getElementById("submit-btn");
var currentWeatherContainer = document.getElementById("currentWeatherContainer");
var currentWeather = document.getElementById("currentWeather");
var city = document.getElementById("city");
var date = document.getElementById("date");
var temp = document.getElementById("temp");
var wind = document.getElementById("wind");
var humidity = document.getElementById("humidity");
var nextWeather = document.getElementById("nextWeather");
var nextWeatherContainer = document.getElementById("nextWeatherContainer");
var citiesListContainer = document.getElementById("appendCitiesList");

//Initialize cityStorage as an empty array
var cityStorage = [];

// event listener to trigger the next set of functions
submitBtn.addEventListener("click", function () {
    getCoords(userInput.value);
    userInput.value = "";
});

function appendCitiesList() {
    citiesListContainer.innerHTML = "";
    for (let i = 0; i < cityStorage.length; i++) {
        let cityName = cityStorage[i]
        var cityButton = document.createElement("button");
        cityButton.innerHTML = cityName
        cityButton.onclick = function () {
            getCoords(cityName);
        }
        citiesListContainer.appendChild(cityButton);
    }
}

// function to get coordinates using the API call 
function getCoords(city) {
    // geocoding API Call
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=fba06e5080ea71f1a51acc6fdb02dafb"
  
    fetch(url)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            if (data[0]) {
                cityStorage.unshift(city);
                cityStorage = cityStorage.slice(0, 10);
                appendCitiesList();
                var lat = data[0].lat;
                var lon = data[0].lon;
                getCurrentWeather(lat, lon);
                getNextWeather (lat,lon);
            } else {
                alert ("City not found. Please enter a valid city name.")
            }
        });
}

// lat and lon API Call
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//function to get current weather using the API call
function getCurrentWeather(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=fba06e5080ea71f1a51acc6fdb02dafb&units=imperial"
    console.log(url);

    fetch(url)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            // Call the function to display the weather data
            displayCurrentWeather(data);
        });
}


// function to display data in currentWeatherContainer
var displayCurrentWeather = function (data) {
    city.textContent = data.name;
    date.innerHTML = dayjs.unix(data.dt).format("dddd") + "<br>" + "<br>" + dayjs.unix(data.dt).format("MM/DD/YYYY");
    temp.textContent = "Temperature: " + data.main.temp + " °F";
    wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    humidity.textContent = "Humidity: " + data.main.humidity + " %";
}


//fba06e5080ea71f1a51acc6fdb02dafb
// 5 day weather forecast API Key

//api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// 5 Day API call lat, lon

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//5 Day API call geocode 


// function to get 5 day forecast 
function getNextWeather(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=fba06e5080ea71f1a51acc6fdb02dafb&units=imperial"
    console.log(url);

    fetch(url)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            // Call the function to display the weather data
            displayNextWeather(data);
            console.log(data);
        });
}

// function to display data in NextWeatherContainer
var displayNextWeather = function (data) {
    nextWeatherContainer.innerHTML = ""; // Clear the forecast container
    for (let i = 2; i < data.list.length; i += 8) {
        var forecastPeriod = document.createElement("section");
        forecastPeriod.innerHTML = `
        <h2>${dayjs.unix(data.list[i].dt).format('dddd')}</h2>
        <h2>${dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')}</h2>
        <p>Temperature: ${data.list[i].main.temp} °F</p>
        <p>Wind Speed: ${data.list[i].wind.speed} MPH</p>
        <p>Humidity: ${data.list[i].main.humidity} %</p>
    `;
        nextWeatherContainer.appendChild(forecastPeriod);
    }
}

// use bootstrap to style
