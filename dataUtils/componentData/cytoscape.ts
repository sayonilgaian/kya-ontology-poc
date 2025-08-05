import cyThirdPartAtom from './cyThirdPartyAtom';

const cytoscapeGraph = {
	tag: 'cytoscape-graph',
	atoms: [
		{
			type: 'ColourAtom',
			config: { role: 'background', value: '#202939' },
		},
		{
			type: 'LayoutAtom',
			config: {
				display: 'flex',
				width: '100%',
				height: '100%',
				justify: 'center',
				align: 'center',
			},
		},
		// Initialize the state to hold the token.
		{
			type: 'StateAtom',
			id: 'kyaTokenState',
			config: {
				op: 'Initialize',
				name: 'kyaToken',
				value: '',
			},
		},

		// Use an APIAtom to set a service-specific header.
		// This sets the headers for all API calls.
		{
			type: 'APIAtom',
			id: 'setApiHeaders',
			config: {
				op: 'SetHeaders',
				value: { 'Content-Type': 'application/json' },
			},
		},

		// Make the POST request. This request will use the headers
		{
			type: 'InteractionAtom',
			id: 'postLoginRequest',
			config: {
				trigger: 'OnLoad',
				action: 'post',
				params: [
					{
						source: 'exact',
						value: 'https://ig.gov-cloud.ai/mobius-iam-service/v1.0/login',
					},
					{
						source: 'exact',
						value: {
							userName: 'ksamxp@mobiusdtaas.ai',
							password: 'Gaian@123',
							productId: 'c2255be4-ddf6-449e-a1e0-b4f7f9a2b636',
							requestType: 'TENANT',
						},
					},
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
				dependencies: ['postLoginRequest'],
				params: [
					{
						source: 'state',
						name: 'kyaToken',
						value: 'kyaToken',
					},
					{
						source: 'pipe',
						value: 'postLoginRequest',
						path: 'accessToken',
					},
				],
			},
		},

		...cyThirdPartAtom,
	],
	children: [
		{
			atoms: [{}],
		},
	],
};

export default cytoscapeGraph;
