import {ExcelComponent} from '../../core/ExcelComponent';
import {$} from '../../core/dom';
import {createTable} from './table.template';
import tableResize from './table.resize';
import {canResize, isCell, matrix} from './table.utils';
import {TableSelection} from './TableSelection';

export class Table extends ExcelComponent {
	static className = 'excel__table';
	constructor($root, options) {
		super($root, {
			name: 'Table',
			listeners: ['mousedown', 'keydown'],
			...options
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

		this.$on('my emitter', (data) => {
			this.selection.currentCell.text(data);
		});
	}

	onMousedown(event) {
		if (canResize(event)) {
			tableResize(this.$root, event);
		} else if (isCell(event)) {
			const $target = $(event.target);

			if (event.shiftKey) {
				const $cells = matrix(this.selection.currentCell, $target)
					.map(id => this.$root.find(`[data-id="${id}"]`));
				this.selection.selectGroup($cells);
			} else {
				this.selection.select($target);
			}
		}
	}

	onKeydown(event) {
		const keys = [
			'Enter',
			'Tab',
			'ArrowRight',
			'ArrowLeft',
			'ArrowUp',
			'ArrowDown',
		];
		const {key} = event;
		if (keys.includes(key) && !event.shiftKey) {
			event.preventDefault();
			const id = this.selection.currentCell.id(true);
			const next = this.$root.find(nextSelector(key, id));
			this.selection.select(next);
		}
	}

	toHTML() {
		return createTable();
	}
}

function nextSelector(key, {row, col}) {
	const MinValue = 0;

	switch (key) {
	case 'Enter':
	case 'ArrowDown':
		row++;
		break;
	case 'Tab':
	case 'ArrowRight':
		col++;
		break;
	case 'ArrowLeft':
		col = col - 1 < MinValue ? MinValue : col - 1;
		break;
	case 'ArrowUp':
		row = row - 1 < MinValue ? MinValue : row - 1;
		break;
	}

	return `[data-id="${row}:${col}"]`;
}