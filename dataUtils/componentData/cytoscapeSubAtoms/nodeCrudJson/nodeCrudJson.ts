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
			// create delete node url part 1
			{
				type: 'InteractionAtom',
				id: 'create-delete-node-url-part-1',
				config: {
					trigger: 'click',
					action: 'concatString',
					dependencies: [],
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
			// make api call
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
							source: 'exact',
							value: ['LayerThickness'],
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
		],
	},
];

export default nodeCrudJson;
