import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function Mask(this: BaseUIElement): void {
	this.textContent = this.textContent?.replace(/./g, '*') || '';
}
