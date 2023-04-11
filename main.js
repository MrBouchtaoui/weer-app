console.log("Weer App is running...");
// source: https://open-meteo.com/

console.log("fetch is running...");

window.addEventListener("load", function () {
	console.log("loaded");

	// getLocation();
	getGeoLocationFromCity("Casablanca");
});

function getWeatherData(lat, lon) {
	fetch(
		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=is_day&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset&current_weather=true&forecast_days=1&timezone=Europe%2FBerlin`
	)
		.then((resp) => resp.json())
		.then((data) => {
			console.log(data);

			handleWeather(data);
		});
}

function handleWeather(data) {
	const details = document.querySelector(".details");
	const weather = data.current_weather;
	console.log(weather);

	details.innerHTML += `<p>Temperature ${weather.temperature}`;
	details.innerHTML += `<p>Time ${weather.time}`;
	// details.innerHTML += `<p>Temperature ${weather.temperature}`;
}

// get visitor's location
function getLocation() {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(showPosition, handleError);
	} else {
		console.error("Geolocation is not supported by this browser.");
	}
}

// watch visitor's location
//   function watchLocation() {
// 	if (navigator.geolocation) {
// 	  navigator.geolocation.watchPosition(showPosition, handleError);
// 	} else {
// 	  console.error("Geolocation is not supported by this browser.");
// 	}
//   }

function handleError(error) {
	let errorStr;
	switch (error.code) {
		case error.PERMISSION_DENIED:
			errorStr = "User denied the request for Geolocation.";
			break;
		case error.POSITION_UNAVAILABLE:
			errorStr = "Location information is unavailable.";
			break;
		case error.TIMEOUT:
			errorStr = "The request to get user location timed out.";
			break;
		case error.UNKNOWN_ERROR:
			errorStr = "An unknown error occurred.";
			break;
		default:
			errorStr = "An unknown error occurred.";
	}
	console.error("Error occurred: " + errorStr);
}

function showPosition(position) {
	console.log(`Latitude: ${position.coords.latitude}, longitude: ${position.coords.longitude}`);

	getWeatherData(position.coords.latitude, position.coords.longitude);
}

function getGeoLocationFromCity(city) {
	fetch(`https://geocode.maps.co/search?q=${city}`)
		.then((resp) => resp.json())
		.then((data) => {
			console.log(data);

			const lat = data[0].lat;
			const lon = data[0].lon;

			getWeatherData(lat, lon);
		});
}
