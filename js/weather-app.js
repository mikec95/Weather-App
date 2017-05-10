/**
 *This script will decide if location services are turned on device.
 *Get the latitude and longitude 
 *Then use latitude and longitude to create .json object from wunderground api
 *Then decide the current weather of that location by reading .json object
 *also shows specific greeting based on time of day
 **/

//determine if location services are enabled
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(function(position) {

    //define variables used to create latitude and longitude 
    var latitude = position.coords.latitude;
    var longitude = position.coords.longitude;

    //once coordinates are defined, use them to create the .json object. Along with api key, save as a url.
    var url = "";
    var apiKey = 'ac3823203594e25d';
    url = "http://api.wunderground.com/api/" + apiKey + "/conditions/forecast/alert/q/" + latitude + "," + longitude + ".json";

    //use url to get json object
    $.getJSON(url, function(weatherObject) {
      //define variables that will be found in object
      var city;
      var state;
      var zip;
      var temp_f;
      var temp_c;
      var icon;
      var locationTime;

      //turn found data in json object into strings, and round temps to nearest whole number
      city = JSON.stringify(weatherObject.current_observation.display_location.city);
      city = city.replace(/['"]+/g, '');
      state = JSON.stringify(weatherObject.current_observation.display_location.state);
      state = state.replace(/['"]+/g, '');
      zip = JSON.stringify(weatherObject.current_observation.display_location.zip);
      zip = zip.replace(/['"]+/g, '');
      temp_f = JSON.stringify(weatherObject.current_observation.temp_f);
      temp_f = parseInt(temp_f, 10);
      temp_c = JSON.stringify(weatherObject.current_observation.temp_c);
      temp_c = parseInt(temp_c, 10);
      icon = JSON.stringify(weatherObject.current_observation.icon);
      icon = icon.replace(/['"]+/g, '');
      locationTime = JSON.stringify(weatherObject.current_observation.local_time_rfc822);
      locationTime = locationTime.replace(/['"]+/g, '');
      locationTime = locationTime.replace("-0400", "");

      //show specific greeting and background based on time of day and weather
      var date = new Date();
      var hours = date.getHours();
      var clearDawn = Boolean(icon === "clear" && hours < 6);
      var clearMorning = Boolean(icon === "clear" && hours < 12);
      var clearAfternoon = Boolean(icon === "clear" && hours < 14);
      var clearNight = Boolean(icon === "clear" && hours < 24);
      var partlycloudyDawn = Boolean(icon === "partlycloudy" && hours < 6);
      var partlycloudyMorning = Boolean(icon === "partlycloudy" && hours < 12);
      var partlycloudyAfternoon = Boolean(icon === "partlycloudy" && hours < 14);
      var partlycloudyNight = Boolean(icon === "partlycloudy" && hours < 24);
      var rainyDawn = Boolean(icon === "rain" && hours < 6);
      var rainyMorning = Boolean(icon === "rain" && hours < 12);
      var rainyAfternoon = Boolean(icon === "rain" && hours < 14);
      var rainyNight = Boolean(icon === "rain" && hours < 24);
      switch (true) {
        case (clearDawn):
          $("#title").html("Good Morning!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/clear-night.jpg)');
          break;
        case (clearMorning):
          $("#title").html("Good Morning!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/clear-morning.jpg)');
          break;
        case (clearAfternoon):
          $("#title").html("Good Afternoon!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/clear-afternoon.jpg)');
          break;
        case (clearNight):
          $("#title").html("Good Evening!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/clear-night.jpg)');
          break;
        case (partlycloudyDawn):
          $("#title").html("Good Morning!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/partlycloudy-night.jpg)');
          break;
        case (partlycloudyMorning):
          $("#title").html("Good Morning!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/partlycloudy-morning.jpg)');
          break;
        case (partlycloudyAfternoon):
          $("#title").html("Good Afternoon!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/partlycloudy-afternoon.jpg)');
          break;
        case (partlycloudyNight):
          $("#title").html("Good Evening!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/partlycloudy-night.jpg)');
          break;
        case (rainyDawn):
          $("#title").html("Good Morning!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/rainy-night.jpg)');
          break;
        case (rainyMorning):
          $("#title").html("Good Morning!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/rainy-morning.jpg)');
          break;
        case (rainyAfternoon):
          $("#title").html("Good Afternoon!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/rainy-afternoon.jpg)');
          break;
        case (rainyNight):
          $("#title").html("Good Evening!");
          $(".weather-app-container").css('background-image', 'url(images/jpg/rainy-night.jpg)');
          break;
        default:
          $("#title").html("Welcome!");
          $(".weather-app-container").css('background-color', 'black');
      }

      //output location and temperature with ability to switch between Farenheit and Celsius 
      $("#location").html(city + ", " + state + " " + zip);
      $("#temp-link").html(temp_f + "&degF");
      var tempClicked = false;
      $("#temp-link").on('click', function() {
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