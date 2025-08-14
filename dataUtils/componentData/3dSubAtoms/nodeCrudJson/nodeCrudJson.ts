import createEdgeJson from './createEdge';
import createNodeJson from './createNode';
import deleteNodeJson from './deleteNode';
import editNodeJson from './editNode';
import editEdgeJson from './updateEdge';

const nodeCrudJson = [...deleteNodeJson, ...createNodeJson,...editNodeJson , ...createEdgeJson , ...editEdgeJson];

export default nodeCrudJson;
