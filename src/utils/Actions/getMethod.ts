import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";
import { get } from "../common";

export function getMethod(
	this: BaseUIElement,
	object: unknown,
	path: string | Array<string | number>,
	defaultValue: any = ''
): any {
	// if (!path) return object;

	// const keys = Array.isArray(path)
	// 	? path
	// 	: path
	// 			.split(/\.|\[|\]/g)
	// 			.filter(Boolean)
	// 			.map((key) => (/^\d+$/.test(key) ? Number(key) : key));

	// let result: any = object;

	// for (let key of keys) {
	// 	result = result == null ? undefined : result[key];
	// 	if (result === undefined) return defaultValue;
	// }
	const result = get(object, path, defaultValue);

	console.log("GET METHOD:", object, result);
	return result;
}
