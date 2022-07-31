//hero img
const heroShadow = document.querySelector(".hero-shadow");

//heroImg bg changer
const heroImg = document.querySelector(".hero-img");

//inputs
const address = document.querySelector(".address");
const latitude = document.querySelector(".latitude");
const longitude = document.querySelector(".longitude");

//labels
const labelCity = document.querySelector(".labelCity");
const labelCoords = document.querySelector(".labelCoords");

//textWarning
const warningText = document.querySelector(".warningText");
let warningValue = document.querySelector(".warningValue");

//results
let addressValue = document.querySelector(".addressValue");
let latitudeValue = document.querySelector(".latitudeValue");
let longitudeValue = document.querySelector(".longituteValue");
let timezoneValue = document.querySelector(".timezoneValue");
let temperatureValue = document.querySelector(".temperatureValue");
let weatherValue = document.querySelector(".weatherValue");
let pressureValue = document.querySelector(".pressureValue");
let humidityValue = document.querySelector(".humidityValue");
let windValue = document.querySelector(".windValue");
let weatherIcon = document.querySelector(".weatherIcon");

//BTNs
let addressBtn = document.querySelector(".addressBtn");
let coordsBtn = document.querySelector(".coordsBtn");

//inputs
let urlWeather;
let urlGeolocation;
let urlCoords;

//moreInfo dropdown
const moreInfo = document.querySelector(".dropdown");
const detailsZone = document.querySelector(".details-zone");
const coordsInfo = document.querySelector(".coords-info");
const visible = document.querySelector(".visible");

//city found by coords
let coordsCity;

//coords for functions
let lat;
let long;

//api resources for CITY SEARCH
const apiLink = 'https://api.openweathermap.org/data/2.5/weather?q=';
const apiKey = '&appid=c1f1c9d36c357d051bcb16882afe549f';
const units = '&units=metric';

//functions
function stayActive() {
  if (address.value != "") {
    labelCity.classList.add("stayActive");
  } else {
    labelCity.classList.remove("stayActive");
  }

  if (latitude.value != "" || longitude.value != "") {
    labelCoords.classList.add("stayActive");
  } else {
    labelCoords.classList.remove("stayActive");
  }
}; //make labels stay visible above the inputs for ADDRESS and COORDS

function removeInputHeaders() {
  labelCity.classList.remove("stayActive");
  labelCoords.classList.remove("stayActive");
}; //remove input labels just after user click "search" or enter

address.addEventListener("click", stayActive);
address.addEventListener("keyup", stayActive);
latitude.addEventListener("click", stayActive);
latitude.addEventListener("keyup", stayActive);
longitude.addEventListener("click", stayActive);
longitude.addEventListener("keyup", stayActive);
coordsBtn.addEventListener("click", stayActive);
//event listeners for labels

function drop() {
  detailsZone.classList.toggle("resizeDropdown")
  coordsInfo.classList.toggle("visible")
}; //function adds class for dropdown

moreInfo.addEventListener('click', drop);

function warningTextAnimation() {
  warningText.animate([{
      opacity: 0
    },
    {
      opacity: 1
    }
  ], {
    duration: 400,
    iterations: 1
  });
}; //function for animate warning text in case of incorrect name of city/coords input

function geolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);

    function showPosition(position) {
      lat = position.coords.latitude;
      long = position.coords.longitude; // app takes latitude and long from navi geolocation
      getGeolocationCoords(lat, long); // callback to function that find city by coords
    };
  } else {
    alert('Geolocation is not supported by this browser.');
  }
}; //geolocation function

const getGeolocationCoords = (lat, long) => {
  urlGeolocation = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}${apiKey}${units}`; //api for coords

  axios.get(urlGeolocation)
    .then(res => {
      let userCoordsCity = res.data.name;
      coordsCity = userCoordsCity; // function takes city name from api to pass it to next function
      getWeather(); // call back to 
    })
    .catch(errorCatch); //catch if bad gateaway
  removeInputHeaders();
}; //function for finding city for user's geolocation navi

const getWeatherCoords = () => {

  lat = latitude.value;
  long = longitude.value;
  //coords from inputs
  urlCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}${apiKey}${units}`
  //api for coords

  axios.get(urlCoords)
    .then(res3 => {
      let inputCoordsCity = res3.data.name;
      coordsCity = inputCoordsCity;
      getWeather(); //callback to main function with details
    })
    .catch(errorCatch);
  removeInputHeaders();
}; //function for finding city by input coords

