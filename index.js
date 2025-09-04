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

const enhanceNumberInputs = () => {
	const numberInputs = document.querySelectorAll('input[type="number"]');

	numberInputs.forEach((input) => {
		input.addEventListener("wheel", handleWheelEvent, { passive: false });
	});

	function handleWheelEvent(event) {
		if (document.activeElement !== this) return;
		event.preventDefault();

		const input = this;
		const currentValue = parseFloat(input.value) || 0;
		const isScrollUp = event.deltaY < 0;
		let newValue;

		if (input.id === "capital") {
			const incrementAmount = 100;
			newValue = isScrollUp
				? currentValue + incrementAmount
				: Math.max(0, currentValue - incrementAmount);

			updateInputValue(input, newValue, false);
		} else {
			const step = parseFloat(input.step) || 1;
			newValue = isScrollUp ? currentValue + step : currentValue - step;
			newValue = Math.max(0, newValue);

			updateInputValue(input, newValue, true);
		}
	}

	function updateInputValue(input, value, triggerChangeEvent) {
		input.value = value;
		input.dispatchEvent(new Event("input"));
		if (triggerChangeEvent) {
			input.dispatchEvent(new Event("change"));
		}
	}
};

enhanceNumberInputs();
