const getKGApiCall = [
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

	// save ontology id in state
	{
		type: 'StateAtom',
		id: 'ontologyIdState',
		config: {
			op: 'Initialize',
			name: 'ontologyId',
			value: '689dd66a2bc8a3006b708060',
		},
	},

	{
		type: 'InteractionAtom',
		id: 'concatString-get-kg-url',
		config: {
			trigger: null,
			dependencies: ['postLoginRequest'],
			params: [
				{
					source: 'exact',
					value: 'https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/schemaId/instances/list?page=0&size=10&ontologyId=',
				},
				{ source: 'state', name: 'ontologyId' },
			],
			action: 'concatString',
		},
	},
	{
		type: 'InteractionAtom',
		id: 'concatString-get-kg-url-2nd-part',
		config: {
			trigger: null,
			dependencies: ['concatString-get-kg-url'],
			params: [
				{ source: 'pipe', value: '' },
				{ source: 'exact', value: '&showPageableMetaData=true' },
			],
			action: 'concatString',
		},
	},

	// make get kg api call
	{
		type: 'InteractionAtom',
		id: 'get-kg-data-api-call',
		config: {
			trigger: null,
			dependencies: ['concatString-get-kg-url-2nd-part','setMethod-87ca0862-2fc6-429d-8c80-1cdb2bc094f5'],
			action: 'post',
			params: [
				// url
				{
					source: 'pipe',
					value: 'concatString-get-kg-url-2nd-part',
				},
				// req body
				{
					source: 'exact',
					value: {
						dbType: 'NEO4J',
						relationsNeeded: true,
					},
				},
                {
					source: 'exact',
					value: '',
				},
				// get headers from above pipeline step
				{
					source: 'pipe',
					value: 'setMethod-87ca0862-2fc6-429d-8c80-1cdb2bc094f5',
				},
			],
		},
	},

	// format ontology api response to 3-d force graph config
	{
		type: 'InteractionAtom',
		id: 'format-kg-data',
		config: {
			trigger: null,
			dependencies: ['get-kg-data-api-call'],
			action: 'transformFlatDataFor3dForce',
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
		id: '3dDataState-api-data-save',
		config: {
			trigger: null,
			action: 'setState',
			dependencies: ['format-kg-data'],
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
];

export default getKGApiCall;
