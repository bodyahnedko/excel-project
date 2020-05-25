const CODES = {
	A: 65,
	Z: 90
};

function createRow(cols, index = '') {
	const resizer = index ? `<div class="row-resize" data-resize="row"></div>` : '';
	return `
		<div class="row js-resizer-wrap">
			<div class="row-info">
				${index}
				${resizer}
			</div>
			<div class="row-data js-row">${cols}</div>
		</div>
	`;
}

function createCol(char, index) {
	return `
		<div class="column js-resizer-wrap" data-index="${index}">
			${char}
			<div class="col-resize" data-resize="col"></div>
		</div>
	`;
}

function createCell(_, index) {
	return `
		<div class="cell js-cell" contenteditable data-index="${index}"></div>
	`;
}

function toChar(_, index) {
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

	for (let i = 0; i < rowCount; i++) {
		rows.push(createRow(cels, i + 1));
	}

	return rows.join('');
}
