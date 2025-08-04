import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function toggleAttribute(this: BaseUIElement, attribute: string, e: Event) {
	e.stopImmediatePropagation();
	const current = this.getAttribute(attribute) === 'true';
	const next = !current;
	this.setAttribute(attribute, String(next));
	return next;
}
