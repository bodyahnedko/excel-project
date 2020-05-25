import {$} from '../../core/dom';

export default function tableResize($root, event) {
	const $resizer = $(event.target);
	const $parent = $resizer.closest('.js-resizer-wrap');
	const type = $resizer.data.resize;
	const index = $parent.data.index;
	const colSiblings = $root.findAll(`[data-index="${index}"]`);
	const startX = event.clientX;
	const startWidth = $parent.getCoords().width;
	const tableHeight = $root.$el.clientHeight;
	const startY = event.clientY;
	const startHeight = $parent.getCoords().height;
	const $span = $.create('span');

	let delta = 0;

	if (type === 'col') {
		$span.css({
			height: `${tableHeight}px`
		});
	} else {
		$span.css({
			'width': '100vw'
		});
	}

	$resizer.append($span);

	document.onmousemove = e => {
		if (type === 'col') {
			delta = Math.floor(e.clientX - startX);
			if (startWidth + delta - 7 <= 0) {
				return false;
			}
			$resizer.css({
				right: `${-delta}px`
			});
		} else {
			delta = Math.floor(e.clientY - startY);
			if (startHeight + delta - 5 <= 0) {
				return false;
			}
			$resizer.css({
				bottom: `${-delta}px`
			});
		}
	};

	document.onmouseup = () => {
		document.onmousemove = null;
		document.onmouseup = null;
		$span.remove();

		if (type === 'col') {
			$parent.css({
				width: `${startWidth + delta}px`
			});
			$resizer.css({
				right: 0
			});

			colSiblings.forEach(cell => {
				if (cell) {
					cell.style.width = (startWidth + delta) + 'px';
				}
			});
		} else {
			$parent.css({
				height: (startHeight + delta) + 'px'
			});
			$resizer.css({
				bottom: 0
			});
		}
	};
}