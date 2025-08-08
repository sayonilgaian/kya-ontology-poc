const ontologyApiCallJson = [
	// Initialize the state to hold the access token.
	{
		type: 'StateAtom',
		id: 'kyaTokenState',
		config: {
			op: 'Initialize',
			name: 'kyaToken',
			value: null,
		},
	},

	// Post request to get kya access token
	{
		type: 'InteractionAtom',
		id: 'postLoginRequest',
		config: {
			trigger: 'OnLoad',
			action: 'post',
			params: [
				// url
				{
					source: 'exact',
					value: 'https://ig.gov-cloud.ai/mobius-iam-service/v1.0/login',
				},
				// req body
				{
					source: 'exact',
					value: {
						userName: 'ksamxp@mobiusdtaas.ai',
						password: 'Gaian@123',
						productId: 'c2255be4-ddf6-449e-a1e0-b4f7f9a2b636',
						requestType: 'TENANT',
					},
				},
				// service map key, if new service is added to service map
				{
					source: 'exact',
					value: '',
				},
				// request headers
				{
					source: 'exact',
					value: {
						accept: '*/*',
						'content-type': 'application/json',
					},
				},
			],
		},
	},

	// extract accessToken from response body of previous api call
	{
		type: 'InteractionAtom',
		id: 'getAccessToken',
		config: {
			trigger: null,
			dependencies: ['postLoginRequest'],
			action: 'getMethod',
			params: [
				{ source: 'pipe' },
				{ source: 'exact', value: 'accessToken' },
			],
		},
	},

	// Handle the response and store the token in state.
	{
		type: 'InteractionAtom',
		id: 'handleLoginResponse',
		config: {
			trigger: null,
			action: 'setState',
			dependencies: ['getAccessToken'],
			params: [
				{
					source: 'exact',
					value: 'kyaToken',
				},
				{
					source: 'pipe',
				},
			],
		},
	},

	// create bearer token for next api call in pipeline
	{
		type: 'InteractionAtom',
		id: 'concatString',
		config: {
			trigger: null,
			dependencies: ['handleLoginResponse'],
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
		id: 'setMethod-87ca0862-2fc6-429d-8c80-1cdb2bc094f5',
		config: {
			trigger: null,
			dependencies: ['concatString'],
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

	// make ontology api call
	{
		type: 'InteractionAtom',
		id: 'getOntologyApiCall',
		config: {
			trigger: null,
			dependencies: ['setMethod-87ca0862-2fc6-429d-8c80-1cdb2bc094f5'],
			action: 'post',
			params: [
				// url
				{
					source: 'exact',
					value: 'https://ig.gov-cloud.ai/pi-ontology-service/ontology/v2.0/get?graphDb=NEO4J&outPutType=JSON',
				},
				// req body
				{
					source: 'exact',
					value: {
						ontologyId: '6891a09c03d2e55af06e2fff',
					},
				},
				// service map key
				{
					source: 'exact',
					value: '',
				},
				// get headers from above pipeline step
				{
					source: 'pipe',
				},
			],
		},
	},

	{
		type: 'InteractionAtom',
		id: 'save-ontology-data-from-api',
		config: {
			trigger: null,
			action: 'setState',
			dependencies: ['getOntologyApiCall'],
			params: [
				{
					source: 'exact',
					value: 'cyConfigElementsState',
				},
				{
					source: 'pipe',
					value:''
				},
			],
		},
	},

	// // format ontology api response to cytoscape config
	{
		type: 'InteractionAtom',
		id: 'formatOntologiApiResponse',
		config: {
			trigger: null,
			dependencies: ['save-ontology-data-from-api'],
			action: 'transformOntologyData',
			params: [
				{
					source: 'pipe',
				},
			],
		},
	},
	{
		type: 'InteractionAtom',
		id: 'set-new-format-in-object',
		config: {
			trigger: null,
			dependencies: ['formatOntologiApiResponse'],
			action: 'setMethod',
			params: [
				{
					source: 'state',
					name: 'cyConfigElementsState'},
				{ source: 'exact', value: 'element' },
				{ source: 'pipe' },
			],
		},
	},
		{
		type: 'InteractionAtom',
		id: 'save-ontology-data-after-transformed',
		config: {
			trigger: null,
			action: 'setState',
			dependencies: ['set-new-format-in-object'],
			params: [
				{
					source: 'exact',
					value: 'cyConfigElementsState',
				},
				{
					source: 'pipe',
					value:''
				},
			],
		},
	},

	


	// save ontology id in state
	{
		type: 'StateAtom',
		id: 'ontologyIdState',
		config: {
			op: 'Initialize',
			name: 'ontologyId',
			value: '6891a09c03d2e55af06e2fff',
		},
	},
	

	// {
	// 	type: 'InteractionAtom',
	// 	id: 'get-class-list',
	// 	config: {
	// 		trigger: null,
	// 		dependencies: ['getOntologyApiCall'],
	// 		action: 'getMethod',
	// 		params: [{ source: 'pipe' }, { source: 'exact', value: 'classes' }],
	// 	},
	// },
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'set-classlist-in-object',
	// 	config: {
	// 		trigger: null,
	// 		dependencies: ['get-class-list'],
	// 		action: 'setMethod',
	// 		params: [
	// 			{
	// 				source: 'exact',
	// 				value: {
	// 					classes: [],
	// 					properties: [],
	// 					formatOntologyData: []
	// 				},
	// 			},
	// 			{ source: 'exact', value: 'classes' },
	// 			{ source: 'pipe' },
	// 		],
	// 	},
	// },
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'setStateCyConfig-01',
	// 	config: {
	// 		trigger: null,
	// 		action: 'setState',
	// 		dependencies: ['set-classlist-in-object'],
	// 		params: [
	// 			{
	// 				source: 'exact',
	// 				value: 'cyConfigElementsState',
	// 			},
	// 			{
	// 				source: 'pipe',
	// 				value:''
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'get-properties-list',
	// 	config: {
	// 		trigger: null,
	// 		dependencies: ['setStateCyConfig-01', ''],
	// 		action: 'getMethod',
	// 		params: [{ source: 'pipe' }, { source: 'exact', value: 'properties' }],
	// 	},
	// },
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'set-properties-in-object',
	// 	config: {
	// 		trigger: null,
	// 		dependencies: ['setStateCyConfig-01'],
	// 		action: 'setMethod',
	// 		params: [
	// 			{
	// 				source: 'state',
	// 				name:'cyConfigElementsState',
	// 			},
	// 			{ source: 'exact', value: 'properties' },
	// 			{ source: 'pipe' },
	// 		],
	// 	},
	// },
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'setStateCyConfig-02',
	// 	config: {
	// 		trigger: null,
	// 		action: 'setState',
	// 		dependencies: ['set-properties-in-object'],
	// 		params: [
	// 			{
	// 				source: 'exact',
	// 				value: 'cyConfigElementsState',
	// 			},
	// 			{
	// 				source: 'pipe',
	// 				value:''
	// 			},
	// 		],
	// 	},
	// },
	// // format ontology api response to cytoscape config
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'formatOntologiApiResponse',
	// 	config: {
	// 		trigger: null,
	// 		dependencies: ['getOntologyApiCall'],
	// 		action: 'transformOntologyData',
	// 		params: [
	// 			{
	// 				source: 'pipe',
	// 			},
	// 		],
	// 	},
	// },
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'set-formatOntologyData-in-object',
	// 	config: {
	// 		trigger: null,
	// 		dependencies: ['setStateCyConfig-02' , 'formatOntologiApiResponse'],
	// 		action: 'setMethod',
	// 		params: [
	// 			{
	// 				source: 'state',
	// 				name:'cyConfigElementsState',
	// 			},
	// 			{ source: 'exact', value: 'formatOntologyData' },
	// 			{ source: 'pipe' , value:'formatOntologiApiResponse'},
	// 		],
	// 	},
	// },
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'setStateCyConfig-01',
	// 	config: {
	// 		trigger: null,
	// 		action: 'setState',
	// 		dependencies: ['set-formatOntologyData-in-object'],
	// 		params: [
	// 			{
	// 				source: 'exact',
	// 				value: 'cyConfigElementsState',
	// 			},
	// 			{
	// 				source: 'pipe',
	// 				value:''
	// 			},
	// 		],
	// 	},
	// },

	// Handle formatted response and store the token in state.
	// {
	// 	type: 'InteractionAtom',
	// 	id: 'setStateCyConfig',
	// 	config: {
	// 		trigger: null,
	// 		action: 'setState',
	// 		dependencies: ['set-classlist-in-object'],
	// 		params: [
	// 			{
	// 				source: 'exact',
	// 				value: 'cyConfigElementsState',
	// 			},
	// 			{
	// 				source: 'pipe',
	// 				value:'set-classlist-in-object'
	// 			},
	// 		],
	// 	},
	// },
];

export default ontologyApiCallJson;
