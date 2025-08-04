import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createAttributeAtom(
	this: BaseUIElement,
	role: string = "attribute",
	value: string = "data-attribute"
): any {
	const atom = {
		id: generateUUID(),
		type: "AttributeAtom",
		config: {
			attribute: role,
			value
		}
	};
	return atom;
}
