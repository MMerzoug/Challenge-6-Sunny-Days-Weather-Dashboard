// fba06e5080ea71f1a51acc6fdb02dafb

var userInput = document.getElementById("userInput");
var submitBtn = document.getElementById("submit-btn");
var currentWeatherContainer = document.getElementById("currentWeather");
var 

submitBtn.addEventListener("click", function () {
    getCoords(userInput.value)

});

function getCoords(city) {
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
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

function getCurrentWeather(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=fba06e5080ea71f1a51acc6fdb02dafb&units=imperial"
    console.log(url);

    fetch(url)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            console.log(data);

        })
}

// use bootstrap to style
// call variables to link to html
// and fill it with the data in currentWeather function (put it at the end)