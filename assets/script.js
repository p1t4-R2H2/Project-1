fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/UK/GBP/en-GB/?query=Stockholm", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fe7e261dbbmsha5f51ac86d4be32p17f2fcjsnd0f6bd472077",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(response => {
	console.log(response);
})
.catch(err => {
	console.error(err);
});

console.log('Script attached');
var baseUrl = 'http://api.openweathermap.org/data/2.5/weather?q=';
var city = 'Chicago';
var units = '&units=imperial';
var APIKey = '&appid=e1a4a8808d7f6de7333f8ac6e7ef2b5d';
var apiUrl= baseUrl + city + units + APIKey;
console.log(apiUrl);
var submitButton = document.querySelector('#submitButton');
var searchTerm = document.querySelector('#searchTerm');

var searchButtonHandler = function(event){
    event.preventDefault();
    console.log('Button clicked!');
    
    if(searchTerm.value){
        console.log(searchTerm.value);
    }
    else{
        console.log('Please enter search term')
    }
}

submitButton.addEventListener('click', searchButtonHandler);


var getWeather = function(){
    fetch(apiUrl)
    .then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          var temperature = data.main.temp;
          var humidity = data.main.humidity;
          var wind = data.wind.speed;
          console.log('Temp: ' + data.main.temp);
          console.log('Humidity: ' + data.main.humidity + '%')
          console.log('Wind: ' + wind + 'MPH');
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

}

getWeather();