//Get search bar element
var searchBar = $("#search-button");
//Attach event listener
searchBar.on("click", function(event) {
//Prevent default submit   
event.preventDefault();
//Get city user has entered 
var city = searchBar.val();
// Call function to get weather forecast
getWeatherForcast(city);
});