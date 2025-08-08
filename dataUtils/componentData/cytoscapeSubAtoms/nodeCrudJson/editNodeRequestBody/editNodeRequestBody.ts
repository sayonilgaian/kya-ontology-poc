const editNodeApiRequestBody = [
	// create ontology ref url from user input
	// e.g. http://www.semanticweb.org/mdebe/ontologies/example#userInput
	{
		type: 'InteractionAtom',
		id: 'edit-req-body-part-1',
		config: {
			trigger: null,
			action: 'concatString',
			dependencies: ['create-headers-for-edit-node'],
			params: [
				{
					source: 'exact',
					value: 'http://www.semanticweb.org/mdebe/ontologies/example#',
				},
				{ source: 'state', name: 'editNodeState' },
			],
		},
	},
	// create properties object in api request body by inserting ref url
	{
		type: 'InteractionAtom',
		id: 'edit-req-body-part-2',
		config: {
			trigger: null,
			dependencies: ['edit-req-body-part-1'],
			action: 'setMethod',
			params: [
				{
					source: 'exact',
					value: {
						name: '',
						url: '',
						attributes: {},
					},
				},
				{ source: 'exact', value: 'url' },
				{ source: 'pipe' },
			],
		},
	},
	// update properties object in api request body by inserting name
	{
		type: 'InteractionAtom',
		id: 'edit-req-body-part-3',
		config: {
			trigger: null,
			dependencies: ['edit-req-body-part-2'],
			action: 'setMethod',
			params: [
				{
					source: 'pipe',
				},
				{ source: 'exact', value: 'name' },
				{ source: 'state', name: 'editNodeState' },
			],
		},
	},
	// create api request body object in api request body by inserting name
	{
		type: 'InteractionAtom',
		id: 'edit-req-body-part-4',
		config: {
			trigger: null,
			dependencies: ['edit-req-body-part-3'],
			action: 'setMethod',
			params: [
				{
					source: 'exact',
					value: {
						oldNodeName: '',
						oldNodeLabel: 'CLASS',
						properties: {},
					},
				},
				{ source: 'exact', value: 'properties' },
				{ source: 'pipe' },
			],
		},
	},
	// extract node label frm selected node state
	{
		type: 'InteractionAtom',
		id: 'edit-req-body-part-4-1',
		config: {
			trigger: null,
			dependencies: ['edit-req-body-part-4'],
			action: 'getMethod',
			params: [
				{ source: 'state', name: 'selectedNodeState' },
				{ source: 'exact', value: 'label' },
			],
		},
	},
	// update api request body object in api request body by updating oldNodeName
	{
		type: 'InteractionAtom',
		id: 'edit-req-body-part-5',
		config: {
			trigger: null,
			dependencies: ['edit-req-body-part-4-1', 'edit-req-body-part-4'],
			action: 'setMethod',
			params: [
				{
					source: 'pipe',
					value: 'edit-req-body-part-4',
				},
				{ source: 'exact', value: 'oldNodeName' },
				{ source: 'pipe', value: 'edit-req-body-part-4-1' },
			],
		},
	},
	// push request body object to an emoty array
	{
		type: 'InteractionAtom',
		id: 'edit-req-body-part-6',
		config: {
			trigger: null,
			dependencies: ['edit-req-body-part-5'],
			action: 'pushToArray',
			params: [
				{
					source: 'state',
					name: 'tempArrayState',
				},
				{ source: 'pipe' },
			],
		},
	},
	// update array state
	{
		type: 'InteractionAtom',
		id: 'edit-req-body-part-7',
		config: {
			trigger: null,
			dependencies: ['edit-req-body-part-6'],
			action: 'setState',
			params: [
				{
					source: 'exact',
					value: 'tempArrayState',
				},
				{ source: 'pipe' },
			],
		},
	},
];

export default editNodeApiRequestBody;
