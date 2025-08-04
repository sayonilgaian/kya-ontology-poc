import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function removeAtomsFromJSON(
	this: BaseUIElement,
	object: any,
	atomId: string
): any {
	function removeAtoms(node: any): any {
		// Filter atoms that don't match the ID
		if (node.atoms && Array.isArray(node.atoms)) {
			node.atoms = node.atoms.filter((atom: any) => atom.id !== atomId);
		}

		// Recursively process child nodes
		if (node.children && Array.isArray(node.children)) {
			node.children = node.children.map(removeAtoms);
		}

		return node;
	}

	const cleaned = removeAtoms(structuredClone(object));
	return cleaned;
}
