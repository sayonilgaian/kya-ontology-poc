import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function collectAllAtomsFromJSON(this: BaseUIElement, object: any): any[] {
	const allAtoms: any[] = [];

	function collectAtoms(node: any) {
		if (node.atoms && Array.isArray(node.atoms)) {
			allAtoms.push(...node.atoms);
		}
		if (node.children && Array.isArray(node.children)) {
			node.children.forEach(collectAtoms);
		}
	}

	collectAtoms(object);
	return allAtoms;
}
