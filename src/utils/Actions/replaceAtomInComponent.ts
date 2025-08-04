import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function replaceAtomInComponent(
	this: BaseUIElement,
	atoms: Array<any>,
	atom: any
): Array<any> {
	if (!atom?.id) {
		console.warn('No atom ID provided. Cannot replace.');
		return atoms;
	}
	return atoms.map((a) => (a.id === atom.id ? atom : a));
}
