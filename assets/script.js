console.log('Script attached');
var searchTerm = document.querySelector('#destinationCity');
var originTerm = document.querySelector('#originCity');
var departInput = document.querySelector('#departInput');
var returnInput = document.querySelector('#returnInput');
var flightContTitle = document.querySelector('#flightContTitle')
var weatherCard = document.querySelector('#weather-card');
var flightCard = document.querySelector('#flight-card');
var submitButton = document.querySelector('#searchButton');
var homeBtn = document.querySelector('#homeBtn');
var abtBtn = document.querySelector('#abtBtn');
var resetButton = document.querySelector('#resetButton');

if(localStorage.getItem('originCity')){
	originTerm.value = localStorage.getItem('originCity');
}

var getWeather = function(){
	var baseUrl = 'https://api.openweathermap.org/data/2.5/weather?q=';
	var searchTerm = document.querySelector('#destinationCity');
	var city = searchTerm.value;
	var units = '&units=imperial';
	var APIKey = '&appid=e1a4a8808d7f6de7333f8ac6e7ef2b5d';
	//var kyleApi = '&appid=6b7fe706f688707864f72240c14f1202';
	var apiUrl= baseUrl + city + units + APIKey;
console.log(apiUrl);
	//var submitButton = document.querySelector('#submit');
	
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
		  var title = 'The weather in ' + city + ':';
          var temperature = data.main.temp;
          var humidity = data.main.humidity;
          var wind = data.wind.speed;
          console.log('Temp: ' + data.main.temp);
          console.log('Humidity: ' + data.main.humidity + '%')
          console.log('Wind: ' + wind + 'MPH');
		  var createWeatherCard = document.createElement('div');
			var titleItem = document.createElement('div')
			var tempItem = document.createElement('div');
			var humidityItem = document.createElement('div');
			var windItem = document.createElement('div');
			weatherCard.classList.add('card',);
			createWeatherCard.classList.add('card-content', 'is-flex', 'is-justify-content-space-evenly');
			titleItem.textContent = title;
			titleItem.classList.add('content', 'title', 'is-3')
			tempItem.textContent = 'Temp: ' + temperature;
			tempItem.classList.add('content', 'title', 'is-3')
			humidityItem.textContent = 'Humidity: ' + humidity;
			humidityItem.classList.add('content', 'title', 'is-3')
			windItem.textContent  = 'Wind: ' + wind + 'MPH';
			windItem.classList.add('content', 'title', 'is-3');

			createWeatherCard.appendChild(titleItem);
			createWeatherCard.appendChild(tempItem);
			createWeatherCard.appendChild(humidityItem);
			createWeatherCard.appendChild(windItem);
			weatherCard.appendChild(createWeatherCard);
        });
      }
    )
    .catch(function(err) {
      console.log('Fetch Error :-S', err);
    });

}

var getOriginCode = function (){
	var originCity = originTerm.value;
	fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" + originCity, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fe7e261dbbmsha5f51ac86d4be32p17f2fcjsnd0f6bd472077",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(
	function(response){
		if (response.status!==200){
			console.log('Looks like there was a problem. Status Code: ' + response.status);
			return;
		}

		response.json().then(function(data){
			console.log(data)
			//console.log(data.Places[0].PlaceId);
			var originCode = data.Places[0].PlaceId;
			console.log(originCode);
			getSkyPlaces(originCode)
		});
	}
)
.catch(function(err){
	console.log('Fetch Error :-S', err);
});
}

