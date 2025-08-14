const createNodeJson = [
	{
		tag: 'create-node',
		atoms: [
			// styling of create button
			{
				type: 'ContentAtom',
				config: {
					text: 'Create node: ',
				},
			},
			{
				type: 'ColourAtom',
				config: { role: 'background', value: '#005a08ff' },
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
					bottom: '9rem',
					right: '2rem',
					color: 'white',
					borderRadius: '10px',
					cursor: 'pointer',
				},
			},

			// interaction on create button starts here =========================
			// Initialize the state to hold node to be created.
			{
				type: 'StateAtom',
				id: 'create-Node-State-015360f3-bdb9-436a-a8a2-4b9600a62d1f',
				config: {
					op: 'Initialize',
					name: 'createNodeState',
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
						{ source: 'exact', value: '/create' },
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
				id: 'create-headers-bf127fc7-04fd-4011-a82a-e21e4fc68ccb',
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
			{
				type: 'InteractionAtom',
				id: 'create-req-body-part-1-bf127fc7-04fd-4011-a82a-e21e4fc68ccb',
				config: {
					trigger: null,
					action: 'concatString',
					dependencies: [
						'create-headers-bf127fc7-04fd-4011-a82a-e21e4fc68ccb',
					],
					params: [
						{
							source: 'exact',
							value: 'http://www.semanticweb.org/mdebe/ontologies/example#',
						},
						{ source: 'state', name: 'createNodeState' },
					],
				},
			},
			{
				type: 'InteractionAtom',
				id: 'create-req-body-part-2-bc73957f-7b72-4023-bd60-d9a2b65193f4',
				config: {
					trigger: null,
					dependencies: [
						'create-req-body-part-1-bf127fc7-04fd-4011-a82a-e21e4fc68ccb',
					],
					action: 'setMethod',
					params: [
						{
							source: 'exact',
							value: {
								name: '',
								url: '',
								attributes: {},
								ontologyNodeTypeEnum: 'CLASS',
							},
						},
						{ source: 'exact', value: 'url' },
						{ source: 'pipe' },
					],
				},
			},
			{
				type: 'InteractionAtom',
				id: 'create-req-body-part-3-40706680-6b9b-4e25-8e80-4943a016f796',
				config: {
					trigger: null,
					dependencies: [
						'create-req-body-part-2-bc73957f-7b72-4023-bd60-d9a2b65193f4',
					],
					action: 'setMethod',
					params: [
						{
							source: 'pipe',
						},
						{ source: 'exact', value: 'name' },
						{ source: 'state', name: 'createNodeState' },
					],
				},
			},
			{
				type: 'InteractionAtom',
				id: 'create-req-body-part-4-56dbf607-6e12-4b84-bf06-2dfe4a214681',
				config: {
					trigger: null,
					dependencies: [
						'create-req-body-part-3-40706680-6b9b-4e25-8e80-4943a016f796',
					],
					action: 'setMethod',
					params: [
						{
							source: 'exact',
							value: {
								properties: {},
							},
						},
						{ source: 'exact', value: 'properties' },
						{ source: 'pipe' },
					],
				},
			},
			{
				type: 'InteractionAtom',
				id: 'create-req-body-part-5',
				config: {
					trigger: null,
					dependencies: [
						'create-req-body-part-4-56dbf607-6e12-4b84-bf06-2dfe4a214681',
					],
					action: 'pushToArray',
					params: [
						{
							source: 'state',
							name: 'tempArrayState',
						},
						{ source: 'pipe' },
					],
				},
			},
			{
				type: 'InteractionAtom',
				id: 'create-req-body-part-6',
				config: {
					trigger: null,
					dependencies: ['create-req-body-part-5'],
					action: 'setState',
					params: [
						{
							source: 'exact',
							value: 'tempArrayState',
						},
						{ source: 'pipe' },
					],
				},
			},
			// make create api call
			{
				type: 'InteractionAtom',
				id: 'create-node-a6f9b186-574f-469b-b252-dcc1e6140d17',
				config: {
					trigger: null,
					action: 'post',
					dependencies: [
						'create-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
						'create-headers-bf127fc7-04fd-4011-a82a-e21e4fc68ccb',
						'create-req-body-part-6',
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
							value: 'create-headers-bf127fc7-04fd-4011-a82a-e21e4fc68ccb',
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
					action: 'transformOntologyDatafor3dForce',
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
							value: '3dDataState',
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
					state: '3dDataState',
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
							name: '3dDataState',
						},
					],
				},
			},
			// clear delete nodes state and selected nodes state
			{
				type: 'InteractionAtom',
				id: 'update-delete-state-2b6b3512-8b56-4ea3-9c1d-209af2960d20',
				config: {
					trigger: null,
					action: 'setState',
					dependencies: [
						'setStateCyConfig-657a2762-23f1-47b5-9f13-f77971d40a48',
					],
					params: [
						{ source: 'exact', value: 'deleteNodesState' },
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
						'update-delete-state-2b6b3512-8b56-4ea3-9c1d-209af2960d20',
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
						'update-delete-state-2b6b3512-8b56-4ea3-9c1d-209af2960d20',
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
				tag: 'create-node-label-input',
				atoms: [
					{
						type: 'attributeAtom',
						id: '7ed40074-53d7-489d-821a-f06775c39260',
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
							'background-color': '#ffffffff',
							color: 'black',
							cursor: 'text',
						},
					},
					{
						type: 'InteractionAtom',
						id: 'create-node-input-928fa22d-187a-4063-8801-ea0425256319',
						config: {
							trigger: 'input',
							dependencies: [],
							params: [{}],
							action: 'read',
						},
					},
					{
						type: 'InteractionAtom',
						id: 'create-node-input-928fa22d-187a-4063-8801-ea0425256319-2',
						config: {
							trigger: null,
							dependencies: [
								'create-node-input-928fa22d-187a-4063-8801-ea0425256319',
							],
							params: [{ source: 'pipe' }],
							action: 'handleInput',
						},
					},
					{
						type: 'InteractionAtom',
						id: 'create-node-input-928fa22d-187a-4063-8801-ea0425256319-3',
						config: {
							trigger: null,
							action: 'setState',
							dependencies: [
								'create-node-input-928fa22d-187a-4063-8801-ea0425256319-2',
							],
							params: [
								{ source: 'exact', value: 'createNodeState' },
								{ source: 'pipe' },
							],
						},
					},
				],
			},
		],
	},
];

export default createNodeJson;
