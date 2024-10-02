/**
 * 
 * @param {any} value
 * @param {any} style
 * @param {any} language
 * @param {any} currency
 * @param {any} numberZero
 * @returns
 */
function NumberFormat(value, style, language, currency, numberZero) {
	var gasPrice = new Intl.NumberFormat(language, {
		style: style,
		currency: currency,
		minimumFractionDigits: numberZero
	});

	if (typeof value == "string") {
		return gasPrice.format(0);
	}
	return gasPrice.format(value);
}