const selectedNodeJson = [
	{
		tag: 'selected-node-overlay',
		atoms: [
			// styling
			{
				type: 'ColourAtom',
				config: { role: 'background', value: '#979797ff' },
			},
			{
				type: 'LayoutAtom',
				config: {
					display: 'abolute',
					top: '0',
					right: '0',
				},
			},
			// prepare input for overlay display
			{
				type: 'InteractionAtom',
				id: 'create-overlay-text',
				config: {
					trigger: 'StateChange',
					state: 'selectedNode',
					action: 'concatString',
					params: [
						{
							source: 'exact',
							value: 'Selected: ',
						},
						{
							source: 'state',
							name: 'selectedNode',
						},
					],
				},
			},
			// display overlay text
			{
				type: 'ContentAtom',
				config: {
					trigger: null,
					dependencies: ['create-overlay-text'],
					params: [
						{
							source: 'exact',
							value: 'Selected: ',
						},
						{
							source: 'state',
							name: 'selectedNode',
						},
					],
				},
			},
		],
	},
];

export default selectedNodeJson;
