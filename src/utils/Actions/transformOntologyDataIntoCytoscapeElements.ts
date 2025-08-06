import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

type OntologyClass = {
	nodeId: string;
	properties: { name: string };
	subClassOf: string[];
};

type OntologyProperty = {
	domain: string;
	range: string;
	properties: { name: string };
	type: string;
};

type Data = {
	ontologyMetrics: {
		classes: number;
		objectProperties: number;
		dataTypeProperties: number;
		individuals: number;
		nodes: number;
		edges: number;
	};
	classes: OntologyClass[];
	properties: OntologyProperty[];
};

export function transformOntologyData(this: BaseUIElement, data?: Data): any[] {
	if (!data?.classes || !Array.isArray(data?.classes)) {
		return [];
	}

	const nodes = data.classes
		.filter((cls: OntologyClass) => cls?.nodeId && cls?.properties?.name)
		.map((cls: OntologyClass) => ({
			group: 'nodes',
			data: {
				id: cls.nodeId,
				label: cls.properties.name || cls.nodeId,
				customProperty: '',
			},
		}));

	const subclassEdges = data.classes
		.filter((cls: OntologyClass) => cls?.subClassOf && cls?.nodeId)
		.flatMap((cls: OntologyClass) =>
			cls.subClassOf.map((parentId: string) => ({
				group: 'edges',
				data: {
					id: cls.nodeId,
					source: cls.nodeId,
					target: parentId,
					label: 'subClassOf',
				},
			}))
		);

	const objectPropertyEdges = !Array.isArray(data?.properties)
		? []
		: data.properties
				.filter(
					(prop: OntologyProperty) =>
						prop?.domain &&
						prop?.range &&
						prop.properties?.name &&
						prop?.type
				)
				.map((prop: OntologyProperty) => ({
					group: 'edges',
					data: {
						id: generateUUID(),
						source: prop.domain,
						target: prop.range,
						label: prop.properties.name,
					},
				}));
	return [...nodes, ...subclassEdges, ...objectPropertyEdges];
}
