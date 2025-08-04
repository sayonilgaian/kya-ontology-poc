import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function redo(this: BaseUIElement): void {
	if (typeof this?.store?.redo === 'function') {
		this.store.redo();
	} else {
		// console.log('Store is not initialized');
	}
}