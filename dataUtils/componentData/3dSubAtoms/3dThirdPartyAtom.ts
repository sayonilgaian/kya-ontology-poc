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
	// {
	// 	type: 'StateAtom',
	// 	id: 'deleteNodesState-94771855-da21-4b78-b98b-692366f3dd3e',
	// 	config: {
	// 		op: 'Initialize',
	// 		name: 'selectedNodeState',
	// 		value: {},
	// 	},
	// },
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
					source:'exact',
					value:{}
				}
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
					value: 'elementClick',
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
					value: 'selectedNodeState',
				},
				{
					source: 'pipe',
				},
			],
		},
	},
];

export default ThirdPartyAtom3d;
