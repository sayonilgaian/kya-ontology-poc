import cyThirdPartAtom from './cytoscapeSubAtoms/cyThirdPartyAtom';
import nodeCrudJson from './cytoscapeSubAtoms/nodeCrudJson/nodeCrudJson';
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
				display: 'block',
				width: '100%',
				height: '100%',
				justify: 'center',
				align: 'center',
			},
		},
		// ...cyThirdPartAtomStaticJson,
		...cyThirdPartAtom,
		...ontologyApiCallJson,
	],
	children: [...nodeCrudJson],
};

export default cytoscapeGraph;
