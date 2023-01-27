//Get search bar element
var searchBar = $("#search-button");
//Attach event listener
searchBar.on("click", function(event) {
//Prevent default submit   
event.preventDefault();
//Get city user has entered 
var city = searchBar.val();

console.log(city);
// Call function to get weather forecast
getWeatherForecast(city);
});

function getWeatherForecast(city) {
  var apiKey = '82f437452e5dddfbf7e6a3e2035bb00a';
  var url = 'https://api.openweathermap.org/data/2.5/forecast?q='+city+'&appid='+apiKey;
  $.ajax({
    url: url,
    type: 'GET',
    dataType: 'json',
    success: function(data) {
        // Do something with the data
        var temp = data.main.temp;
        var humidity = data.main.humidity;
        var windSpeed = data.wind.speed;
        var forecast = data.list;
        // update the HTML elements
        $("#temperature").text(temp);
        $("#humidity").text(humidity);
        $("#wind-speed").text(windSpeed);
        // loop through the forecast array and display the forecast
        for (var i = 0; i < forecast.length; i++) {
          var day = forecast[i];
          var date = new Date(day.dt * 1000);
          var temp = day.main.temp;
          $("#forecast").append("<li>" + date + " - " + temp + "</li>");
        }
      },
        // parse the data and display the forecast
  });
}
