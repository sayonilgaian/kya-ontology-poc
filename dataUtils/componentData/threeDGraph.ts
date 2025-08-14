import ThirdPartyAtom3d from './3dSubAtoms/3dThirdPartyAtom';
import nodeCrudJson from './3dSubAtoms/nodeCrudJson/nodeCrudJson';
import ontologyApiCall from './3dSubAtoms/ontologyApiCall';

const threeDGraph = {
	tag: 'graph-3d-view',
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
		...ThirdPartyAtom3d,
		...ontologyApiCall,
	],
	children: [
		...nodeCrudJson,
	],
};
export default threeDGraph;
