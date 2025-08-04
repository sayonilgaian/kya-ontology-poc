import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function AddBorder(this: BaseUIElement, e: MouseEvent): void {
	e.stopPropagation();
	e.stopImmediatePropagation();

	const from = e.relatedTarget as HTMLElement | null;
	if (from) {
		from.style.border = 'none';
	}

	if (!this.dataset.originalBorder) {
		this.dataset.originalBorder = this.style.border || '';
	}

	this.style.border = '1px solid #ff5733';
}
