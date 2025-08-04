import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createContentAtom(
	this: BaseUIElement,
	value: string 
): any {
	const config = {
		text: value
	};

	const atom = {
		id: generateUUID(),
		type: "ContentAtom",
		config: config
	};

	return atom;
}
