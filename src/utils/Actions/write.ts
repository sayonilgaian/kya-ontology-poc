import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function write(this: BaseUIElement, value: string): string {
	this.textContent = value;
    return value;
}

