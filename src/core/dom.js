class Dom {
	constructor(selector) {
		this.$el = typeof selector === 'string' ?
			document.querySelector(selector) :
			selector;
	}

	html(html) {
		if (html) {
			this.$el.insertAdjacentHTML('beforeend', html);
			return this;
		} else {
			return this.$el.outerHTML;
		}
	}

	clear() {
		this.$el.innerHTML = '';
		return this;
	}

	on(listener, callback) {
		this.$el.addEventListener(listener, callback);
	}

	off(listener, callback) {
		this.$el.removeEventListener(listener, callback);
	}

	append(node) {
		if (node instanceof Dom) {
			node = node.$el;
		}
		this.$el.append(node);
		return this;
	}

	closest(selector) {
		return $(this.$el.closest(selector));
	}

	get data() {
		return this.$el.dataset;
	}

	getCoords() {
		return this.$el.getBoundingClientRect();
	}

	findAll(selector) {
		return this.$el.querySelectorAll(selector);
	}

	find(selector) {
		return $(this.$el.querySelector(selector));
	}

	css(styles = {}) {
		// return Object.keys(styles).map(attr => {
		// 	this.$el.style[attr] = styles[attr];
		// });
		Object.assign(this.$el.style, styles);
	}

	remove() {
		this.$el.remove();
	}

	addClass(className) {
		return $(this.$el.classList.add(className));
	}

	removeClass(className) {
		return $(this.$el.classList.remove(className));
	}
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = '') => {
	const el = document.createElement(tagName);
	if (classes.length) {
		el.classList.add(classes);
	}

	return $(el);
};