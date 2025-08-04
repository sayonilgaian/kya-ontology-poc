import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function addItemInArrayByKey(
	this: BaseUIElement,
	array: Array<any>,
	item: any,
	key: string,
): any[] {
	console.log("ADD ITEMS IN ARRAY BY KEY:")
	if (!Array.isArray(array)) {
		console.warn('Provided value is not an array.');
		return [];
	}
	for(let i in array){
		if(array[i][key] === item[key]){
			array[i] = item
		}
	}
	console.log(array, item, key);
	return array;
}
