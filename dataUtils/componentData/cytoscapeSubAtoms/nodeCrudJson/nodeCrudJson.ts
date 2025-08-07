import createNodeJson from './createNode';
import deleteNodeJson from './deleteNode';

const nodeCrudJson = [...deleteNodeJson, ...createNodeJson];

export default nodeCrudJson;
