var APIkeyopenweather = "18c2b5d927731b2570bf1103a61e0198"
var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkeyopenweather;

document.getElementById("City-Search").addEventListener("click", searchCity);


// This is a funtion to get a five day forecast for any City searched
function getWeather(city) {
    var weatherURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIkeyopenweather;
    fetch(weatherURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var weather = {
                city: data.city.name,
                temp: data.list[0].main.temp,
                humidity: data.list[0].main.humidity,
                wind: data.list[0].wind.speed,
                uv: data.list[0].main.uv,
                icon: data.list[0].weather[0].icon,
                date: data.list[0].dt_txt,
                getWeather: function () {
                    return this.city + " " + this.temp + " " + this.humidity + " " + this.wind + " " + this.uv + " " + this.icon + " " + this.date;
                }
            }
        })
};

// This function makes it so then the city entered in the search bar will pull up the weather for that city
function searchCity() {
    var city = document.getElementById("City-Search").value;
    getWeather(city);
    console.log(city);
}   

// This funtion makes it so the button will create elements to display the weather for the city searched in the search bar in the Five Day Forecast section
function displayWeather() {
    var city = document.getElementById("City-Search").value;
    var weather = getWeather(city);
    var weatherDiv = document.createElement("div");
    var weatherCity = document.createElement("h2");
    var weatherTemp = document.createElement("p");
    var weatherHumidity = document.createElement("p");
    var weatherWind = document.createElement("p");
    var weatherUV = document.createElement("p");
    var weatherIcon = document.createElement("img");
    var weatherDate = document.createElement("p");
    weatherCity.textContent = weather.city;
    weatherTemp.textContent = weather.temp;
    weatherHumidity.textContent = weather.humidity;
    weatherWind.textContent = weather.wind;
    weatherUV.textContent = weather.uv;
    weatherIcon.src = weather.icon;
    weatherDate.textContent = weather.date;
    weatherDiv.appendChild(weatherCity);
    weatherDiv.appendChild(weatherTemp);
    weatherDiv.appendChild(weatherHumidity);
    weatherDiv.appendChild(weatherWind);
    weatherDiv.appendChild(weatherUV);
    weatherDiv.appendChild(weatherIcon);
    weatherDiv.appendChild(weatherDate);
    document.getElementById("Five-Day-Forecast").appendChild(weatherDiv);
}

// this funtion will convert the longitude and latitude to a city name
function convertToCity(lat, lon) {
    var cityURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkeyopenweather;
    fetch(cityURL)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
            var city = {
                city: data.city.name,
                getCity: function () {
                    return this.city;
                }
            }
        })
};

// This funtion will make it so the city searched will be saved in local storage
function saveCity() {
    var city = document.getElementById("City-Search").value;
    localStorage.setItem("city", city);
}

//this function will console log the city searched
function logCity() {
    var city = localStorage.getItem("city");
    console.log(city);
}
