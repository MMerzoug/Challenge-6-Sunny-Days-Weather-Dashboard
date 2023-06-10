// fba06e5080ea71f1a51acc6fdb02dafb
//Current weather API key

// call variables to link to html
var userInput = document.getElementById("userInput");
var submitBtn = document.getElementById("submit-btn");
var currentWeatherContainer = document.getElementById("currentWeatherContainer");
var currentWeather = document.getElementById("currentWeather");
var city= document.getElementById("city");
var  date= document.getElementById ("date");
var temp= document.getElementById ("temp");
var wind= document.getElementById ("wind");
var humidity= document.getElementById ("humidity");
var nextWeather= document.getElementById ("nextWeather");
var nextWeatherContainer= document.getElementById ("nextWeatherContainer");
var nextDate = document.getElementById("nextDate");
var nextTemp = document.getElementById("nextTemp");
var nextWind = document.getElementById("nextWind");
var nextHumidity = document.getElementById("nextHumidity");

// event listener to trigger the next set of functions
submitBtn.addEventListener("click", function () {
    getCoords(userInput.value)
});

// function to get coordinates using the API call 
function getCoords(city) {
    // geocoding API Call
    // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=fba06e5080ea71f1a51acc6fdb02dafb"
    console.log(url);

    fetch(url)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            getCurrentWeather(data[0].lat, data[0].lon)

            console.log(data[0].lat);
        })

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
            console.log(data);
        })
}


// function to display data in currentWeatherContainer
var displayCurrentWeather= function (data){
    city.textContent = data.name;
    date.textContent = dayjs.unix(data.dt).format('MM/DD/YYYY');
    temp.textContent = "Temperature: " + data.main.temp + " °F";
    wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    humidity.textContent = "Humidity: " + data.main.humidity + " %";
}
console.log (displayCurrentWeather);

//fba06e5080ea71f1a51acc6fdb02dafb
// 5 day weather forecast API Key

//api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}
// 5 Day API call lat, lon

//http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}
//5 Day API call geocode 

// function to get coordinates using the API call 
function getCoords(city) {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=fba06e5080ea71f1a51acc6fdb02dafb"
    console.log(url);

    fetch(url)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            getCurrentWeather(data[0].lat, data[0].lon);
            getNextWeather(data[0].lat, data[0].lon);

            console.log(data[0].lat);
        })

}


// function to display 5 day forecast in nextWeatherContainer
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
        })
}

// function to display data in NextWeatherContainer
var displayNextWeather= function (data){
    nextWeatherContainer.innerHTML = ""; // Clear the forecast container
    for (let i = 0; i < data.list.length; i++) {
        var forecastPeriod= document.createElement("section");
        forecastPeriod.innerHTML = `
        <h2>${dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')}</h2>
        <p>Temperature: ${data.list[i].main.temp} °F</p>
        <p>Wind Speed: ${data.list[i].wind.speed} MPH</p>
        <p>Humidity: ${data.list[i].main.humidity} %</p>
    `;
    nextWeatherContainer.appendChild(forecastPeriod);
    // date.textContent = dayjs.unix(data.dt).format('MM/DD/YYYY');
    // temp.textContent = "Temperature: " + data.main.temp + " °F";
    // wind.textContent = "Wind Speed: " + data.wind.speed + " MPH";
    // humidity.textContent = "Humidity: " + data.main.humidity + " %";
}
}
console.log (displayNextWeather);
// use bootstrap to style
