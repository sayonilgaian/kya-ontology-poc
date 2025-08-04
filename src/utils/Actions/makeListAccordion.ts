import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function makeListAccordion(this: BaseUIElement, tree: any) {
	function addAtoms(node: any) {
		node.atoms = node.atoms || [
			{
				type: 'attributeAtom',
				config: {
					attribute: 'open',
					value: 'true',
				},
			},
			{
				type: 'ContentAtom',
				config: {
					text: '➕ ' + node.tag,
				},
			},
			{
				type: 'LayoutAtom',
				config: {
					height: 'auto',
					width: 'auto',
					display: 'block',
				},
			},
			{
				type: 'SpacingAtom',
				config: { role: 'padding', value: '0.2rem 0 0.2rem 0.2rem' },
			},
			{
				type: 'InteractionAtom',
				id: 'dropdown',
				config: {
					trigger: 'click',
					dependencies: [],
					params: [{ source: 'exact', value: 'open' }],
					action: 'toggleAttribute',
				},
			},
			{
				type: 'InteractionAtom',
				id: 'dropdown2',
				config: {
					trigger: null,
					dependencies: ['dropdown'],
					params: [{ source: 'pipe' }],
					action: 'toggleChildList',
				},
			},
		];

		if (node.children && Array.isArray(node.children)) {
			node.atoms.push({
				type: 'LayoutAtom',
				config: {
					border: '1px solid #aaaaaa40',
				},
			});
			node.children.forEach(addAtoms);
		}
	}

	addAtoms(tree);
	return tree;
}
