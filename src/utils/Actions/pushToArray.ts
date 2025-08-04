import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function pushToArray(
	this: BaseUIElement,
	array: Array<any>,
	item: any
): any[] {
	console.log('PUSH TO ARRAY:', array, item);
	if (!Array.isArray(array)) {
		console.warn('Provided value is not an array.');
		return [];
	}
	array.push(item);
	return array;
}
