import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function panEnd(this: BaseUIElement, e: MouseEvent): void {
	if (this.actionData._panData) this.actionData._panData.dragging = false;
}
