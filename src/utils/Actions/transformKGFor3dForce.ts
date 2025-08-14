interface Content {
	hasEmail?: string;
	hasName?: string;
	ontologyId: string;
	id: string;
	labels: string[];
	[key: string]: any; 
}

interface Relations {
	relationshipType: string;
	relationshipDetails: Record<string, any>;
	startNodeEntityId: string;
	endNodeEntityId: string;
}

interface KGResponse {
	pageNumber: number;
	pageSize: number;
	noOfInstances: number;
	totalInstances: number;
	totalPages: number;
	content: Content[];
	relations: Relations[];
	customReferencedData: Record<string, any>;
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


export function transformFlatDataFor3dForce(data: KGResponse): {
	nodes: Node[];
	links: Link[];
} {
	const nodes: Node[] = [];
	const links: Link[] = [];

	data.content.forEach((n) => {
		const nodeType = 'class';
		const name = n?.hasName || n?.id || n?.PI_314_ENTITYID;

		nodes.push({
			id: n?.PI_314_ENTITYID,
			name,
			type: n?.labels?.[0] || 'Unknown',
			uri: '',
			nodeType,
			size:
				getDefaultNodeSize(nodeType),
			color:
				getDefaultNodeColor(nodeType),
			group: nodeType,
		});
	});

	data?.relations.forEach((rel) => {
		links.push({
			source: rel?.startNodeEntityId,
			target: rel?.endNodeEntityId,
			type: rel?.relationshipType,
			name: rel?.relationshipType,
			value:2,
		});
	});

	return { nodes, links };
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

