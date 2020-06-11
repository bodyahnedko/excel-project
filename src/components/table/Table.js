import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {createTable} from './table.template';
import tableResize from './table.resize';
import {canResize, isCell} from './table.utils';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root) {
		super($root, {
			listeners: ['mousedown']
		});

		this.prepare();
	}

	prepare() {
		this.selection = new TableSelection();
	}

	init() {
		super.init();

		const firstCell = this.$root.find('[data-id="0:0"]');
		this.selection.select(firstCell);
	}

	onMousedown(event) {
		if (canResize(event)) {
			tableResize(this.$root, event);
		} else if (isCell(event)) {
			const $target = $(event.target);

			if (event.shiftKey) {
				this.selection.selectGroup($target);
			} else {
				this.selection.select($target);
			}
		}
	}

	toHTML() {
		return createTable();
	}
}