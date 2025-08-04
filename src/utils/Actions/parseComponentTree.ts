import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function parseComponentTree(this: BaseUIElement, componentTree: any) {
	console.log('Parsing component tree:', componentTree);

	function recursiveTreeParse(component: any) {
		const node: any = {
			tag: component.tag,
			id: 'element-' + component.id,
		};

		if (
			component.children &&
			Array.isArray(component.children) &&
			component.children.length > 0
		) {
			node.children = component.children.map((child: any) =>
				recursiveTreeParse(child)
			);
		}
		return node;
	}

	return recursiveTreeParse(componentTree);
}
