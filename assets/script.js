// fba06e5080ea71f1a51acc6fdb02dafb
//API key

var userInput = document.getElementById("userInput");
var submitBtn = document.getElementById("submit-btn");
var currentWeatherContainer = document.getElementById("currentWeatherContainer");
var currentWeather = document.getElementById("currentWeather");
var city= document.getElementById("city");
var  date= document.getElementById ("date");
var temp= document.getElementById ("temp");
var wind= document.getElementById ("wind");
var humidity= document.getElementById ("humidity");

submitBtn.addEventListener("click", function () {
    getCoords(userInput.value)

});

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

var displayCurrentWeather= function (data){
    city.textContent = data.name;
    date.textContent = dayjs.unix(data.dt).format('MM/DD/YYYY');
    temp.textContent = "Temperature: " + data.main.temp + " °F";
    wind.textContent = "Wind speed: " + data.wind.speed + " mph";
    humidity.textContent = "Humidity: " + data.main.humidity + " %";
}
console.log (displayCurrentWeather);
    

// use bootstrap to style
// call variables to link to html
// and fill it with the data in currentWeather function (put it at the )