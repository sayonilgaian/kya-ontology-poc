import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function undo(this: BaseUIElement): void {
	if (typeof this?.store?.undo === 'function') {
		this.store.undo();
	} else {
		// console.log('Store is not initialized');
	}
}
