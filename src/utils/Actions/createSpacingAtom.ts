import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createSpacingAtom(
	this: BaseUIElement,
	role: string = "spacing",
	value: string = "10px"
): any {
	const atom = {
		id: generateUUID(),
		type: "SpacingAtom",
		config: {
			role: role,
			value: value
		}
	};

	return atom;
}
