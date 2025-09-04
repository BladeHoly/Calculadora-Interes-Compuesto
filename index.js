document.addEventListener("DOMContentLoaded", function () {
	const form = document.querySelector("form");
	console.log("DOM Cargado");
	form.addEventListener("submit", function (e) {
		e.preventDefault();
		console.log("Botón Presionado");

		let capital = parseFloat(document.getElementById("capital").value);
		let tasa = parseFloat(document.getElementById("tasa").value) / 100;
		let plazo = parseInt(document.getElementById("plazo").value);
		let cobros = parseInt(document.getElementById("cobros").value);

		if (isNaN(capital) || isNaN(tasa) || isNaN(plazo) || isNaN(cobros)) {
			alert("Por favor, ingresa valores numéricos válidos.");
			return;
		}

		if (capital <= 0 || tasa <= 0 || plazo <= 0 || cobros <= 0) {
			alert("Por favor, ingresa valores positivos.");
			return;
		}

		const resultado = capital * Math.pow(1 + tasa / cobros, cobros * plazo);

		document.getElementById("resultado").textContent =
			"El monto total es: $" +
			resultado.toLocaleString("es-UY", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});
	});
});

const numberInputs = document.querySelectorAll('input[type="number"]');
numberInputs.forEach(function (input) {
	input.addEventListener("wheel", function (e) {
		if (document.activeElement !== input) return;

		let newValue;
		if (input.id === "capital") {
			const value = parseFloat(input.value) || 0;
			if (e.deltaY < 0) {
				newValue = value + 100;
			} else {
				newValue = value - 100;
			}
			if (newValue < 0) newValue = 0;
			input.value = newValue;
			input.dispatchEvent(new Event("change"));
			input.dispatchEvent(new Event("input"));
			e.preventDefault();
		} else {
			const step = parseFloat(input.step) || 1;
			const value = parseFloat(input.value) || 0;
			if (e.deltaY < 0) {
				newValue = value + step;
			} else {
				newValue = value - step;
			}
			if (newValue < 0) newValue = 0;
			input.value = newValue;
			input.dispatchEvent(new Event("change"));
			input.dispatchEvent(new Event("input"));
			e.preventDefault();
		}
	});
});
