import editNodeApiRequestBody from './editNodeRequestBody/editNodeRequestBody';

const editNodeJson = [
	{
		tag: 'edit-node',
		atoms: [
			// styling of create button
			{
				type: 'ContentAtom',
				config: {
					text: 'Edit node: ',
				},
			},
			{
				type: 'ColourAtom',
				config: { role: 'background', value: '#5456c2ff' },
			},
			{
				type: 'TypographyAtom',
				config: {
					role: 'font',
					value: 'sans-serif',
				},
			},
			{
				type: 'LayoutAtom',
				config: {
					position: 'absolute',
					display: 'flex',
					align: 'center',
					gap: '10px',
					padding: '0.5rem 1rem',
					bottom: '5rem',
					right: '2rem',
					color: 'white',
					borderRadius: '10px',
				},
			},

			// interaction on create button starts here =========================
			// Initialize the state to hold node to be created.
			{
				type: 'StateAtom',
				id: 'edit-Node-State-015360f3-bdb9-436a-a8a2-4b9600a62d1f',
				config: {
					op: 'Initialize',
					name: 'editNodeState',
					value: '',
				},
			},
			{
				type: 'StateAtom',
				id: 'create-temp-State',
				config: {
					op: 'Initialize',
					name: 'tempArrayState',
					value: [],
				},
			},
			// create node url part 1
			{
				type: 'InteractionAtom',
				id: 'create-node-url-part-1-1f7ddf40-c7d9-4c70-9c03-a34a7336f89d',
				config: {
					trigger: 'click',
					action: 'concatString',
					params: [
						{
							source: 'exact',
							value: 'https://ig.gov-cloud.ai/pi-ontology-service/node/v1.0/',
						},
						{ source: 'state', name: 'ontologyId' },
					],
				},
			},
			// create node url part 2
			{
				type: 'InteractionAtom',
				id: 'create-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
				config: {
					trigger: null,
					action: 'concatString',
					dependencies: [
						'create-node-url-part-1-1f7ddf40-c7d9-4c70-9c03-a34a7336f89d',
					],
					params: [
						{
							source: 'pipe',
						},
						{ source: 'exact', value: '/update' },
					],
				},
			},
			// create access token
			{
				type: 'InteractionAtom',
				id: 'create-access-token-4e6e533e-c323-46a5-b9a3-8515950ca842',
				config: {
					trigger: null,
					action: 'concatString',
					dependencies: [
						'create-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
					],
					params: [
						{ source: 'exact', value: 'Bearer ' },
						{ source: 'state', name: 'kyaToken' },
					],
				},
			},
			// create api call headers
			{
				type: 'InteractionAtom',
				id: 'create-headers-for-edit-node',
				config: {
					trigger: null,
					dependencies: [
						'create-access-token-4e6e533e-c323-46a5-b9a3-8515950ca842',
					],
					action: 'setMethod',
					params: [
						{
							source: 'exact',
							value: {
								'content-type': 'application/json',
								authorization: '',
							},
						},
						{ source: 'exact', value: 'authorization' },
						{ source: 'pipe' },
					],
				},
			},
			// create request body object
			...editNodeApiRequestBody,
			
			// make edit node api call
			{
				type: 'InteractionAtom',
				id: 'create-node-a6f9b186-574f-469b-b252-dcc1e6140d17',
				config: {
					trigger: null,
					action: 'put',
					dependencies: [
						'create-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
						'create-headers-for-edit-node',
						'edit-req-body-part-7',
					],
					params: [
						// url
						{
							source: 'pipe',
							value: 'create-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
						},
						// request body
						{
							source: 'state',
							name: 'tempArrayState',
						},
						// key of service map, if new service is created
						{
							source: 'exact',
							value: '',
						},
						// request headers
						{
							source: 'pipe',
							value: 'create-headers-for-edit-node',
						},
					],
				},
			},

			// create headers for next api call in pipeline
			{
				type: 'InteractionAtom',
				id: 'create-get-ontology-api-headers',
				config: {
					trigger: null,
					dependencies: [
						'create-access-token-4e6e533e-c323-46a5-b9a3-8515950ca842',
						'create-node-a6f9b186-574f-469b-b252-dcc1e6140d17',
					],
					action: 'setMethod',
					params: [
						{
							source: 'exact',
							value: {
								accept: '*/*',
								'content-type': 'application/json',
								authorization: '',
							},
						},
						{ source: 'exact', value: 'authorization' },
						{
							source: 'pipe',
							value: 'create-access-token-4e6e533e-c323-46a5-b9a3-8515950ca842',
						},
					],
				},
			},

			// set api call request body
			{
				type: 'InteractionAtom',
				id: 'create-req-body-get-ontology-api',
				config: {
					trigger: null,
					dependencies: ['create-get-ontology-api-headers'],
					action: 'setMethod',
					params: [
						{
							source: 'exact',
							value: {
								ontologyId: '',
							},
						},
						{
							source: 'exact',
							value: 'ontologyId',
						},
						{
							source: 'state',
							name: 'ontologyId',
						},
					],
				},
			},

			// make ontology api call
			{
				type: 'InteractionAtom',
				id: 'getOntologyApiCall',
				config: {
					trigger: null,
					dependencies: [
						'create-req-body-get-ontology-api',
						'create-get-ontology-api-headers',
					],
					action: 'post',
					params: [
						// url
						{
							source: 'exact',
							value: 'https://ig.gov-cloud.ai/pi-ontology-service/ontology/v2.0/get?graphDb=NEO4J&outPutType=JSON',
						},
						// req body
						{
							source: 'pipe',
							value: 'create-req-body-get-ontology-api',
						},
						// service map key
						{
							source: 'exact',
							value: '',
						},
						// get headers from above pipeline step
						{
							source: 'pipe',
							value: 'create-get-ontology-api-headers',
						},
					],
				},
			},

			// format ontology api response to cytoscape config
			{
				type: 'InteractionAtom',
				id: 'formatOntologiApiResponse-6afb7d98-8a35-4ac0-8928-b7c84510200e',
				config: {
					trigger: null,
					dependencies: ['getOntologyApiCall'],
					action: 'transformOntologyData',
					params: [
						{
							source: 'pipe',
						},
					],
				},
			},

			// Handle formatted response and store the config in state.
			{
				type: 'InteractionAtom',
				id: 'setStateCyConfig-657a2762-23f1-47b5-9f13-f77971d40a48',
				config: {
					trigger: null,
					action: 'setState',
					dependencies: [
						'formatOntologiApiResponse-6afb7d98-8a35-4ac0-8928-b7c84510200e',
					],
					params: [
						{
							source: 'exact',
							value: 'cyConfigElementsState',
						},
						{
							source: 'pipe',
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
			// clear edit node state and selected nodes state
			{
				type: 'InteractionAtom',
				id: 'update-edit-state-2b6b3512-8b56-4ea3-9c1d-209af2960d20',
				config: {
					trigger: null,
					action: 'setState',
					dependencies: [
						'setStateCyConfig-657a2762-23f1-47b5-9f13-f77971d40a48',
					],
					params: [
						{ source: 'exact', value: 'editNodesState' },
						{ source: 'exact', value: [] },
					],
				},
			},
			{
				type: 'InteractionAtom',
				id: 'update-selected-node-state-2b6b3512-8b56-4ea3-9c1d-209af2960d20',
				config: {
					trigger: null,
					action: 'setState',
					dependencies: [
						'update-edit-state-2b6b3512-8b56-4ea3-9c1d-209af2960d20',
					],
					params: [
						{ source: 'exact', value: 'selectedNode' },
						{ source: 'exact', value: {} },
					],
				},
			},
			{
				type: 'InteractionAtom',
				id: 'update-temp-array-state-2b6b3512-8b56-4ea3-9c1d-209af2960d20',
				config: {
					trigger: null,
					action: 'setState',
					dependencies: [
						'update-edit-state-2b6b3512-8b56-4ea3-9c1d-209af2960d20',
					],
					params: [
						{ source: 'exact', value: 'tempArrayState' },
						{ source: 'exact', value: [] },
					],
				},
			},
		],
		children: [
			{
				tag: 'edit-node-label-input',
				atoms: [
					{
						type: 'attributeAtom',
						id: '8b7d03f0-1f62-437d-9311-ba9a9bf8bc75',
						config: {
							attribute: 'contenteditable',
							value: 'true',
						},
					},
					{
						type: 'LayoutAtom',
						config: {
							'min-width': '3rem',
							border: 'none',
							'border-radius': '8px',
							padding: '8px',
							outline: 'none',
							'background-color': '#dadadaff',
							color: 'black',
						},
					},
					{
						type: 'InteractionAtom',
						id: 'edit-node-input-928fa22d-187a-4063-8801-ea0425256319',
						config: {
							trigger: 'input',
							dependencies: [],
							params: [{}],
							action: 'read',
						},
					},
					{
						type: 'InteractionAtom',
						id: 'edit-node-input-928fa22d-187a-4063-8801-ea0425256319-2',
						config: {
							trigger: null,
							dependencies: [
								'edit-node-input-928fa22d-187a-4063-8801-ea0425256319',
							],
							params: [{ source: 'pipe' }],
							action: 'handleInput',
						},
					},
					{
						type: 'InteractionAtom',
						id: 'edit-node-input-928fa22d-187a-4063-8801-ea0425256319-3',
						config: {
							trigger: null,
							action: 'setState',
							dependencies: [
								'edit-node-input-928fa22d-187a-4063-8801-ea0425256319-2',
							],
							params: [
								{ source: 'exact', value: 'editNodeState' },
								{ source: 'pipe' },
							],
						},
					},
				],
			},
		],
	},
];

export default editNodeJson;
