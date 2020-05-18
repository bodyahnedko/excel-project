const CODES = {
	A: 65,
	Z: 90
};

function createRow(cols, rowNumber = '') {
	return `
		<div class="row">
			<div class="row-info">${rowNumber}</div>
			<div class="row-data">${cols}</div>
		</div>
	`;
}

function createCol(char) {
	return `
		<div class="column">${char}</div>
	`;
}

function createCell() {
	return `
		<div class="cell" contenteditable></div>
	`;
}

function toChar(el, index) {
	return String.fromCharCode(CODES.A + index);
}

export function createTable(rowCount = 15) {
	const colCount = CODES.Z - CODES.A + 1;
	const rows = [];

	const cols = Array(colCount)
		.fill('')
		.map(toChar)
		.map(createCol)
		.join('');

	const cels = Array(colCount)
		.fill('')
		.map(createCell)
		.join('');

	rows.push(createRow(cols));

	for (let i = 1; i <= rowCount; i++) {
		rows.push(createRow(cels, i));
	}

	return rows.join('');
}