const getWeather = () => {
  animationFadeIn();
  city = 'Warszawa'; //in case if conditions are not met
  if (latitude.value == "" && longitude.value == "" && address.value != "") {
    city = address.value;
  } else if (latitude.value == "" && longitude.value == "" && coordsCity != "" && coordsCity != undefined) {
    city = coordsCity;
  } else if (address.value == "" && latitude.value != "" && longitude.value != "") {
    city = coordsCity;
  }

  urlWeather = apiLink + city + apiKey + units;
  //api for city finder

  axios.get(urlWeather)

    .then(res => {

      const name = res.data.name;
      const temp = res.data.main.temp;
      const timezone = res.data.timezone;
      const temperature = res.data.main.temp;
      const weather = Object.assign({}, ...res.data.weather);
      const pressure = res.data.main.pressure;
      const humidity = res.data.main.humidity;
      const wind = res.data.wind.speed;
      const lon = res.data.coord.lon;
      const lat = res.data.coord.lat;
      //details about city/weather from api
      console.log(res); // for res check


      addressValue.textContent = name;
      temperatureValue.textContent = temperature.toFixed() + '°C';

      // timezone converter
      let timezoneList = [
        -43200,
        -39600,
        -36000,
        -34200,
        -32400,
        -28800,
        -25200,
        -21600,
        -18000,
        -16200,
        -14400,
        -12600,
        -10800,
        -7200,
        -3600,
        0,
        3600,
        7200,
        10800,
        12600,
        14400,
        16200,
        18000,
        19800,
        20700,
        21600,
        23400,
        25200,
        28800,
        32400,
        34200,
        36000,
        37800,
        39600,
        41400,
        43200,
        45900,
        46800,
        50400,
      ];
      //timezone list

      let utcList = [
        "-12:00",
        "-11:00",
        "-10:00",
        "-9:30",
        "-09:00",
        "-08:00",
        "-07:00",
        "-06:00",
        "-05:00",
        "-12:00",
        "-04:00",
        "-12:00",
        "-03:00",
        "-02:00",
        "-01:00",
        "0",
        "+01:00",
        "+02:00",
        "+03:00",
        "+03:30",
        "+04:00",
        "+04:30",
        "+05:00",
        "+05:30",
        "+05:45",
        "+06:00",
        "+06:30",
        "+07:00",
        "+08:00",
        "+09:00",
        "+09:30",
        "+10:00",
        "+10:30",
        "+11:00",
        "+11:30",
        "+12:00",
        "+12:45",
        "+13:00",
        "+14:00",
      ];
      // utc list

      for (let x = 0; x < timezoneList.length; x++) {
        if (timezone === timezoneList[x]) {
          timezoneValue.textContent = `UTC ${utcList[x]}`
        }
      }
      //loop for each utc/timezone list

      pressureValue.textContent = pressure + ' hPa';
      humidityValue.textContent = humidity + '%';
      windValue.textContent = Math.round((((wind * 3600) / 1000)) * 100) / 100 + ' km/s';
      latitudeValue.textContent = lat;
      longitudeValue.textContent = lon;
      //details

      // weather.id = 500; // for weather icon check

      if (weather.id === 800) {
        weatherIcon.setAttribute('src', '../WeatherApp_v1/imgs/icons/sun.png')
        heroImg.className = 'hero-img bgSun';
      } else if (weather.id >= 200 && weather.id < 300) {
        weatherIcon.setAttribute('src', '../WeatherApp_v1/weatherapp/zasoby/WeatherApp grafiki/thunderstorm.png')
        heroImg.className = 'hero-img bgThunderstorm';
      } else if (weather.id >= 300 && weather.id < 400) {
        weatherIcon.setAttribute('src', '../WeatherApp_v1/imgs/icons/drizzle.png')
        heroImg.className = "hero-img bgDrizzle";
      } else if (weather.id >= 500 && weather.id < 600) {
        weatherIcon.setAttribute('src', '../WeatherApp_v1/imgs/icons/rain.png')
        heroImg.className = "hero-img bgRain";
      } else if (weather.id >= 600 && weather.id < 700) {
        weatherIcon.setAttribute('src', '../WeatherApp_v1/imgs/icons/snow.png')
        heroImg.className = "hero-img bgSnow";
      } else if (weather.id >= 801 && weather.id < 805) {
        weatherIcon.setAttribute('src', '../WeatherApp_v1/imgs/icons/cloud.png')
        heroImg.className = "hero-img bgClouds";
      } else if (weather.id === 741) {
        weatherIcon.setAttribute('src', '../WeatherApp_v1/imgs/icons/fog.png')
        heroImg.className = "hero-img bgFog";
      } else {
        weatherIcon.setAttribute('src', '../WeatherApp_v1/imgs/icons/unknown.png')
        heroImg.className = "hero-img bgClouds";
      };

      warningText.classList.remove("visible")

    })
    .catch(errorCatch)
}; //main function for finding city and weather details

