import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";
import { generateUUID } from "../common";

export function createLayoutAtom(
	this: BaseUIElement,
	role: string,
	value: string
): any {
	const atom = {
		id: generateUUID(),
		type: "LayoutAtom",
		config: {
			role: role,
			value: value
		}
	};
	return atom;
}
