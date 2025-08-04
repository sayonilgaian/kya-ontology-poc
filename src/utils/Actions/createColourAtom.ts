import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createColourAtom(
	this: BaseUIElement,
	role: string ,
	value: string
): any {
	const atom = {
		id: generateUUID(),
		type: "ColourAtom",
		config: {
			role: role,
			value: value
		}
	};
	return atom;
}
