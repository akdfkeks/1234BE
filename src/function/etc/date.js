import date from "date-and-time";

export function getYearMonth() {
	const now = new Date();
	const pattern = date.compile("YYYYMM");
	const yearMonth = date.format(now, pattern);
	// 202206
	return parseInt(yearMonth);
}
export function getYearToMin() {
	const now = new Date();
	const pattern = date.compile("YYYYMMDD-HHmm");
	const yearToMin = date.format(now, pattern);
	// 20220615-1735
	return yearToMin;
}

export function parseYearMonthFromInput(inputDate) {
	// 20220615-1735
	let target = inputDate.split("-")[0].slice(0, 6);
	return parseInt(target);
}

export function parseDatefromInput(inputDate) {
	const date = new Date("2022-06-28T21:20Z");
}

function parseDate(inputDate, format) {
	let post = format[0];
	for (char in format) {
		let t = char;
	}
}
export function parseISODateFromInput(inputDate, format) {
	// Specify characters to remove
	const schar = /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/gi;
	const input = inputDate.replaceAll(schar, "");
	const newformat = format.replaceAll(schar, "");
	const TIMEZONE = "Z";

	// Convert String to Array
	let data = newformat.split("");

	// Add variable to distinguish format
	let post = data[0];
	let indexarr = [];

	// Parsing the format and save it to Array
	for (let index = 0; index < data.length; index++) {
		if (post != data[index]) {
			indexarr.push(index);
		}
		post = data[index];
	}

	let middle = [];
	middle.push(input.slice(0, indexarr[0]));
	for (let i = 0; i < indexarr.length; i++) {
		middle.push(input.slice(indexarr[i], indexarr[i + 1]));
	}

	// Convert to a format that can be converted to ISO Datetime
	let output = `${middle[0]}-${middle[1]}-${middle[2]}T${middle[3]}:${middle[4]}`;
	return new Date(output + TIMEZONE);
}
