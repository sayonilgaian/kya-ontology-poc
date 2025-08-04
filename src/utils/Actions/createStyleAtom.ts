import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createStyleAtom(
	this: BaseUIElement,
	role: string ,
	value: string
): any {
	const atom = {
		id: generateUUID(),
		type: "StyleAtom",
		config: {
			role: role,
			value: value
		}
	};
	return atom;
}
