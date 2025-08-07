import createNodeJson from './createNode';
import deleteNodeJson from './deleteNode';
import editNodeJson from './editNode';

const nodeCrudJson = [...deleteNodeJson, ...createNodeJson,...editNodeJson];

export default nodeCrudJson;
