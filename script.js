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
      var forecast = data.list;
      $.each(forecast, function(index, item) {
        var card = $("<div>").addClass("forecast-card");
        var date = $("<p>").text(item.dt_txt);
        var temperature = $("<p>").text(data.list[0].main.temp);
        var windSpeed = $("<p>").text(data.list[0].wind.speed);
        var humidity = $("<p>").text(data.list[0].main.humidity);
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + item.weather[0].icon + ".png");
        card.append(date, temperature, windSpeed, humidity, icon);
        $("#forecast-cards-container").append(card);
    });
    }
  })
};
