import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function handleInput(
	this: BaseUIElement,
	currValue: string,
	e: Event
): string {
	let value = currValue;
	if ((e as InputEvent)?.inputType === 'deleteContentBackward') {
		if (!value || value.length === 0) {
			document?.execCommand?.('insertText', false, '\u200B');
		}
	}
	return value; 
}
