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
			],
		},
	},
	// create cytoscape config from input (state, pipe etc)
	{
		type: 'InteractionAtom',
		id: 'create-cy-config',
		config: {
			trigger: 'StateChange',
			state: 'cyConfigElementsState',
			action: 'setMethod',
			params: [
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
					},
				},
				{
					source: 'exact',
					value: 'elements',
				},
				{
					source: 'state',
					name: 'cyConfigElementsState',
				},
			],
		},
	},
	// render cytoscape canvas using previously made config
	{
		type: 'InteractionAtom',
		id: 'render-cy-graph',
		config: {
			trigger: null,
			dependencies: ['create-cy-config'],
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
];

export default cyThirdPartAtom;
