import { ForceGraphService } from "./3dForceGraph/3dForceGraph";
import { CytoscapeService } from "./cytoscapeCanvas/cytoscapeCanvas";
import { InstanceManager } from "./InstanceManager";


const instanceManger = new InstanceManager();

instanceManger.registerDependency("3dForceGraph", ForceGraphService)
instanceManger.registerDependency("cytoscape", CytoscapeService)

export { instanceManger };