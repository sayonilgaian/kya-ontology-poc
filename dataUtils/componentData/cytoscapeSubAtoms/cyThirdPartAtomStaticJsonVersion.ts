const cyThirdPartAtomStaticJson = [
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
						elements: [
							{
								group: 'nodes',
								data: {
									id: 'node-id-1',
									label: 'Person',
									customProperty: '',
								},
							},
							{
								group: 'nodes',
								data: {
									id: 'node-id-2',
									label: 'Age',
									customProperty: '',
								},
							},
							{
								group: 'edges',
								data: {
									id: 'edge-id-1',
									source: 'node-id-1',
									target: 'node-id-2',
									label: 'hasAge',
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
			],
		},
	},
];

export default cyThirdPartAtomStaticJson;
