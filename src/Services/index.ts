import { FetchService } from "./api/APIService";
import { RouterService } from "./router/RouterService";
import { ServiceManager } from "./ServiceManager";
import { IndexedDBService } from "./database/DatabaseService"
import Store from "./state/Store";
import { DesignSystemService } from "./DesignSystemService/DesignSystemService";

const serviceManager = new ServiceManager();

serviceManager.register(Store)
serviceManager.register(FetchService)
serviceManager.register(RouterService)
serviceManager.register(IndexedDBService)
serviceManager.register(DesignSystemService)

export { serviceManager };