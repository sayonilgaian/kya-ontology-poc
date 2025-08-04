import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function addNewAtom(
	this: BaseUIElement,
	updateJson: any,
	atomState: any,
	resultState: any,
	componentState: any
) {
	console.log(
		'ADD NEW ATOM:',
		updateJson,
		atomState,
		resultState,
		componentState
	);
	const newAtom = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: 'updateJson11',
		config: {
			trigger: 'mouseover',
			params: [],
			dependencies: [],
			action: 'AddBorder',
		},
	};

	const newAtom2 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: 'updateJson22',
		config: {
			trigger: 'mouseleave',
			params: [],
			dependencies: [],
			action: 'RemoveBorder',
		},
	};

	const newAtom3 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: 'updateJson3',
		config: {
			trigger: 'click',
			params: [],
			state: atomState,
			dependencies: [],
			action: 'GetAtoms',
		},
	};

	const newAtom4 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: '2',
		config: {
			trigger: null,
			dependencies: ['updateJson3'],
			params: [
				{ source: 'exact', value: atomState },
				{ source: 'pipe', value: '' },
			],
			action: 'setState',
		},
	};

	const newAtom5 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: 'updateJson5',
		config: {
			trigger: 'dragover',
			params: [
				{ source: 'exact', value: 0 },
				{ source: 'exact', value: 0 },
			],
			state: resultState,
			dependencies: [],
			action: 'dragOverElement',
		},
	};

	const newAtom6 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: 'updateJson6',
		config: {
			trigger: 'drop',
			params: [
				{ source: 'exact', value: 0 },
				{ source: 'exact', value: 0 },
			],
			state: resultState,
			dependencies: [],
			action: 'dropElement',
		},
	};

	const newAtom11 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: 'updateJson77',
		config: {
			trigger: null,
			params: [
				{ source: 'pipe' },
				{ source: 'exact', value: atomState },
				{ source: 'exact', value: resultState },
				{ source: 'exact', value: componentState },
			],
			state: resultState,
			dependencies: ['updateJson6'],
			action: 'addNewAtom',
		},
	};

	const newAtom7 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: 'updateJson7',
		config: {
			trigger: null,
			params: [
				{ source: 'state', name: resultState },
				{ source: 'pipe' },
				{ source: 'action', value: 'updateCallback' },
			],
			state: resultState,
			dependencies: ['updateJson77'],
			action: 'traverse',
		},
	};

	const newAtom8 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: 'updateJson8',
		config: {
			trigger: null,
			params: [
				{ source: 'exact', value: resultState },
				{ source: 'pipe', value: '' },
			],
			state: resultState,
			dependencies: ['updateJson7'],
			action: 'setState',
		},
	};

	const newAtom9 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: '9',
		config: {
			trigger: null,
			params: [],
			state: componentState,
			dependencies: ['2'],
			action: 'GetComponentId',
		},
	};

	const newAtom10 = {
		type: 'InteractionAtom',
		tag: 'InteractionAtom',
		id: '10',
		config: {
			trigger: null,
			dependencies: ['9'],
			params: [{ source: 'exact', value: componentState }, { source: 'pipe' }],
			action: 'setState',
		},
	};

	function traverseAndAddAtoms(node: any) {
		if (!node?.id) {
			node.id = generateUUID();
		}

		if (node.atoms) {
			let flag = false;
			for (let i in node.atoms) {
				if (!node.atoms[i].id) {
					node.atoms[i].id = generateUUID();
				} else {
					if (node.atoms[i].tag !== 'InteractionAtom') {
						node.atoms[i].id = node.atoms[i].id + '-' + i;
					}
				}
				if (node.atoms[i].tag === 'InteractionAtom') {
					flag = true;
				}
			}
			if (!flag) {
				node.atoms.push(
					newAtom,
					newAtom2,
					newAtom3,
					newAtom4,
					newAtom5,
					newAtom6,
					newAtom11,
					newAtom7,
					newAtom8,
					newAtom9,
					newAtom10
				);
			}
		}

		if (node.children) {
			node.children.forEach(traverseAndAddAtoms);
		}
	}

	const clonedJSON = structuredClone(updateJson);
	traverseAndAddAtoms(clonedJSON);

	console.log('ADD NEW ATOM RESULT:', updateJson);
	return clonedJSON;
}
