const nodeCrudJson = [
	{
		tag: 'delete-node',
		atoms: [
			// styling of delete button
			{
				type: 'ContentAtom',
				config: {
					text: 'Delete',
				},
			},
			{
				type: 'ColourAtom',
				config: { role: 'background', value: '#6d0808ff' },
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
					padding: '0.5rem 1rem',
					bottom: '2rem',
					right: '2rem',
					color: 'white',
				},
			},

			// interaction on delete button starts here =========================
			// Initialize the state to hold nodes to be deleted.
			{
				type: 'StateAtom',
				id: 'deleteNodesState-e5520008-410b-4f6f-a39d-54be90a463e7',
				config: {
					op: 'Initialize',
					name: 'deleteNodesState',
					value: [],
				},
			},
			// extract delete node name/label from node data
			{
				type: 'InteractionAtom',
				id: 'getNodeName-97cef045-3335-43e9-8587-f85504cbcdee',
				config: {
					trigger: 'click',
					action: 'getMethod',
					params: [
						{ source: 'state', name: 'selectedNodeState' },
						{ source: 'exact', value: 'label' },
					],
				},
			},
			// push to state array
			{
				type: 'InteractionAtom',
				id: 'pushNodeName-97cef045-3335-43e9-8587-f85504cbcdee',
				config: {
					trigger: null,
					action: 'pushToArray',
					dependencies: [
						'getNodeName-97cef045-3335-43e9-8587-f85504cbcdee',
					],
					params: [
						{ source: 'state', name: 'deleteNodesState' },
						{ source: 'pipe' },
					],
				},
			},
			// update delete node State
			{
				type: 'InteractionAtom',
				id: 'update-delete-state-bba5c0eb-bae2-42d9-973e-148d1153bb82',
				config: {
					trigger: null,
					action: 'setState',
					dependencies: [
						'pushNodeName-97cef045-3335-43e9-8587-f85504cbcdee',
					],
					params: [
						{ source: 'exact', value: 'deleteNodesState' },
						{ source: 'pipe' },
					],
				},
			},
			// create delete node url part 1
			{
				type: 'InteractionAtom',
				id: 'create-delete-node-url-part-1',
				config: {
					trigger: null,
					action: 'concatString',
					dependencies: [
						'update-delete-state-bba5c0eb-bae2-42d9-973e-148d1153bb82',
					],
					params: [
						{
							source: 'exact',
							value: 'https://ig.gov-cloud.ai/pi-ontology-service/node/v1.0/',
						},
						{ source: 'state', name: 'ontologyId' },
					],
				},
			},
			// create delete node url part 2
			{
				type: 'InteractionAtom',
				id: 'create-delete-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
				config: {
					trigger: null,
					action: 'concatString',
					dependencies: ['create-delete-node-url-part-1'],
					params: [
						{
							source: 'pipe',
						},
						{ source: 'exact', value: '/delete' },
					],
				},
			},
			// create access token
			{
				type: 'InteractionAtom',
				id: 'create-access-token-dfdee895-76b0-404b-ad60-f40c0d1c4811',
				config: {
					trigger: null,
					action: 'concatString',
					dependencies: [
						'create-delete-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
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
				id: 'create-headers-ef362ff4-73af-4ef3-a086-bbfc7e778d0a',
				config: {
					trigger: null,
					dependencies: [
						'create-access-token-dfdee895-76b0-404b-ad60-f40c0d1c4811',
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
						{ source: 'pipe' },
					],
				},
			},
			// make delete api call
			{
				type: 'InteractionAtom',
				id: 'deleteNodeReuest-a6f9b186-574f-469b-b252-dcc1e6140d17',
				config: {
					trigger: null,
					action: 'deleteCall',
					dependencies: [
						'create-delete-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
						'create-headers-ef362ff4-73af-4ef3-a086-bbfc7e778d0a',
					],
					params: [
						// url
						{
							source: 'pipe',
							value: 'create-delete-node-url-part-2-9f3154a5-53a9-4d4c-8eb7-8900d2dc2fb3',
						},
						// request body
						{
							source: 'state',
							name: 'deleteNodesState',
						},
						// key of service map, if new service is created
						{
							source: 'exact',
							value: '',
						},
						// request headers
						{
							source: 'pipe',
							value: 'create-headers-ef362ff4-73af-4ef3-a086-bbfc7e778d0a',
						},
					],
				},
			},
			// create bearer token for next api call in pipeline
			{
				type: 'InteractionAtom',
				id: 'concatString-create-bearer-token-83edb680-6b8a-42aa-88ea-2aba2fe0c508',
				config: {
					trigger: null,
					dependencies: [
						'deleteNodeReuest-a6f9b186-574f-469b-b252-dcc1e6140d17',
					],
					params: [
						{ source: 'exact', value: 'Bearer ' },
						{ source: 'state', name: 'kyaToken' },
					],
					action: 'concatString',
				},
			},

			// create headers for next api call in pipeline
			{
				type: 'InteractionAtom',
				id: 'setMethod-904a982d-425a-4f93-92a9-8dfd0d7edae9',
				config: {
					trigger: null,
					dependencies: [
						'concatString-create-bearer-token-83edb680-6b8a-42aa-88ea-2aba2fe0c508',
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
						{ source: 'pipe' },
					],
				},
			},
			// set api call request body
			{
				type: 'InteractionAtom',
				id: 'create-req-body-get-ontology-api',
				config: {
					trigger: null,
					dependencies: [
						'setMethod-904a982d-425a-4f93-92a9-8dfd0d7edae9',
					],
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
						'setMethod-904a982d-425a-4f93-92a9-8dfd0d7edae9',
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
							value: 'setMethod-904a982d-425a-4f93-92a9-8dfd0d7edae9',
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

			// Handle formatted response and store the token in state.
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
		],
	},
];

export default nodeCrudJson;
