import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createMicroAnimationAtom(
	this: BaseUIElement,
	config: any = {}
): any {
	config = {
		preset: config.preset || "hover-raise",
		duration: Number(config.duration) || 180
	};

	const atom = {
		id: generateUUID(),
		type: "MicroAnimationAtom",
		config
	};
	return atom;
}
