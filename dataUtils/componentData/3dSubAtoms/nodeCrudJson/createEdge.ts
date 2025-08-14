const createEdgeJson = [
	{
		tag: 'create-edge',
		atoms: [
			// ---- UI Styling ----
			{ type: 'ContentAtom', config: { text: 'Create Edge:' } },
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
					// display: 'flex',
					align: 'center',
					gap: '16px',
					padding: '0.5rem 1rem',
					borderRadius: '10px',
					position: 'absolute',
					bottom: '6rem',
					left: '2rem',
					color: 'white',
					display: 'grid',
					width: '11rem',
				},
			},

			// ---- State for Inputs & Temp ----
			{
				type: 'StateAtom',
				id: 'edge-name-state',
				config: { op: 'Initialize', name: 'edgeNameState', value: '' },
			},
			{
				type: 'StateAtom',
				id: 'edge-domain-state',
				config: {
					op: 'Initialize',
					name: 'edgeDomainState',
					value: '',
				},
			},
			{
				type: 'StateAtom',
				id: 'edge-range-state',
				config: { op: 'Initialize', name: 'edgeRangeState', value: '' },
			},
			{
				type: 'StateAtom',
				id: 'temp-edge-array',
				config: {
					op: 'Initialize',
					name: 'tempEdgeArrayState',
					value: [],
				},
			},
		],
		children: [
			{
				tag: 'edge-name-input',
				atoms: [
					{
						type: 'LayoutAtom',
						config: {
							'min-width': '3rem',
							border: 'none',
							borderRadius: '8px',
							outline: 'none',
							color: '#fff',
							cursor: 'text',
							display: 'flex',
							gap: '5px',
							'align-items': 'center',
						},
					},
				],
				children: [
					{
						tag: 'edge-name-input',
						atoms: [
							{ type: 'ContentAtom', config: { text: 'Name' } },
							{
								type: 'LayoutAtom',
								config: {
									// 'min-width': '3rem',
									border: 'none',
									borderRadius: '8px',
									// padding: '8px',
									outline: 'none',
									color: '#fff',
									cursor: 'text',
								},
							},
						],
					},
					{
						tag: 'edge-name-input',
						atoms: [
							{ type: 'ContentAtom', config: { text: '' } },
							{
								type: 'attributeAtom',
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
									borderRadius: '8px',
									padding: '8px',
									outline: 'none',
									background: '#fff',
									color: 'black',
									cursor: 'text',
									width: '7rem',
									display: 'flex',
								},
							},
							// input pipeline
							{
								type: 'InteractionAtom',
								id: 'edge-name-input-read',
								config: {
									trigger: 'input',
									action: 'read',
									params: [{}],
								},
							},
							{
								type: 'InteractionAtom',
								id: 'edge-name-handle',
								config: {
									trigger: null,
									dependencies: ['edge-name-input-read'],
									action: 'handleInput',
									params: [{ source: 'pipe' }],
								},
							},
							{
								type: 'InteractionAtom',
								id: 'set-state-edge-name',
								config: {
									trigger: null,
									dependencies: ['edge-name-handle'],
									action: 'setState',
									params: [
										{
											source: 'exact',
											value: 'edgeNameState',
										},
										{ source: 'pipe' },
									],
								},
							},
						],
					},
				],
			},
			{
				tag: 'edge-domain-input',
				atoms: [
					{
						type: 'LayoutAtom',
						config: {
							'min-width': '3rem',
							border: 'none',
							borderRadius: '8px',
							outline: 'none',
							color: '#fff',
							cursor: 'text',
							display: 'flex',
							gap: '5px',
							'justify-content': 'space-between',
							'align-items': 'center',
						},
					},
				],
				children: [
					{
						tag: 'edge-domain-input',
						atoms: [
							{ type: 'ContentAtom', config: { text: 'domain' } },
							{
								type: 'LayoutAtom',
								config: {
									// 'min-width': '3rem',
									border: 'none',
									borderRadius: '8px',
									// padding: '8px',
									outline: 'none',
									color: '#fff',
									cursor: 'text',
								},
							},
						],
					},
					{
						tag: 'edge-domain-input',
						atoms: [
							{ type: 'ContentAtom', config: { text: '' } },
							{
								type: 'attributeAtom',
								config: {
									attribute: 'contenteditable',
									value: 'true',
								},
							},
							{
								type: 'LayoutAtom',
								config: {
									'min-width': '6rem',
									border: 'none',
									borderRadius: '8px',
									padding: '8px',
									outline: 'none',
									background: '#fff',
									color: 'black',
									cursor: 'text',
								},
							},
							{
								type: 'InteractionAtom',
								id: 'edge-domain-input-read',
								config: {
									trigger: 'input',
									action: 'read',
									params: [{}],
								},
							},
							{
								type: 'InteractionAtom',
								id: 'edge-domain-handle',
								config: {
									trigger: null,
									dependencies: ['edge-domain-input-read'],
									action: 'handleInput',
									params: [{ source: 'pipe' }],
								},
							},
							{
								type: 'InteractionAtom',
								id: 'set-state-edge-domain',
								config: {
									trigger: null,
									dependencies: ['edge-domain-handle'],
									action: 'setState',
									params: [
										{
											source: 'exact',
											value: 'edgeDomainState',
										},
										{ source: 'pipe' },
									],
								},
							},
						],
					},
				],
			},
			{
				tag: 'edge-domain-input',
				atoms: [
					{
						type: 'LayoutAtom',
						config: {
							'min-width': '3rem',
							border: 'none',
							borderRadius: '8px',
							outline: 'none',
							color: '#fff',
							cursor: 'text',
							display: 'flex',
							gap: '5px',
							'justify-content': 'space-between',
							'align-items': 'center',
						},
					},
				],
				children: [
					{
						tag: 'edge-domain-input',
						atoms: [
							{ type: 'ContentAtom', config: { text: 'range' } },
							{
								type: 'LayoutAtom',
								config: {
									'min-width': '3rem',
									border: 'none',
									borderRadius: '8px',
									// padding: '8px',
									outline: 'none',
									color: '#fff',
									cursor: 'text',
								},
							},
						],
					},

					{
						tag: 'edge-range-input',
						atoms: [
							{ type: 'ContentAtom', config: { text: '' } },
							{
								type: 'attributeAtom',
								config: {
									attribute: 'contenteditable',
									value: 'true',
								},
							},
							{
								type: 'LayoutAtom',
								config: {
									'min-width': '7rem',
									border: 'none',
									borderRadius: '8px',
									padding: '8px',
									outline: 'none',
									background: '#fff',
									color: 'black',
									cursor: 'text',
								},
							},
							{
								type: 'InteractionAtom',
								id: 'edge-range-input-read',
								config: {
									trigger: 'input',
									action: 'read',
									params: [{}],
								},
							},
							{
								type: 'InteractionAtom',
								id: 'edge-range-handle',
								config: {
									trigger: null,
									dependencies: ['edge-range-input-read'],
									action: 'handleInput',
									params: [{ source: 'pipe' }],
								},
							},
							{
								type: 'InteractionAtom',
								id: 'set-state-edge-range',
								config: {
									trigger: null,
									dependencies: ['edge-range-handle'],
									action: 'setState',
									params: [
										{
											source: 'exact',
											value: 'edgeRangeState',
										},
										{ source: 'pipe' },
									],
								},
							},
						],
					},
				],
			},
			{
				tag: 'edge-button-create',
				atoms: [
					{ type: 'ContentAtom', config: { text: 'Create' } },
					{
						type: 'ColourAtom',
						config: { role: 'background', value: '#0d3b10ff' },
					},
					{
						type: 'LayoutAtom',
						config: {
							'min-width': '3rem',
							border: 'none',
							borderRadius: '8px',
							padding: '8px',
							outline: 'none',
							color: '#fff',
							cursor: 'pointer',
							'text-align': 'center',
						},
					},
					// -- 1. Compose edge property URL --
					{
						type: 'InteractionAtom',
						id: 'edge-url-1-qowkrjoiroi',
						config: {
							trigger: 'click',
							action: 'concatString',
							params: [
								{
									source: 'exact',
									value: 'http://www.semanticweb.org/mdebe/ontologies/example#',
								},
								{ source: 'state', name: 'edgeNameState' },
							],
						},
					},
					// -- 2. Create property object --
					{
						type: 'InteractionAtom',
						id: 'property-object',
						config: {
							trigger: null,
							dependencies: ['edge-url-1-qowkrjoiroi'],
							action: 'setMethod',
							params: [
								{
									source: 'exact',
									value: {
										name: '',
										url: '',
										attributes: {},
										ontologyNodeTypeEnum: 'PROPERTY',
									},
								},
								{ source: 'exact', value: 'url' }, // setMethod: targetObj, property to set, value
								{ source: 'pipe' }, // URL from previous step
							],
						},
					},
					{
						type: 'InteractionAtom',
						id: 'property-object-name',
						config: {
							trigger: null,
							dependencies: ['property-object'],
							action: 'setMethod',
							params: [
								{ source: 'pipe' },
								{ source: 'exact', value: 'name' },
								{ source: 'state', name: 'edgeNameState' },
							],
						},
					},
					// --- 3. Compose domain URL ---
					{
						type: 'InteractionAtom',
						id: 'domain-url-1',
						config: {
							trigger: null,
							dependencies: ['property-object-name'],
							action: 'concatString',
							params: [
								{
									source: 'exact',
									value: 'http://example.org/standardOntology#',
								},
								{ source: 'state', name: 'edgeDomainState' },
							],
						},
					},
					// --- 4. Create domain object ---
					{
						type: 'InteractionAtom',
						id: 'domain-object',
						config: {
							trigger: null,
							dependencies: ['domain-url-1'],
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
						id: 'domain-object-name',
						config: {
							trigger: null,
							dependencies: ['domain-object'],
							action: 'setMethod',
							params: [
								{ source: 'pipe' },
								{ source: 'exact', value: 'name' },
								{ source: 'state', name: 'edgeDomainState' },
							],
						},
					},
					// --- 5. Compose range URL ---
					{
						type: 'InteractionAtom',
						id: 'range-url-1',
						config: {
							trigger: null,
							dependencies: ['domain-object-name'],
							action: 'concatString',
							params: [
								{
									source: 'exact',
									value: 'http://example.org/standardOntology#',
								},
								{ source: 'state', name: 'edgeRangeState' },
							],
						},
					},
					// --- 6. Create range object ---
					{
						type: 'InteractionAtom',
						id: 'range-object',
						config: {
							trigger: null,
							dependencies: ['range-url-1'],
							action: 'setMethod',
							params: [
								{
									source: 'exact',
									value: {
										name: '',
										url: '',
										attributes: {},
										ontologyNodeTypeEnum: 'RESOURCE',
									},
								},
								{ source: 'exact', value: 'url' },
								{ source: 'pipe' },
							],
						},
					},
					{
						type: 'InteractionAtom',
						id: 'range-object-name',
						config: {
							trigger: null,
							dependencies: ['range-object'],
							action: 'setMethod',
							params: [
								{ source: 'pipe' },
								{ source: 'exact', value: 'name' },
								{ source: 'state', name: 'edgeRangeState' },
							],
						},
					},
					// --- 7. Compose the Edge Payload (final object) ---
					{
						type: 'InteractionAtom',
						id: 'compose-edge-payload',
						config: {
							trigger: null,
							dependencies: [
								'property-object-name',
								'domain-object-name',
								'range-object-name',
							],
							action: 'setMethod',
							params: [
								{
									source: 'exact',
									value: {
										properties: {},
										domain: {},
										range: {},
									},
								},
								{ source: 'exact', value: 'properties' },
								{
									source: 'pipe',
									value: 'property-object-name',
								},
							],
						},
					},
					{
						type: 'InteractionAtom',
						id: 'set-domain-on-payload',
						config: {
							trigger: null,
							dependencies: [
								'compose-edge-payload',
								'domain-object-name',
							],
							action: 'setMethod',
							params: [
								{
									source: 'pipe',
									value: 'compose-edge-payload',
								},
								{ source: 'exact', value: 'domain' },
								{ source: 'pipe', value: 'domain-object-name' },
							],
						},
					},
					{
						type: 'InteractionAtom',
						id: 'set-range-on-payload',
						config: {
							trigger: null,
							dependencies: [
								'set-domain-on-payload',
								'range-object-name',
							],
							action: 'setMethod',
							params: [
								{
									source: 'pipe',
									value: 'set-domain-on-payload',
								},
								{ source: 'exact', value: 'range' },
								{ source: 'pipe', value: 'range-object-name' },
							],
						},
					},
					// --- 8. Wrap in array and set state for API ---
					{
						type: 'InteractionAtom',
						id: 'wrap-array',
						config: {
							trigger: null,
							dependencies: ['set-range-on-payload'],
							action: 'pushToArray',
							params: [
								{ source: 'state', name: 'tempEdgeArrayState' },
								{ source: 'pipe' },
							],
						},
					},
					{
						type: 'InteractionAtom',
						id: 'set-edge-payload-state-uiu8000',
						config: {
							trigger: null,
							dependencies: ['wrap-array'],
							action: 'setState',
							params: [
								{
									source: 'exact',
									value: 'tempEdgeArrayState',
								},
								{ source: 'pipe' },
							],
						},
					},
					// --- 8.1 create post api url
					// create node url part 1
					{
						type: 'InteractionAtom',
						id: 'create-node-url-part-1-9809e060-faec-4fce-8079-b6ec9da20252',
						config: {
							trigger: null,
							action: 'concatString',
							dependencies: ['set-edge-payload-state-uiu8000'],
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
						id: 'create-node-url-part-2-c12570d2-17ac-47e6-8c08-8b7d6d3cd499',
						config: {
							trigger: null,
							action: 'concatString',
							dependencies: [
								'create-node-url-part-1-9809e060-faec-4fce-8079-b6ec9da20252',
							],
							params: [
								{
									source: 'pipe',
								},
								{ source: 'exact', value: '/create' },
							],
						},
					},
					// --- 8.2 create post request headers ---
					// create access token
					{
						type: 'InteractionAtom',
						id: 'create-access-token-e702bf46-eb27-4bd4-b949-651b208f287e',
						config: {
							trigger: null,
							action: 'concatString',
							dependencies: [
								'create-node-url-part-2-c12570d2-17ac-47e6-8c08-8b7d6d3cd499',
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
						id: 'create-headers-ae95892d-1018-405f-9cac-38342fb545d9',
						config: {
							trigger: null,
							dependencies: [
								'create-access-token-e702bf46-eb27-4bd4-b949-651b208f287e',
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
					// --- 9. POST the payload ---
					{
						type: 'InteractionAtom',
						id: 'post-create-edge-api',
						config: {
							trigger: null,
							dependencies: [
								'create-node-url-part-2-c12570d2-17ac-47e6-8c08-8b7d6d3cd499', // This holds the api url: ends with '/create'
								'create-headers-ae95892d-1018-405f-9cac-38342fb545d9', // you can reuse "create" header logic from node pipeline
							],
							action: 'post',
							params: [
								{
									source: 'pipe',
									value: 'create-node-url-part-2-c12570d2-17ac-47e6-8c08-8b7d6d3cd499',
								}, // API URL
								{ source: 'state', name: 'tempEdgeArrayState' }, // Payload
								{ source: 'exact', value: '' }, // service map key
								{
									source: 'pipe',
									value: 'create-headers-ae95892d-1018-405f-9cac-38342fb545d9',
								}, // Headers
							],
						},
					},
					// --- 10. clear temp array state ---
					{
						type: 'InteractionAtom',
						id: 'clear-state-tempEdgeArrayState',
						config: {
							trigger: null,
							dependencies: ['post-create-edge-api'],
							action: 'setState',
							params: [
								{
									source: 'exact',
									value: 'tempEdgeArrayState',
								},
								{ source: 'exact', value: [] },
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
								'create-access-token-e702bf46-eb27-4bd4-b949-651b208f287e',
								'clear-state-tempEdgeArrayState',
								'post-create-edge-api',
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
									value: 'create-access-token-e702bf46-eb27-4bd4-b949-651b208f287e',
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
					// {
					// 	type: 'InteractionAtom',
					// 	id: 'clear-state-edgeDomainState',
					// 	config: {
					// 		trigger: null,
					// 		dependencies: ['post-create-edge-api'],
					// 		action: 'setState',
					// 		params: [
					// 			{
					// 				source: 'exact',
					// 				value: 'edgeDomainState',
					// 			},
					// 			{ source: 'exact', value: '' },
					// 		],
					// 	},
					// },
					// {
					// 	type: 'InteractionAtom',
					// 	id: 'clear-state-edgeNameState',
					// 	config: {
					// 		trigger: null,
					// 		dependencies: ['post-create-edge-api'],
					// 		action: 'setState',
					// 		params: [
					// 			{
					// 				source: 'exact',
					// 				value: 'edgeNameState',
					// 			},
					// 			{ source: 'exact', value: '' },
					// 		],
					// 	},
					// },
					// {
					// 	type: 'InteractionAtom',
					// 	id: 'clear-state-edgeRangeState',
					// 	config: {
					// 		trigger: null,
					// 		dependencies: ['post-create-edge-api'],
					// 		action: 'setState',
					// 		params: [
					// 			{
					// 				source: 'exact',
					// 				value: 'edgeRangeState',
					// 			},
					// 			{ source: 'exact', value: '' },
					// 		],
					// 	},
					// },
				],
			},
		],
	},
];

export default createEdgeJson;
