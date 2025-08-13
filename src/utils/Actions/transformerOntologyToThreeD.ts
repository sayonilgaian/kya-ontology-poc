import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

interface OntologyData {
	ontologyMetrics: {
		classes: number;
		objectProperties: number;
		dataTypeProperties: number;
		individuals: number;
		nodes: number;
		edges: number;
	};
	classes: Array<{
		nodeId: string;
		uri: string;
		labels: string[];
		properties: {
			name: string;
		};
		type: string;
		subClassOf: string[];
		superClassOf: string[];
	}>;
	properties: Array<{
		nodeId: string;
		uri: string;
		labels: string[];
		properties: {
			name: string;
		};
		type: string;
		domain?: string;
		range?: string;
		subPropertyOf: string[];
		superPropertyOf: string[];
	}>;
  layoutConfig:LayoutConfig
}

interface ForceGraphNode {
	id: string;
	name: string;
	type: string;
	uri: string;
	nodeType: 'class' | 'property' | 'datatype';
	size?: number;
	color?: string;
	group?: string;
}

interface ForceGraphLink {
	source: string;
	target: string;
	type: string;
	name: string;
	value?: number;
}

interface LayoutConfig {
	nodeTypes: {
		[key: string]: {
			color: string;
			size: number;
			opacity?: number;
		};
	};
	linkTypes: {
		[key: string]: {
			color: string;
			width: number;
			opacity?: number;
		};
	};
	physics: {
		linkDistance: number;
		linkStrength: number;
		chargeStrength: number;
	};
	visual: {
		backgroundColor: string;
		showLabels: boolean;
		labelSize: number;
	};
}

interface Node {
	id: string;
	name: string;
	type: string;
	uri: string;
	nodeType: string;
	size: number;
	color: string;
	group: string;
}

interface Link {
	source: string;
	target: string;
	type: string;
	name: string;
	value: number;
}

export function transformOntologyDatafor3dForce(
	this: BaseUIElement,
	data?: OntologyData
): { nodes: Node[]; links: Link[] } {
	const nodes: Node[] = [];
	const links: Link[] = [];
	if (!data?.classes || !Array.isArray(data?.classes)) {
		return { nodes, links };
	}

	data.classes.forEach((cls) => {
		const nodeType = cls.type === 'rdfs:Datatype' ? 'datatype' : 'class';

		nodes.push({
			id: cls.nodeId,
			name: cls.properties.name,
			type: cls.type,
			uri: cls.uri,
			nodeType: nodeType,
			size:
				data?.layoutConfig?.nodeTypes[nodeType]?.size ||
				getDefaultNodeSize(nodeType),
			color:
				data?.layoutConfig?.nodeTypes[nodeType]?.color ||
				getDefaultNodeColor(nodeType),
			group: nodeType,
		});
	});

	data?.properties.forEach((prop) => {
		const nodeType = 'property';

		// Add property as node
		nodes.push({
			id: prop.nodeId,
			name: prop.properties.name,
			type: prop.type,
			uri: prop.uri,
			nodeType: nodeType,
			size:
				data?.layoutConfig?.nodeTypes[nodeType]?.size ||
				getDefaultNodeSize(nodeType),
			color:
				data?.layoutConfig?.nodeTypes[nodeType]?.color ||
				getDefaultNodeColor(nodeType),
			group: nodeType,
		});

		// Create links from domain to property
		if (prop.domain) {
			links.push({
				source: prop.domain,
				target: prop.nodeId,
				type: 'domain',
				name: 'hasDomain',
				value: data?.layoutConfig?.linkTypes['domain']?.width || 2,
			});
		}

		// Create links from property to range
		if (prop.range) {
			links.push({
				source: prop.nodeId,
				target: prop.range,
				type: 'range',
				name: 'hasRange',
				value: data?.layoutConfig?.linkTypes['range']?.width || 2,
			});
		}

		// Handle subPropertyOf relationships
		prop.subPropertyOf.forEach((parentProp) => {
			links.push({
				source: prop.nodeId,
				target: parentProp,
				type: 'subPropertyOf',
				name: 'subPropertyOf',
				value: data?.layoutConfig?.linkTypes['subPropertyOf']?.width || 1,
			});
		});
	});

	// Handle class hierarchies
	data?.classes.forEach((cls) => {
		cls.subClassOf.forEach((parentClass) => {
			links.push({
				source: cls.nodeId,
				target: parentClass,
				type: 'subClassOf',
				name: 'subClassOf',
				value: data?.layoutConfig?.linkTypes['subClassOf']?.width || 1,
			});
		});
	});

	return {
		nodes,
		links,
	};
}

/**
 * Get default node size based on type
 */
function getDefaultNodeSize(nodeType: string): number {
	switch (nodeType) {
		case 'class':
			return 8;
		case 'property':
			return 6;
		case 'datatype':
			return 4;
		default:
			return 5;
	}
}

/**
 * Get default node color based on type
 */
function getDefaultNodeColor(nodeType: string): string {
	switch (nodeType) {
		case 'class':
			return '#4CAF50'; // Green for classes
		case 'property':
			return '#2196F3'; // Blue for properties
		case 'datatype':
			return '#FF9800'; // Orange for datatypes
		default:
			return '#9E9E9E'; // Gray for others
	}
}
