import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createStateAtom(
	this: BaseUIElement,
	config: any
): any {
	config = {
		op: config.op || "Initialize",
		name: config.name || "statename",
		value: config.value || "value",
		callback: config.callback || ""
	};

	const atom = {
		id: generateUUID(),
		type: "StateAtom",
		config
	};
	return atom;
}
