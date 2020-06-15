import {range} from '../../core/utils';

export function canResize(event) {
	return event.target.dataset.resize;
}

export function isCell(event) {
	return event.target.classList.contains('js-cell');
}

export function matrix($current, $target) {
	const current = $current.id(true);
	const target = $target.id(true);
	const cols = range(current.col, target.col);
	const rows = range(current.row, target.row);

	return cols.reduce((acc, col) => {
		rows.forEach(row => acc.push(`${row}:${col}`));
		return acc;
	}, []);
}