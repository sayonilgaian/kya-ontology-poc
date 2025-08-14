import getKGApiCall from './3dSubAtoms/getKGapiCall';
import ThirdPartyKGAtom3d from './3dSubAtoms/ThirdPartyKGAtom3d';

const threeDGraph = {
	tag: 'graph-3d-view',
	atoms: [
		{
		type: 'ContentAtom',
		config: {
			text: 'No Activity Yet',
		},
	},
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
		...getKGApiCall,
		...ThirdPartyKGAtom3d
	],
	children: [],
};
export default threeDGraph;
