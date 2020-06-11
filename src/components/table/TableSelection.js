import {$} from '../../core/dom';

export class TableSelection {
	static className = 'selected';

	constructor() {
		this.group = [];
	}

	select($el) {
		this.clear();
		this.group.push($el);
		$el.addClass(TableSelection.className);
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className));
		this.group = [];
	}

	selectGroup($el) {
		// array.forEach($el => $el.addClass(TableSelection.className));
		this.group[1] = $el;

		const startRow = +this.group[0].data.id.split(':')[0];
		const endRow = +this.group[1].data.id.split(':')[0];
		const startCol = +this.group[0].data.id.split(':')[1];
		const endCol = +this.group[1].data.id.split(':')[1];

		for (let i = startRow; i <= endRow; i++) {
			const row = document.querySelector(`[data-id*="${i}:"]`).closest('.js-row');
			// console.log('row', row);
			for (let j = startCol; j <= endCol; j++) {
				const cell = row.querySelector(`[data-id*=":${j}"]`);
				this.group.push(cell);
			}
		}
		console.log(this.group);
		this.group.forEach(($el, index) => (index > 1) && $($el).addClass(TableSelection.className));
		this.clear();
		// console.log(rows);
	}
}