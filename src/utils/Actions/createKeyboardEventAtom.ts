import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createKeyboardEventAtom(
	this: BaseUIElement,
	role: string = "keyboard",
	value: string = "Enter"
): any {
	return {
		id: generateUUID(),
		type: "KeyboardEventAtom",
		config: {
			op: role,
			value
		}
	};
}
