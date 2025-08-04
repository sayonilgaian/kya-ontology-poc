import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createImageAtom(
	this: BaseUIElement,
	config: any = {}
): any {
	const finalConfig = {
		src: config.src || "",
		img: config.img || "",
		noRepeat: config.noRepeat || ""
	};

	const atom = {
		id: generateUUID(),
		type: "ImageAtom",
		config: finalConfig
	};
	return atom;
}
