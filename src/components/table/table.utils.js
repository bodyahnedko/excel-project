export function canResize(event) {
	return event.target.dataset.resize;
}

export function isCell(event) {
	return event.target.classList.contains('js-cell');
}