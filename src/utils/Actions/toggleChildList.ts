import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function toggleChildList(this: BaseUIElement, isOpen: boolean) {
	const children = Array.from(this.shadowRoot?.children || []);

	children.forEach((child: any) => {
		if (child.tagName === 'SLOT') return;

		child.style.display = isOpen ? 'block' : 'none';
	});

	return true;
}
