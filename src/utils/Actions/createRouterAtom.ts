import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createRouterAtom(this: BaseUIElement, config: any = {}): any {
	const atom = {
		id: generateUUID(),
		type: "RouterAtom",
		config: {
			path: config.path || "",
			url: config.url || "",
			id: config.id || generateUUID()
		}
	};
	return atom;
}
