const cyThirdPartAtom = [
	// Initialize the state to hold cytoscapeConfig.
	{
		type: 'StateAtom',
		id: 'cyConfigElementsState',
		config: {
			op: 'Initialize',
			name: 'cyConfigElementsState',
			value: {
				elements: [],
			},
		},
	},
	// Initialize the state to hold nodes to be deleted.
	{
		type: 'StateAtom',
		id: 'deleteNodesState-94771855-da21-4b78-b98b-692366f3dd3e',
		config: {
			op: 'Initialize',
			name: 'deleteNodeState',
			value: [],
		},
	},
	// use third part library
	{
		type: 'ThirdPartyAtom',
		id: 'import-cy-library',
		config: {
			op: 'Create',
			thirdPartyLibraryName: 'cytoscape',
			name: 'cy-graph',
		},
	},
	// set up cytoscape canvas in DOM on Load
	{
		type: 'InteractionAtom',
		id: 'setup-cy-container',
		config: {
			trigger: 'OnLoad',
			state: 'cyConfigElementsState',
			action: 'callThirdPartyService',
			params: [
				{
					source: 'exact',
					value: 'cy-graph',
				},
				{
					source: 'exact',
					value: 'init',
				},
				{
					source: 'exact',
					value: {
						layout: {
							name: 'cose',
							idealEdgeLength: 100,
							nodeOverlap: 20,
							refresh: 20,
							fit: true,
							padding: 30,
							randomize: false,
							componentSpacing: 40,
							nodeRepulsion: 400000,
							edgeElasticity: 100,
							nestingFactor: 5,
							gravity: 80,
							numIter: 1000,
							initialTemp: 200,
							coolingFactor: 0.95,
							minTemp: 1.0,
						},
						style: [
							{
								selector: 'node',
								style: {
									'background-color': '#666',
									label: 'data(label)',
									'text-valign': 'center',
									'text-halign': 'center',
									color: '#fff',
									'font-size': 12,
									width: 30,
									height: 30,
								},
							},
							{
								selector: 'edge',
								style: {
									width: 2,
									'line-color': '#ccc',
									'target-arrow-color': '#ccc',
									'target-arrow-shape': 'triangle',
									'curve-style': 'bezier',
									label: 'data(label)',
									'font-size': 10,
									color: '#666',
								},
							},
						],
						zoom: 1,
						pan: { x: 0, y: 0 },
						minZoom: 0.1,
						maxZoom: 3,
						zoomingEnabled: true,
						userZoomingEnabled: true,
						panningEnabled: true,
						userPanningEnabled: true,
						boxSelectionEnabled: true,
						selectionType: 'single',
						autoungrabify: false,
						autounselectify: false,
						elements: [],
						onNodeClick: {
							state: 'deleteNodeState',
						},
					},
				},
			],
		},
	},
	// render cytoscape canvas using previously made config and updates elements state after api call
	{
		type: 'InteractionAtom',
		id: 'render-cy-graph',
		config: {
			trigger: 'StateChange',
			state: 'cyConfigElementsState',
			action: 'callThirdPartyService',
			params: [
				{
					source: 'exact',
					value: 'cy-graph',
				},
				{
					source: 'exact',
					value: 'updateData',
				},
				{
					source: 'state',
					name: 'cyConfigElementsState',
				},
			],
		},
	},
	{
		type: 'InteractionAtom',
		id: 'register-on-node-click',
		config: {
			trigger: 'click',
			action: 'callThirdPartyService',
			params: [
				{
					source: 'exact',
					value: 'cy-graph',
				},
				{
					source: 'exact',
					value: 'nodeClick',
				},
			],
		},
	},
	// Handle formatted response and store the token in state.
	{
		type: 'InteractionAtom',
		id: 'set',
		config: {
			trigger: null,
			action: 'setState',
			dependencies: ['register-on-node-click'],
			params: [
				{
					source: 'exact',
					value: 'deleteNodeState',
				},
				{
					source: 'pipe',
				},
			],
		},
	},
];

export default cyThirdPartAtom;
