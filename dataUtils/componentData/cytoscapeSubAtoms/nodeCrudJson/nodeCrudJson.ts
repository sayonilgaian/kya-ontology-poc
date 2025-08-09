import createEdgeJson from './createEdge';
import createNodeJson from './createNode';
import deleteNodeJson from './deleteNode';
import editNodeJson from './editNode';

const nodeCrudJson = [...deleteNodeJson, ...createNodeJson,...editNodeJson , ...createEdgeJson];

export default nodeCrudJson;
