import cytoscape, {
	Core,
	NodeSingular,
	EdgeSingular,
	ElementDefinition,
	SelectionType,
} from 'cytoscape';
import { thirdParty } from '../thirdPartyType';
import {
	cytoscapeDefaultStyles,
	cytoscapeDefaultLayout,
} from './cytoscapeDataUtils/defaultStyles';

interface CytoscapeConfig {
	elements?: any[];
	layout?: any;
	style?: any[];
	zoom?: number;
	pan?: { x: number; y: number };
	minZoom?: number;
	maxZoom?: number;
	zoomingEnabled?: boolean;
	userZoomingEnabled?: boolean;
	panningEnabled?: boolean;
	userPanningEnabled?: boolean;
	boxSelectionEnabled?: boolean;
	selectionType?: SelectionType;
	autoungrabify?: boolean;
	autounselectify?: boolean;
	onNodeClick?: (node: NodeSingular) => void;
	onEdgeClick?: (edge: EdgeSingular) => void;
	onNodeHover?: (node: NodeSingular) => void;
	onEdgeHover?: (edge: EdgeSingular) => void;
	onBackgroundClick?: () => void;
	[key: string]: any; // for extensibility
}

interface NodeData {
	id: string;
	label?: string;
	[key: string]: any;
}

interface EdgeData {
	id: string;
	source: string;
	target: string;
	label?: string;
	[key: string]: any;
}

export class CytoscapeService implements thirdParty {
	private cy: Core | null = null;
	private container: HTMLElement | null = null;

	init(context: HTMLElement, config: CytoscapeConfig = {}) {
		if (!this.container || this.container !== context) {
			this.container = context;
			console.log('Cytoscape canvas initiated!');
		}

		// Default configuration
		const defaultConfig = {
			container: this.container,
			elements: config.elements || [],
			style: config.style || cytoscapeDefaultStyles,
			layout: config.layout || cytoscapeDefaultLayout,
		};

		// Merge user config with defaults
		const finalConfig = { ...defaultConfig, ...config };

		this.cy = cytoscape(finalConfig as any);

		// Set up event handlers
		if (config.onNodeClick) {
			this.cy.on('tap', 'node', (evt) => {
				config.onNodeClick!(evt.target);
			});
		}

		if (config.onEdgeClick) {
			this.cy.on('tap', 'edge', (evt) => {
				config.onEdgeClick!(evt.target);
			});
		}

		if (config.onNodeHover) {
			this.cy.on('mouseover', 'node', (evt) => {
				config.onNodeHover!(evt.target);
			});
		}

		if (config.onEdgeHover) {
			this.cy.on('mouseover', 'edge', (evt) => {
				config.onEdgeHover!(evt.target);
			});
		}

		if (config.onBackgroundClick) {
			this.cy.on('tap', (evt) => {
				if (evt.target === this.cy) {
					config.onBackgroundClick!();
				}
			});
		}

		return this.cy;
	}

	updateData(context: HTMLElement, elements: any[]) {
		if (this.cy) {
			this.cy.elements().remove();
			this.cy.add(elements);
			this.cy.layout({ name: 'cose' }).run();
		}
        console.log("Cytoscape config successfully updated!")
	}

	getInstance(context: HTMLElement): Core | null {
		return this.cy;
	}

	destroy(context: HTMLElement) {
		if (this.cy) {
			this.cy.destroy();
			this.cy = null;
		}
		if (this.container) {
			this.container.innerHTML = '';
		}
	}

	// CRUD Operations for Nodes
	addNode(nodeData: NodeData): NodeSingular | null {
		if (!this.cy) return null;

		const node = this.cy.add({
			group: 'nodes' as 'nodes',
			data: nodeData,
		} as ElementDefinition);

		// Refresh layout
		this.cy.layout({ name: 'cose' }).run();
		return node;
	}

	addNodes(nodesData: NodeData[]): void {
		if (!this.cy) return;

		const nodesToAdd: ElementDefinition[] = nodesData.map((nodeData) => ({
			group: 'nodes' as 'nodes',
			data: nodeData,
		}));

		this.cy.add(nodesToAdd);
		this.cy.layout({ name: 'cose' }).run();
	}

	updateNode(
		nodeId: string,
		newData: Partial<NodeData>
	): NodeSingular | null {
		if (!this.cy) return null;

		const node = this.cy.getElementById(nodeId);
		if (node.length > 0) {
			// Update node data
			Object.keys(newData).forEach((key) => {
				node.data(key, newData[key]);
			});
			return node;
		}
		return null;
	}

	deleteNode(nodeId: string): boolean {
		if (!this.cy) return false;

		const node = this.cy.getElementById(nodeId);
		if (node.length > 0) {
			node.remove();
			this.cy.layout({ name: 'cose' }).run();
			return true;
		}
		return false;
	}

	deleteNodes(nodeIds: string[]): number {
		if (!this.cy) return 0;

		let deletedCount = 0;
		nodeIds.forEach((nodeId) => {
			const node = this.cy!.getElementById(nodeId);
			if (node.length > 0) {
				node.remove();
				deletedCount++;
			}
		});

		if (deletedCount > 0) {
			this.cy.layout({ name: 'cose' }).run();
		}

		return deletedCount;
	}