var getSkyPlaces = function (originCodeRec){
	var city = searchTerm.value;
	var originTermRec = originCodeRec;
	fetch("https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/autosuggest/v1.0/US/USD/en-US/?query=" + city, {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "fe7e261dbbmsha5f51ac86d4be32p17f2fcjsnd0f6bd472077",
		"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(
	function(response){
		if (response.status!==200){
			console.log('Looks like there was a problem. Status Code: ' + response.status);
			return;
		}

		response.json().then(function(data){
			console.log(data)
			console.log(data.Places[0].PlaceId);
			var cityCode = data.Places[0].PlaceId;
			console.log(cityCode);
			getSkyPrices(cityCode, originCodeRec)
		});
	}
)
.catch(function(err){
	console.log('Fetch Error :-S', err);
});
}



var getSkyPrices = function(cityCodeRec, originCodeRec){
	var skyBaseUrl = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices/browseroutes/v1.0/US/USD/en-US/";
	var departureDate = '/' + departInput.value;
	//console.log(departureDate);
	//var returnDate = returnInput.value;
	//console.log(returnDate);
	var skyApiUrl = skyBaseUrl + originCodeRec + '/' + cityCodeRec + + '/' + departureDate;



	fetch(skyApiUrl, {
		"method": "GET",
		"headers": {
			"x-rapidapi-key": "fe7e261dbbmsha5f51ac86d4be32p17f2fcjsnd0f6bd472077",
			"x-rapidapi-host": "skyscanner-skyscanner-flight-search-v1.p.rapidapi.com"
	}
})
.then(
	function(response){
		if (response.status!==200){
			console.log('Looks like there was a problem. Status Code: ' + response.status);
			return;
		}

		response.json().then(function(data){
			console.log(data);
		for (var i=0; i < data.Quotes.length; i++){
			console.log(i);
			console.log(data.Quotes[i]);
			var quote = data.Quotes[i];
			var carriersArray = data.Carriers;
			console.log(data.Carriers);
			console.log(data.Quotes.length);
			var carrier;
			for (var x = 0; x < carriersArray.length; x ++) {
				// console.log(carrier)
				if (quote.OutboundLeg.CarrierIds[0] == carriersArray[x].CarrierId) {
					carrier = carriersArray[x].Name;
				}
			}
			console.log(carrier);
			var direct;
			if(quote.Direct===true){
				direct = 'Direct Flight';
			}
			else{
				direct = 'Indirect Flight';
			}
			console.log(direct);
			var price = 'Price: $' + quote.MinPrice;
			console.log('Price: $' + price);
			console.log('Airline ' + carrier)
			//document.querySelector('#flight-card').innerHTML = carrier + ' ' + ' Price: $' +   price + ' ' +  direct;

			var createFlightCard = document.createElement('div');
			var carrierItem = document.createElement('div');
			var priceItem = document.createElement('div');
			var directItem = document.createElement('div');
			flightCard.classList.add('tile', 'is-parent', 'is-12', 'is-flex', 'is-flex-wrap-wrap', 'is-justify-content-space-evenly');
			createFlightCard.classList.add('tile', 'is-child', 'box', 'is-3', 'has-background-primary-light');
			
			carrierItem.classList.add('content', 'is-size-4', 'has-text-primary-dark');

			
			carrierItem.textContent = 'Airline: ' +  carrier;

			priceItem.textContent = price;
			priceItem.classList.add('content', 'is-size-5', 'has-text-primary-dark');
			directItem.textContent  = direct;

			directItem.classList.add('content', 'is-size-4', 'has-text-primary-dark');


			createFlightCard.appendChild(carrierItem);
			createFlightCard.appendChild(priceItem);
			createFlightCard.appendChild(directItem);
			flightCard.appendChild(createFlightCard);

			
		}
		
		});
	}
)
.catch(function(err){
	console.log('Fetch Error :-S', err);
});
}

//getSkyPrices();


var searchButtonHandler = function(event){
    event.preventDefault();
    console.log('Button clicked!');
	weatherCard.innerHTML = '';
	flightCard.innerHTML = '';
    
    if(searchTerm.value && originTerm.value){
        console.log(searchTerm.value);
		//getSkyPlaces();
		localStorage.setItem('originCity', originTerm.value);

		flightContTitle.innerHTML='Flights to ' + searchTerm.value;

		getWeather();
		getOriginCode();
    }
    else{
        console.log('Please enter search term')
    }
}

// var resetButtonHandler = function(event){
// 	event.preventDefault();
// 	console.log('Reset button clicked!');
// 	weatherCard.innerHTML = '';
// 	flightCard.innerHTML = '';
// }

submitButton.addEventListener('click', searchButtonHandler);
// resetButton.addEventListener('click', resetButtonHandler);

// const carriers = [
// 	{id: 1, name: "Spirit",
// }, 
// {
// 	id: 2, name: "Delta"
// }, 
// {id:3, 
// 	name: "American"
// }
// ];

// const myId = 2;

// const findAirlineById = (id) => {
// 	for (let i = 0; i < carriers.length; i++) {
// 		if (carriers[i].id === id) {
// 			console.log(carriers[i].name)
// 			return carriers[i].name
// 		}
// 	}
// };

// findAirlineById(myId);
