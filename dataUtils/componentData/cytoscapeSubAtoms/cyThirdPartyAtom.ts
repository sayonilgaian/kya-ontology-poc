const cyThirdPartAtom = [
	// Initialize the state to hold cytoscapeConfig.
	{
		type: 'StateAtom',
		id: 'cyConfigState',
		config: {
			op: 'Initialize',
			name: 'cyConfigState',
			value: {
				elements: [
					{
						group: 'nodes',
						data: {
							id: 'node1',
							label: 'Node 1',
							customProperty: 'value1',
						},
					},
					{
						group: 'nodes',
						data: {
							id: 'node2',
							label: 'Node 2',
							customProperty: 'value2',
						},
					},
					{
						group: 'edges',
						data: {
							id: 'edge1',
							source: 'node1',
							target: 'node2',
							label: 'connects to',
						},
					},
				],
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
	// set up cytoscape canvas in DOM
	{
		type: 'InteractionAtom',
		id: 'setup-cy-container',
		config: {
			trigger: 'OnLoad',
			action: 'callThirdPartyService',
			params: [
				{
					source: 'exact',
					value: 'cy-graph',
				},
				{
					source: 'exact',
					value: 'setContainer',
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
			action: 'setMethod',
			state:'cyConfigState',
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
					name: 'cyConfigState',
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
			dependencies: ['setup-cy-container'],
			action: 'callThirdPartyService',
			params: [
				{
					source: 'exact',
					value: 'cy-graph',
				},
				{
					source: 'exact',
					// value: 'init',
					value: 'updateCyConfig',
				},
				{
					source: 'pipe',
				},
			],
		},
	},
];

export default cyThirdPartAtom;
