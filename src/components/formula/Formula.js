import {ExcelComponent} from '../../core/ExcelComponent';

export class Formula extends ExcelComponent {
	static className = 'excel__formula';

	constructor($root, options) {
		super($root, {
			name: 'Formula',
			listeners: ['input'],
			...options
		});
	}

	onInput(event) {
		const text = event.target.textContent;
		this.$emit('my emitter', text);
	}

	toHTML() {
		return `
			<div class="info">fx</div>
			<div class="input" contenteditable spellcheck="false"></div>
		`;
	}
}