console.log("Weer App is running...");
// source: https://open-meteo.com/

console.log("fetch is running...");

let currentCity = "";

window.addEventListener("load", function () {
	console.log("loaded");

	// getLocation();
	// getGeoLocationFromCity("Casablanca");
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

	details.innerHTML = `<p>${currentCity}</p>`;
	details.innerHTML += `<div><span class="left">Temperature</span><span class="right">${weather.temperature} °C</span></div>`;
	details.innerHTML += `<div><span class="left">Time</span><span class="right">${weather.time}</span></div>`;
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

const cityInput = document.querySelector("#city");
cityInput.addEventListener("keyup", (e) => {
	if (e.keyCode === 13) {
		const city = cityInput.value;
		currentCity = city;
		getGeoLocationFromCity(city);
		cityInput.value = "";
	}
});
