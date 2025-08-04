import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function setStateWithoutNotify(
	this: BaseUIElement,
	name: string,
	value: unknown
): unknown {
	console.log("setStateWithoutNotify", name, value);
	if (typeof this?.store?.setWithoutNotify === 'function') {
		this.store.setWithoutNotify(name, value);
	} else {
		// console.log('Store is not initialized');
	}
	return value;
}