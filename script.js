//Get search bar element
var searchBar = $("#search-button");
//Attach event listener
searchBar.on("click", function (event) {
  //Prevent default submit   
  event.preventDefault();
  //Get city user has entered 
  var city = $("#search-input").val();

  console.log(city);
  // Call function to get weather forecast
  getWeatherForecast(city);
});

function getWeatherForecast(city) {
  var apiKey = '82f437452e5dddfbf7e6a3e2035bb00a';
  var url = 'https://api.openweathermap.org/data/2.5/forecast?q=' + city + '&appid=' + apiKey;
  
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
      displayTodayForecast(data.list[0]);
      var forecast = data.list.filter(function(forecast){
        return forecast.dt_txt.includes("15:00:00")});
      $.each(forecast, function(index, item) {
        var celcius = item.main.temp - 273.15;
        var card = $("<div>").addClass("forecast-card");
        var date = $("<p>").text(item.dt_txt);
        var temperature = $("<p>").text(celcius.toFixed(2) + "°C");
        var windSpeed = $("<p>").text(item.wind.speed);
        var humidity = $("<p>").text(item.main.humidity);
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png");
        var cityName = $("<h3>").text(city);
        card.append( cityName,date, temperature, windSpeed, humidity, icon);
        $("#forecast-cards-container").append(card);
    });
    }
  })
  };
  
  

  function displayTodayForecast(forecast) {
    var tempCelsius = (forecast.main.temp - 273.15).toFixed(2);
    $("#today-temp").text(tempCelsius);
    $("#today-humidity").text(forecast.main.humidity);
    $("#today-wind-speed").text(forecast.wind.speed);
    $("#today-description").text(forecast.weather[0].description);
    var iconUrl = "http://openweathermap.org/img/w/" + forecast.weather[0].icon + ".png";
    var icon = $("<img>").attr("src", iconUrl);
    $("#today-forecast").append(icon);
  }
  