import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function setState(
	this: BaseUIElement,
	name: string,
	value: unknown
): unknown {
	console.log("SET STATE", name, value);
	if (typeof this?.store?.setState === 'function') {
		this.store.setState(name, value);
	}
	return value;
}