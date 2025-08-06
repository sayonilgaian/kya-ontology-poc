import cyThirdPartAtom from './cytoscapeSubAtoms/cyThirdPartyAtom';
import ontologyApiCallJson from './cytoscapeSubAtoms/ontologyApiCall';

const cytoscapeGraph = {
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
		
		...cyThirdPartAtom,
		...ontologyApiCallJson,
	],
	children: [
		{
			atoms: [{}],
		},
	],
};

export default cytoscapeGraph;
