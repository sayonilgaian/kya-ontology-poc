import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function toggle(this: BaseUIElement, value: boolean): boolean {
	console.log("TOGGLE", value);
	return !value;
}
