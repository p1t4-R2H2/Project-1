var baseUrl = 'http://api.openweathermap.org/data/2.5/onecall?q=';
var city = 'Chicago';
var units = '&units=imperial'
var apiKey = '&appid=02cedeff9fdb90cdda23271a5a1168a1';
var apiUrl = baseUrl + city + units + apiKey
var apiCall = function() {
    console.log(apiUrl)
    fetch(apiUrl)
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('error' + response.status);
                    return;
                }

                response.json().then(function (data) {
                    console.log(data);
                });
            }
        )
        .catch(function(err) {
            console.log('fetch errer :-s', err );
        })
}

apiCall()