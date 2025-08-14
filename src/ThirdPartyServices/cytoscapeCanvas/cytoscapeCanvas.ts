import cytoscape, {
	Core,
	NodeSingular,
	EdgeSingular,
	SelectionType,
} from 'cytoscape';
import {
	cytoscapeDefaultStyles,
	cytoscapeDefaultLayout,
} from './cytoscapeDataUtils/defaultStyles';
// @ts-ignore
import cola from 'cytoscape-cola';
// @ts-ignore
import euler from 'cytoscape-euler';
import colaDefaultLayout from './cytoscapeDataUtils/colaLayoutDefault';
import { thirdParty } from '../thirdPartyType';

cytoscape.use(cola);
cytoscape.use(euler);

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
	onEdgeClick?: (edge: EdgeSingular) => void;
	onNodeHover?: (node: NodeSingular) => void;
	onEdgeHover?: (edge: EdgeSingular) => void;
	onBackgroundClick?: () => void;
	[key: string]: any; // for extensibility
}

interface NodeData {
	id?: string;
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
	private selectedElement: NodeData | EdgeData = {};
	private cyConfig: CytoscapeConfig = {};

	init(context: HTMLElement, config: CytoscapeConfig = {}) {
		if (!this.container || this.container !== context) {
			this.container = context;
			console.log('Cytoscape canvas initiated!');
		}

		// Default configuration
		const defaultConfig = {
			container: this.container,
			elements: config.elements || [],
			// style: config.style,
			style: config.style || cytoscapeDefaultStyles,
			layout: config.layout || colaDefaultLayout,
			// layout: config.layout || cytoscapeDefaultLayout,
		};

		// Merge user config with defaults
		const finalConfig = { ...defaultConfig, ...config };
		this.cyConfig = finalConfig;

		this.cy = cytoscape(finalConfig as any);

		this.cy.off('tap', 'node'); // remove existing listener to avoid stacking
		this.cy.off('tap', 'edge');

		this.cy.on('tap', 'node', (evt) => {
			let nodeData: NodeData = evt.target?.data();
			if (nodeData.id) {
				console.log(
					'clicked on Cytoscape node: ',
					JSON.stringify(nodeData, null, 4)
				);
				this.selectedElement = evt.target?.data();
			}
		});
		this.cy.on('tap', 'edge', (evt) => {
			let edgeData: NodeData = evt.target?.data();
			if (edgeData.id) {
				console.log(
					'clicked on Cytoscape node: ',
					JSON.stringify(edgeData, null, 4)
				);
				this.selectedElement = evt.target?.data();
			}
		});

		return this.cy;
	}

	elementClick(context: HTMLElement) {
		if (this.cy) {
			return this.selectedElement;
		}
	}

	updateData(context: HTMLElement, elements: any[]) {
		if (this.cy) {
			this.cy.elements().remove();
			this.cy.add(elements);
			this.cy.layout({ ...this.cyConfig.layout }).run();
		}
		console.log('Cytoscape config successfully updated!');
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
			elementClick: this.elementClick.bind(this),
			updateData: this.updateData.bind(this),
			getInstance: this.getInstance.bind(this),
			destroy: this.destroy.bind(this),

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
