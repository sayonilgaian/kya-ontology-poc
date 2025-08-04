import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function RemoveBorder(this: BaseUIElement, e: MouseEvent): void {
	e.stopPropagation();
	e.stopImmediatePropagation();

	const to = e.relatedTarget as HTMLElement | null;
	if (!to || !this.contains(to)) {
		// Wapas original border laga do
		this.style.border = this.dataset.originalBorder || '';
		// Clean up
		delete this.dataset.originalBorder;
	}
}
