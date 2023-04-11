console.log("Weer App is running...");

const details = document.querySelector(".details");

console.log("fetch is running...");

window.addEventListener("load", function () {
	console.log("loaded");

	fetch(
		"https://api.open-meteo.com/v1/forecast?latitude=51.92&longitude=4.48&hourly=temperature_2m,rain"
	)
		.then((resp) => resp.json())
		.then((data) => {
			// details.textContent = data;
			console.log(data);

			Object.keys(data).forEach((e) => {
				console.log(`key=${e}  value=${data[e]}`);
				details.innerHTML += `<p>key=${e}  value=${data[e]}</p>`;
			});
		});
});
