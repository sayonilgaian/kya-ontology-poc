const ThirdPartyAtom3d = [
	// Initialize the state to hold 3d-graph.
	{
		type: 'StateAtom',
		id: '3dDataState',
		config: {
			op: 'Initialize',
			name: '3dDataState',
			value: {
				elements: [],
			},
		},
	},
	// // Initialize the state to hold nodes to be deleted.
	{
		type: 'StateAtom',
		id: 'selected-node-2bf36b53-984c-4eef-9a73-98a1346c266a',
		config: {
			op: 'Initialize',
			name: 'selectedElementState3d',
			value: {},
		},
	},
	// use third part library
	{
		type: 'ThirdPartyAtom',
		id: 'import-3d-lib',
		config: {
			op: 'Create',
			thirdPartyLibraryName: '3dForceGraph',
			name: 'graph-3d',
		},
	},
	// set up 3-d canvas in DOM on Load
	{
		type: 'InteractionAtom',
		id: 'setup-3d-container',
		config: {
			trigger: 'OnLoad',
			state: '3dDataState',
			action: 'callThirdPartyService',
			params: [
				{
					source: 'exact',
					value: 'graph-3d',
				},
				{
					source: 'exact',
					value: 'init',
				},
				{
					source: 'exact',
					value: {
						width: '100%',
						height: '100%',
						nodeColor: 'red',
						nodeRadius: 5,
						linkWidth: 1,
						linkColor: '#c0c0c0ff',
						backgroundColor: '#ffffffff',
						nodeLabelFontColor: '#5c0000ff',
						linkResolution: 12,
						linkOpacity: 1,
						linkLabelFontSize: 30,
						linkLabelFontColor: '#525252ff',
						linkLabelOffset: 5,
						linkLength: 120,
					},
				},
			],
		},
	},
	// render 3-d  canvas using previously made config and updates elements state after api call
	{
		type: 'InteractionAtom',
		id: 'render-graph-3d',
		config: {
			trigger: 'StateChange',
			state: '3dDataState',
			action: 'callThirdPartyService',
			params: [
				{
					source: 'exact',
					value: 'graph-3d',
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
	// add on node click function
	{
		type: 'InteractionAtom',
		id: 'register-on-node-click-3040cdb6-d161-4ea9-94e6-ee0022b39eef',
		config: {
			trigger: 'click',
			action: 'callThirdPartyService',
			params: [
				{
					source: 'exact',
					value: 'graph-3d',
				},
				{
					source: 'exact',
					value: 'onElementClick',
				},
			],
		},
	},
	// Handle formatted response and store the token in state.
	{
		type: 'InteractionAtom',
		id: 'set-selected-node-state-175609cd-73cf-45a4-8eac-84451d82747a',
		config: {
			trigger: null,
			action: 'setState',
			dependencies: [
				'register-on-node-click-3040cdb6-d161-4ea9-94e6-ee0022b39eef',
			],
			params: [
				{
					source: 'exact',
					value: 'selectedElementState3d',
				},
				{
					source: 'pipe',
					value:'register-on-node-click-3040cdb6-d161-4ea9-94e6-ee0022b39eef'
				},
			],
		},
	}
];

export default ThirdPartyAtom3d;
