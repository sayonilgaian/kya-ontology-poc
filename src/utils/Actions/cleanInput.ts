import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function cleanInput(this: BaseUIElement): string {
	const value = this.textContent;
	const cleanValue =
		value?.replace(/\u200B/g, '').replace(/\n/g, '').trim() || '';
	return cleanValue;
}
