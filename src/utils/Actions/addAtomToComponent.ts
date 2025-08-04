import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function addAtomToComponent(
	this: BaseUIElement,
	object: any,
	selectedComponent: string,
	atom: any
): any {
	const componentId = this?.store?.getState(selectedComponent);
	if (!componentId) return object;

	function addAtom(node: any): any {
		if (node.id === componentId) {
			if (Array.isArray(node.atoms)) {
				atom.id = `${atom.id}-${node.atoms.length}`;
				node.atoms.push(atom);
			} else {
				node.atoms = [atom];
			}
		}
		if (Array.isArray(node.children)) {
			node.children = node.children.map(addAtom);
		}
		return node;
	}

	return addAtom(structuredClone(object));
}
