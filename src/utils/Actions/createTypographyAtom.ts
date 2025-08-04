import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createTypographyAtom(
	this: BaseUIElement,
	role: string,
	value: string
): any {
	const atom = {
		id: generateUUID(),
		type: "TypographyAtom",
		config: {
			role: role,
			value: value
		}
	};
	return atom;
}