function errorCatch() {
  address.value = "";
  longitude.value = "";
  latitude.value = "";
  warningText.classList.add("visible");
  warningTextAnimation();
  warningValue.textContent = "Type CORRECT city name or coords!"
  addressValue.textContent = '-';
  temperatureValue.textContent = '-';
  weatherIcon.setAttribute('src', '../WeatherApp_v1/imgs/icons/unknown.png')
  timezoneValue.textContent = `UTC -`
  latitudeValue.textContent = '-';
  longitudeValue.textContent = '-';
  pressureValue.textContent = '- hPa';
  humidityValue.textContent = '- %';
  windValue.textContent = '- km/s';
}; // function for error if api does not work (error)

function emptyFieldsCity() {

  if (address.value == "") {
    warningValue.textContent = "City field is EMPTY!";
    warningText.classList.add("visible");
    warningTextAnimation();
  } else {
    longitude.value = "";
    latitude.value = "";
    getWeather();
    address.value = "";
    removeInputHeaders()
  }
}; //function in case of empty city input

function emptyFieldsCoords() {

  if (latitude.value == "" && longitude.value == "") {
    warningValue.textContent = "Coord field is EMPTY!";
    warningText.classList.add("visible");
    warningTextAnimation();
  } else {
    address.value = "";
    getWeatherCoords();
    longitude.value = "";
    latitude.value = "";
    removeInputHeaders()
  }
}; //function in case of empty coords input

function enterCheckCoords() {
  if (event.keyCode === 13) {
    emptyFieldsCoords();
    longitude.blur();
    latitude.blur();
  }
}; //function for enter search for coords

function enterCheckCity() {
  if (event.keyCode === 13) {
    emptyFieldsCity();
    address.blur();
  }
}; //function for enter search for city

function animationFadeIn() {
  addressValue.className = "addressValue"
  temperatureValue.className = "temperatureValue";
  weatherIcon.className = 'weatherIcon'
  timezoneValue.className = "timezoneValue"
  latitudeValue.className = 'latitudeValue';
  longitudeValue.className = 'longitudeValue';
  pressureValue.className = 'pressureValue';
  humidityValue.className = 'humidityValue';
  windValue.className = 'windValue';
  window.requestAnimationFrame(function () {
    window.requestAnimationFrame(function () {
      addressValue.className = "addressValue fadeIn";
      temperatureValue.className = "temperatureValue fadeIn";
      weatherIcon.className = 'weatherIcon fadeIn'
      timezoneValue.className = "timezoneValue fadeIn"
      latitudeValue.className = 'latitudeValue fadeIn';
      longitudeValue.className = 'longitudeValue fadeIn';
      pressureValue.className = 'pressureValue fadeIn';
      humidityValue.className = 'humidityValue fadeIn';
      windValue.className = 'windValue fadeIn';
    });
  });
}; //animation for details

geolocation();
getWeather();

//event listeners
addressBtn.addEventListener('click', emptyFieldsCity)
address.addEventListener('keyup', enterCheckCity)
coordsBtn.addEventListener('click', emptyFieldsCoords)
latitude.addEventListener('keyup', enterCheckCoords)
longitude.addEventListener('keyup', enterCheckCoords)