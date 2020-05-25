import {ExcelComponent} from '../../core/ExcelComponent';
import {createTable} from './table.template';
import tableResize from './table.resize';
import canResize from './table.utils';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root) {
		super($root, {
			listeners: ['mousedown']
		});
	}

	onMousedown(event) {
		if (canResize()) {
			tableResize(this.$root, event);
		}
	}

	toHTML() {
		return createTable();
	}
}