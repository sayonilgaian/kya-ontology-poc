import { ForceGraphService } from "./3dForceGraph/3dForceGraph";
import { InstanceManager } from "./InstanceManager";


const instanceManger = new InstanceManager();

instanceManger.registerDependency("3dForceGraph", ForceGraphService)

export { instanceManger };