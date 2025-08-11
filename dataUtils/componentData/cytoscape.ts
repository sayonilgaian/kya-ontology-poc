import cyThirdPartAtom from './cytoscapeSubAtoms/cyThirdPartyAtom';
import nodeCrudJson from './cytoscapeSubAtoms/nodeCrudJson/nodeCrudJson';
import ontologyApiCallJson from './cytoscapeSubAtoms/ontologyApiCall';

const cytoscapeGraph = {
	tag: 'cytoscape-graph',
	atoms: [
		// styling
		{
			type: 'ColourAtom',
			config: { role: 'background', value: '#ffffffff' },
		},
		{
			type: 'LayoutAtom',
			config: {
				display: 'block',
				width: '100%',
				height: '100%',
				justify: 'center',
				align: 'center',
				'background-image':
					'radial-gradient(circle, #bfbbbb 1px, transparent 1px)',
				'background-size': '40px 40px' /* spacing between dots */,
				'background-repeat': 'repeat',
			},
		},
		// ...cyThirdPartAtomStaticJson,
		...cyThirdPartAtom,
		...ontologyApiCallJson,
	],
	children: [...nodeCrudJson],
};

export default cytoscapeGraph;
