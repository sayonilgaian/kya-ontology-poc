import createEdgeJson from './createEdge';
import createNodeJson from './createNode';
import deleteNodeJson from './deleteNode';
import editNodeJson from './editNode';

const nodeCrudJson = [...createEdgeJson,...deleteNodeJson, ...createNodeJson,...editNodeJson];

export default nodeCrudJson;
