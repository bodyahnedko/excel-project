// import {$} from '../../core/dom';

export class TableSelection {
	static className = 'selected';

	constructor() {
		this.group = [];
		this.currentCell = null;
	}

	select($el) {
		this.clear();
		this.group.push($el);
		this.currentCell = $el;
		$el.focus().addClass(TableSelection.className);
	}

	clear() {
		this.group.forEach($el => $el.removeClass(TableSelection.className));
		this.group = [];
	}

	selectGroup($cells = []) {
		this.clear();

		this.group = $cells;
		$cells.forEach($cel => $cel.addClass(TableSelection.className));
	}
}