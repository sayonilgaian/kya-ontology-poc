import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";
import { set } from "../common";

export function setMethod(
	this: BaseUIElement,
	object: unknown,
	path: string | Array<string | number>,
	value: any
): any {
	// if (!path) return;

	// const keys = Array.isArray(path)
	// 	? path
	// 	: path
	// 			.split(/\.|\[|\]/g)
	// 			.filter(Boolean)
	// 			.map((key) => (/^\d+$/.test(key) ? Number(key) : key));

	// let current: any = object;

	// keys.forEach((key, index) => {
	// 	if (index === keys.length - 1) {
	// 		current[key] = value;
	// 	} else {
	// 		if (!current[key] || typeof current[key] !== 'object') {
	// 			current[key] = typeof keys[index + 1] === 'number' ? [] : {};
	// 		}
	// 		current = current[key];
	// 	}
	// });
	console.log("SET METHOD", object, path, value);
	const current = set(object, path, value);
	console.log("SET METHOD: AFTER", current);

	return current;
}
