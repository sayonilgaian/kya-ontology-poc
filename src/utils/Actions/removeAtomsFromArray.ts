import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function removeAtomsFromArray(
	this: BaseUIElement,
	object: any,
	atomId: string
): any {
	if (object && Array.isArray(object)) {
		object = object.filter((atom) => atom.id !== atomId);
	}
	return object;
}
