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
		`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=sunrise,sunset,rain_sum,precipitation_probability_max&current_weather=true&forecast_days=1&timezone=Europe%2FBerlin`
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
	const daily = data.daily;
	console.log(weather);

	const temp = weather.temperature;
	const time = weather.time.replace("T", " ");
	const sunrise = daily.sunrise[0];
	const sunset = daily.sunset[0];
	const rain = daily.rain_sum[0];
	const rainProb = daily.precipitation_probability_max[0];

	details.innerHTML = `<p>${currentCity}</p>`;
	details.innerHTML += `<div><span class="left">Temperatuur</span><span class="right">${temp} °C <div class="wicon"><i class="wi wi-thermometer"></i></div></span></div>`;
	details.innerHTML += `<div><span class="left">Datum/tijd</span><span class="right">${time.replace(
		"T",
		" "
	)} <div class="wicon"><i class="wi wi-time-2"></i></div></span></div>`;
	details.innerHTML += `<div><span class="left">Zonsopgang</span><span class="right">${sunrise.replace(
		"T",
		" "
	)} <div class="wicon"><i class="wi wi-sunrise"></i></div></span></div>`;
	details.innerHTML += `<div><span class="left">Zonsondergang</span><span class="right">${sunset.replace(
		"T",
		" "
	)} <div class="wicon"><i class="wi wi-sunset"></i></div></span></div>`;
	details.innerHTML += `<div><span class="left">Regen</span><span class="right">${rain} mm <div class="wicon"><i class="wi wi-showers"></i></div></span></div>`;
	details.innerHTML += `<div><span class="left">Kans op regen</span><span class="right">${rainProb} % <div class="wicon"><i class="wi wi-humidity"></i></div></span></div>`;
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
