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

userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        getCoords(userInput.value);
        userInput.value = "";
    }
});

function appendCitiesList() {
    citiesListContainer.innerHTML = "";
    for (let i = 0; i < cityStorage.length; i++) {
        let cityName = cityStorage[i]
        var cityButton = document.createElement("button");
        cityButton.classList.add("btn", "w-100");
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
    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + city + "&appid=fba06e5080ea71f1a51acc6fdb02dafb"

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
                getNextWeather(lat, lon);
            } else {
                alert("City not found. Please enter a valid city name.")
            }
        });
}

// lat and lon API Call
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}

//function to get current weather using the API call
function getCurrentWeather(lat, lon) {
    var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=fba06e5080ea71f1a51acc6fdb02dafb&units=imperial"

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

    var weatherDescription = data.weather[0].main; // Get the weather description
    var weatherEmoji = getWeatherEmoji(weatherDescription); // Get the corresponding emoji

    city.innerHTML = data.name + " " + 
                     dayjs.unix(data.dt).format("(MM/DD/YYYY)") + " " + 
                     weatherEmoji;
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

    fetch(url)
        .then(function (response) {
            return response.json();

        }).then(function (data) {
            // Call the function to display the weather data
            displayNextWeather(data);
        });
}

var getWeatherEmoji = function(description) {
    description = description.toLowerCase();

    if (description.includes("clouds")) {
        return "☁️";
    } else if (description.includes("clear")) {
        return "☀️";
    } else if (description.includes("drizzle") || description.includes("rain")) {
        return "🌧️";
    } else if (description.includes("thunderstorm")) {
        return "⛈️";
    } else if (description.includes("snow")) {
        return "❄️";
    } else if (description.includes("mist")) {
        return "🌫️";
    } else if (description.includes("wind")) {
        return "💨";
    } else {
        return "";  // Default case
    }
}


// function to display data in NextWeatherContainer
var displayNextWeather = function (data) {
    nextWeatherContainer.innerHTML = ""; // Clear the forecast container

    var forecastRow = document.createElement("div");
    forecastRow.className = "row five-columns";

    for (let i = 2; i < data.list.length; i += 8) {

        var weatherDescription = data.list[i].weather[0].main; // Get the weather description
        var weatherEmoji = getWeatherEmoji(weatherDescription); // Get the corresponding emoji

        var forecastPeriod = document.createElement("section");
        forecastPeriod.className = "col"; // Added to have bootstrap styles
        
        forecastPeriod.innerHTML = `
        <div class="card">
            <div class="card-body">
                <h4>${dayjs.unix(data.list[i].dt).format('dddd')}</h4>
                <h4>${dayjs.unix(data.list[i].dt).format('MM/DD/YYYY')}</h4>
                <p>${weatherEmoji}</p> <!-- Add the weather emoji to the card -->
                <p>Temp: ${data.list[i].main.temp} °F</p>
                <p>Wind: ${data.list[i].wind.speed} MPH</p>
                <p>Humidity: ${data.list[i].main.humidity} %</p>
            </div>
        </div>
    `;
        forecastRow.appendChild(forecastPeriod);
    }

    nextWeatherContainer.appendChild(forecastRow);
}

console.log (displayNextWeather);