	getNode(nodeId: string): NodeSingular | null {
		if (!this.cy) return null;

		const node = this.cy.getElementById(nodeId);
		return node.length > 0 ? node : null;
	}

	getAllNodes(): NodeSingular[] {
		if (!this.cy) return [];
		return this.cy.nodes().toArray();
	}

	// CRUD Operations for Edges
	addEdge(edgeData: EdgeData): EdgeSingular | null {
		if (!this.cy) return null;

		const edge = this.cy.add({
			group: 'edges' as 'edges',
			data: edgeData,
		} as ElementDefinition);

		return edge;
	}

	addEdges(edgesData: EdgeData[]): void {
		if (!this.cy) return;

		const edgesToAdd: ElementDefinition[] = edgesData.map((edgeData) => ({
			group: 'edges' as 'edges',
			data: edgeData,
		}));

		this.cy.add(edgesToAdd);
	}

	updateEdge(
		edgeId: string,
		newData: Partial<EdgeData>
	): EdgeSingular | null {
		if (!this.cy) return null;

		const edge = this.cy.getElementById(edgeId);
		if (edge.length > 0) {
			// Update edge data
			Object.keys(newData).forEach((key) => {
				if (key !== 'source' && key !== 'target') {
					// Don't allow changing source/target
					edge.data(key, newData[key]);
				}
			});
			return edge;
		}
		return null;
	}

	deleteEdge(edgeId: string): boolean {
		if (!this.cy) return false;

		const edge = this.cy.getElementById(edgeId);
		if (edge.length > 0) {
			edge.remove();
			return true;
		}
		return false;
	}

	deleteEdges(edgeIds: string[]): number {
		if (!this.cy) return 0;

		let deletedCount = 0;
		edgeIds.forEach((edgeId) => {
			const edge = this.cy!.getElementById(edgeId);
			if (edge.length > 0) {
				edge.remove();
				deletedCount++;
			}
		});

		return deletedCount;
	}

	getEdge(edgeId: string): EdgeSingular | null {
		if (!this.cy) return null;

		const edge = this.cy.getElementById(edgeId);
		return edge.length > 0 ? edge : null;
	}

	getAllEdges(): EdgeSingular[] {
		if (!this.cy) return [];
		return this.cy.edges().toArray();
	}

	// Utility methods
	fit(): void {
		if (this.cy) {
			this.cy.fit();
		}
	}

	center(): void {
		if (this.cy) {
			this.cy.center();
		}
	}

	zoom(level: number): void {
		if (this.cy) {
			this.cy.zoom(level);
		}
	}

	pan(position: { x: number; y: number }): void {
		if (this.cy) {
			this.cy.pan(position);
		}
	}

	runLayout(layoutOptions?: any): void {
		if (this.cy) {
			const layout = layoutOptions || { name: 'cose' };
			this.cy.layout(layout).run();
		}
	}

	getSelectedElements(): any[] {
		if (!this.cy) return [];
		return this.cy.$(':selected').toArray();
	}

	selectElement(elementId: string): void {
		if (this.cy) {
			this.cy.getElementById(elementId).select();
		}
	}

	unselectAll(): void {
		if (this.cy) {
			this.cy.elements().unselect();
		}
	}

	// Export/Import functionality
	exportData(): any {
		if (!this.cy) return null;
		return this.cy.json();
	}

	importData(data: any): void {
		if (this.cy && data) {
			this.cy.json(data);
		}
	}

	returnMethods() {
		// this method is compulsory in all our third party services
		return {
			init: this.init.bind(this),
			// setContainer: this.setContainer.bind(this),
			updateData: this.updateData.bind(this),
			getInstance: this.getInstance.bind(this),
			destroy: this.destroy.bind(this),

			// Node CRUD operations
			addNode: this.addNode.bind(this),
			addNodes: this.addNodes.bind(this),
			updateNode: this.updateNode.bind(this),
			deleteNode: this.deleteNode.bind(this),
			deleteNodes: this.deleteNodes.bind(this),
			getNode: this.getNode.bind(this),
			getAllNodes: this.getAllNodes.bind(this),

			// Edge CRUD operations
			addEdge: this.addEdge.bind(this),
			addEdges: this.addEdges.bind(this),
			updateEdge: this.updateEdge.bind(this),
			deleteEdge: this.deleteEdge.bind(this),
			deleteEdges: this.deleteEdges.bind(this),
			getEdge: this.getEdge.bind(this),
			getAllEdges: this.getAllEdges.bind(this),

			// Utility methods
			fit: this.fit.bind(this),
			center: this.center.bind(this),
			zoom: this.zoom.bind(this),
			pan: this.pan.bind(this),
			runLayout: this.runLayout.bind(this),
			getSelectedElements: this.getSelectedElements.bind(this),
			selectElement: this.selectElement.bind(this),
			unselectAll: this.unselectAll.bind(this),
			exportData: this.exportData.bind(this),
			importData: this.importData.bind(this),
		};
	}
}
