const kgJson = {
	tag: 'cytoscape-graph',
	atoms: [
		// styling
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
					{
						source: 'exact',
						value: 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICI3Ny1NUVdFRTNHZE5adGlsWU5IYmpsa2dVSkpaWUJWVmN1UmFZdHl5ejFjIn0.eyJleHAiOjE3NTE4NTU0NjYsImlhdCI6MTc1MTgxOTQ2NiwianRpIjoiMzEwZmZmNWEtOTlmNy00Y2VlLTg3N2UtOTNiMDUxMzIyMTU4IiwiaXNzIjoiaHR0cDovL2tleWNsb2FrLXNlcnZpY2Uua2V5Y2xvYWsuc3ZjLmNsdXN0ZXIubG9jYWw6ODA4MC9yZWFsbXMvbWFzdGVyIiwiYXVkIjpbIkJPTFRaTUFOTl9CT1RfbW9iaXVzIiwiUEFTQ0FMX0lOVEVMTElHRU5DRV9tb2JpdXMiLCJNT05FVF9tb2JpdXMiLCJWSU5DSV9tb2JpdXMiLCJhY2NvdW50Il0sInN1YiI6IjJjZjc2ZTVmLTI2YWQtNGYyYy1iY2NjLWY0YmMxZTdiZmI2NCIsInR5cCI6IkJlYXJlciIsImF6cCI6IkhPTEFDUkFDWV9tb2JpdXMiLCJzaWQiOiIxOThhNmVhNC01NmM0LTQyZGQtOWEwMC0xYjUwMjZmNTk3ZmMiLCJhY3IiOiIxIiwiYWxsb3dlZC1vcmlnaW5zIjpbIi8qIl0sInJlYWxtX2FjY2VzcyI6eyJyb2xlcyI6WyJkZWZhdWx0LXJvbGVzLW1hc3RlciIsIm9mZmxpbmVfYWNjZXNzIiwidW1hX2F1dGhvcml6YXRpb24iXX0sInJlc291cmNlX2FjY2VzcyI6eyJIT0xBQ1JBQ1lfbW9iaXVzIjp7InJvbGVzIjpbIkhPTEFDUkFDWV9VU0VSIl19LCJCT0xUWk1BTk5fQk9UX21vYml1cyI6eyJyb2xlcyI6WyJCT0xUWk1BTk5fQk9UX1VTRVIiXX0sIlBBU0NBTF9JTlRFTExJR0VOQ0VfbW9iaXVzIjp7InJvbGVzIjpbIlBBU0NBTF9JTlRFTExJR0VOQ0VfVVNFUiJdfSwiTU9ORVRfbW9iaXVzIjp7InJvbGVzIjpbIk1PTkVUX1VTRVIiXX0sIlZJTkNJX21vYml1cyI6eyJyb2xlcyI6WyJWSU5DSV9VU0VSIl19LCJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJyZXF1ZXN0ZXJUeXBlIjoiVEVOQU5UIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsIm5hbWUiOiJBaWR0YWFzIEFpZHRhYXMiLCJ0ZW5hbnRJZCI6IjJjZjc2ZTVmLTI2YWQtNGYyYy1iY2NjLWY0YmMxZTdiZmI2NCIsInBsYXRmb3JtSWQiOiJtb2JpdXMiLCJwcmVmZXJyZWRfdXNlcm5hbWUiOiJwYXNzd29yZF90ZW5hbnRfYWlkdGFhc0BnYWlhbnNvbHV0aW9ucy5jb20iLCJnaXZlbl9uYW1lIjoiQWlkdGFhcyIsImZhbWlseV9uYW1lIjoiQWlkdGFhcyIsImVtYWlsIjoicGFzc3dvcmRfdGVuYW50X2FpZHRhYXNAZ2FpYW5zb2x1dGlvbnMuY29tIn0.GpjiB1qRUjAAIiQaxuS4HLzD7TzMLsIKUn7ffjapU3s-aDg68LYwN8m9ahYNYuGSvz-wU7crWPhwM49j5hhASHcrprQq9qpC3XfZa0eJzZXOdxfN5MuBCfO-IQcP-aAhpWnqdSdIrLbU6VdL63-Va-6pfrFEC_0F0D_dt790rqc0-In6Qz_pMugKWvpcpPwMa4MjNxkGG6Ya_eP6K-mVBrWn_dVsv1UGirp49TF-69fygT823xe0F4xgoWMWc0uqql-Z83Vy5W2MWgLScU9Xi2iJbwlc-BmoyZnSxBFoOp4mmeGCONygU8wlj0TVHo23in1U7DRjxSPzO7dEHHe2cw',
					},
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

		// make kg api call
		{
			type: 'InteractionAtom',
			id: 'getKGApiCall-bd1ce664-c93a-460f-9a68-630b716dd801',
			config: {
				trigger: null,
				dependencies: [
					'setMethod-87ca0862-2fc6-429d-8c80-1cdb2bc094f5',
				],
				action: 'post',
				params: [
					// url
					{
						source: 'exact',
						value: 'https://ig.gov-cloud.ai/pi-entity-instances-service/v2.0/schemas/schemaId/instances/list?page=0&size=10&ontologyId=6892e3f503d2e55af06e3007&showPageableMetaData=true',
					},
					// req body

					{
						source: 'exact',
						value: {
							dbType: 'NEO4J',
							relationsNeeded: true,
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
		//initialize the state to store from the api
		{
			type: 'StateAtom',
			id: 'kgData',
			config: {
				op: 'Initialize',
				name: 'kgData',
				value: null,
			},
		},

		{
			type: 'InteractionAtom',
			id: 'transform-kg-data-e96f81e0-20f6-4e01-a6c6-a0ea40878e',
			config: {
				trigger: null,
				action: 'transformKGData',
				dependencies: [
					'getKGApiCall-bd1ce664-c93a-460f-9a68-630b716dd801',
				],
				params: [
					{
						source: 'pipe',
					},
				],
			},
		},

		{
			type: 'InteractionAtom',
			id: 'save-kg-data-e96f81e0-20f6-4e01-a6c6-a0ea40878e7f',
			config: {
				trigger: null,
				action: 'setState',
				dependencies: [
					'transform-kg-data-e96f81e0-20f6-4e01-a6c6-a0ea40878e',
				],
				params: [
					{
						source: 'exact',
						value: 'kgData',
					},
					{
						source: 'pipe',
					},
				],
			},
		},

		//transform the response in KG data
		{
			type: 'InteractionAtom',
			id: 'transform-kg-data-a730eb91-3497-46dd-975a-70fc021e10ef',
			config: {
				trigger: null,
				dependencies: [],
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
				action: 'callThirdPartyService',
			},
		},
		{
			type: 'ThirdPartyAtom',
			id: 'create-third-party-61271ac7-415e-4960-b46f-7f9fbb43e784',
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
				trigger: 'StateChange',
				state: 'kgData',
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
			trigger: null,
			dependencies: ['setup-cy-container'],
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
					name: 'kgData',
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
					name: 'kgData',
				},
			],
		},
	},
		//
	],
	children: [
		{
			atoms: [{}],
		},
	],
};

export default kgJson;
