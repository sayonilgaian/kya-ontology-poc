import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function GetAtoms(this: BaseUIElement, e: Event): any {
	const atoms = this._atoms;
	e.stopPropagation();
	return atoms;
}
