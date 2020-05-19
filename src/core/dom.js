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
}

export function $(selector) {
	return new Dom(selector);
}

$.create = (tagName, classes = []) => {
	const el = document.createElement(tagName);
	if (classes.length) {
		el.classList.add(classes);
	}

	return $(el);
};