/**
 *This script will decide if location services are turned on device.
 *Get the latitude and longitude
 *Then use latitude and longitude to create .json object from wunderground api
 *Then decide the current weather of that location by reading .json object
 *also shows specific greeting based on time of day
 **/

const apiKey = config.API_KEY;
const url = `api.openweathermap.org/`;

//determine if location services are enabled
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function (position) {
    //define variables used to create latitude and longitude
    var lat = position.coords.latitude;
    var lon = position.coords.longitude;

    // Concatenate latitude, longitude, and api key to weather api url.
    url = `data/2.5/${url}weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

    //use url to get json object
    $.getJSON(url, function (weatherObject) {
      let location = [];
      //define variables that will be found in object
      var city;
      var state;
      var zip;
      var temp_f;
      var temp_c;
      var icon;
      var locationTime;

      //turn found data in json object into strings, and round temps to nearest whole number
      city = JSON.stringify(
        weatherObject.current_observation.display_location.city
      );
      city = city.replace(/['"]+/g, "");
      state = JSON.stringify(
        weatherObject.current_observation.display_location.state
      );
      state = state.replace(/['"]+/g, "");
      zip = JSON.stringify(
        weatherObject.current_observation.display_location.zip
      );
      zip = zip.replace(/['"]+/g, "");
      temp_f = JSON.stringify(weatherObject.current_observation.temp_f);
      temp_f = parseInt(temp_f, 10);
      temp_c = JSON.stringify(weatherObject.current_observation.temp_c);
      temp_c = parseInt(temp_c, 10);
      icon = JSON.stringify(weatherObject.current_observation.icon);
      icon = icon.replace(/['"]+/g, "");
      locationTime = JSON.stringify(
        weatherObject.current_observation.local_time_rfc822
      );
      locationTime = locationTime.replace(/['"]+/g, "");
      locationTime = locationTime.replace("-0400", "");

      //show specific background based on weather
      var clear = Boolean(icon === "clear");
      var nt_clear = Boolean(icon === "nt_clear");
      var rain = Boolean(icon === "rain");
      var nt_rain = Boolean(icon === "nt_rain");
      var snow = Boolean(icon === "snow");
      var nt_snow = Boolean(icon === "nt_snow");
      var partlycloudy = Boolean(icon === "partlycloudy");
      var nt_partlycloudy = Boolean(icon === "nt_partlycloudy");
      switch (true) {
        case clear:
          $(".weather-app-container").css(
            "background-image",
            "url(images/jpg/clear.jpg)"
          );
          break;
        case nt_clear:
          $(".weather-app-container").css(
            "background-image",
            "url(images/jpg/nt_clear.jpg)"
          );
          break;
        case rain:
          $(".weather-app-container").css(
            "background-image",
            "url(images/jpg/rain-day.jpg)"
          );
          break;
        case nt_rain:
          $(".weather-app-container").css(
            "background-image",
            "url(images/jpg/nt_rain.jpg)"
          );
          break;
        case snow:
          $(".weather-app-container").css(
            "background-image",
            "url(images/jpg/snow.jpg)"
          );
          break;
        case nt_snow:
          $(".weather-app-container").css(
            "background-image",
            "url(images/jpg/nt_snow.jpg)"
          );
          break;
        case partlycloudy:
          $(".weather-app-container").css(
            "background-image",
            "url(images/jpg/partlycloudy.jpg)"
          );
          break;
        case nt_partlycloudy:
          $(".weather-app-container").css(
            "background-image",
            "url(images/jpg/nt_partlycloudy.jpg)"
          );
          break;
        default:
          $(".weather-app-container").css("background-color", "black");
      }

      //set title based on time of day
      var day = new Date();
      var hours = day.getHours();
      var morning = Boolean(hours < 12);
      var afternoon = Boolean(hours < 16);
      var night = Boolean(hours < 24);
      switch (true) {
        case morning:
          $("#title").html("Good Morning!");
          break;
        case afternoon:
          $("#title").html("Good Afternoon!");
          break;
        case night:
          $("#title").html("Good Evening!");
          break;
        default:
          $("#title").html("Welcome!");
      }

      //output location and temperature with ability to switch between Farenheit and Celsius
      $("#location").html(city + ", " + state + " " + zip);
      $("#temp-link").html(temp_f + "&degF");
      var tempClicked = false;
      $("#temp-link").on("click", function () {
        if (tempClicked) {
          tempClicked = false;
          $("#temp-link").html(temp_f + "&degF");
        } else {
          tempClicked = true;
          $("#temp-link").html(temp_c + "&degC");
        }
      });

      $("#date-time").html(locationTime);
    });
  });
}
