import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export class RouterService {
  routes:any = {};
  cb: Function | null = null;
  pendingCallbacks : Array<string> = []
  pathToRestore: any = [];

  constructor() {
    // Back/forward button
    window.addEventListener("popstate", this.#handlePopState.bind(this));

    const currentPath = this.getCurrentRoute();
  
    // Break into parts: '/', '/HomeView', '/HomeView/Projects'
    const parts = currentPath.split('/').filter(Boolean); // ['HomeView','Projects']
    let pathsToRestore = ['/']; // always start from root
  
    for (let i = 0; i < parts.length; i++) {
      const subPath = '/' + parts.slice(0, i + 1).join('/');
      if(subPath === '/login') break; // skip root
      pathsToRestore.push(subPath);
    }

    this.pathToRestore = pathsToRestore;
  }

  addRoutes(path: string, url: string) {
    this.routes[path] = { url };
  }

  returnRoute(path: string) {
    return this.routes[path]?.url;
  }

  getCurrentRoute() {
    return this.pathToRestore[0] ? this.pathToRestore[0] : window.location.pathname; // in case reload
  }

  navigate(path: string) {
    history.pushState({}, '', path);
    this.#handlePopState();
  }

  emptyPathToRestore() {
    this.pathToRestore = []
  }

  #handlePopState() {
    const currentPath = this.getCurrentRoute();
    console.log("Route changed to:", currentPath);
  
    // check if route exists
    const route = this.routes[currentPath];
    if (route && route.e && route.json) {
      route.e.childDefs = [route.json]; // or route.e.renderUI(route.json)
      console.log("Restored view on reload for:", currentPath);
    } else {
      console.warn("No saved json or element found for reload on path:", currentPath);
    }
  
    if (this._onChange) {
      this._onChange(currentPath);
    }
    if(this.cb) {
      this.cb();
    }
  }
  

  handleRoutingEvent(pipeLine: Function) {
    this.cb = pipeLine;
  

    this.pendingCallbacks.forEach((item: string)=> {
      if(this.cb) {
        this.cb();
        let cp = this.pathToRestore.shift();
        history.pushState({}, '', cp);
      }
    })

    this.pendingCallbacks = []
  }

  private _onChange: (path: string) => void = () => {};

  onRouteChange(cb: (path: string) => void) {
    this._onChange = cb;
  }

  setContextOfPath(path: string, e: BaseUIElement) {
    if (!this.routes[path]) this.routes[path] = { url: "" };
    this.routes[path]["e"] = e; 
    if(this.pathToRestore[0] == path) {
      if(this.cb) {
        this.cb();
        let cp = this.pathToRestore.shift();
        history.pushState({}, '', cp);
      } else {
        this.pendingCallbacks.push(path)
      }

    } 
  }

   getCookie(key:string) {
    const name = encodeURIComponent(key) + "=";
    const parts = document.cookie.split(";");
    for (let part of parts) {
      part = part.trim();
      if (part.startsWith(name)) {
        return decodeURIComponent(part.slice(name.length));
      }
    }
    return null;
  }

  attachRouteOnPopState(path: string, json: object) {
    if (this.routes[path]?.e) {
      const username = this.getCookie("userName");
      const password = this.getCookie("password");
      if((username && password) || path ==="/login"){ 
        this.routes[path]["e"].childDefs = [json];
      }
    } else {
      console.warn("No element attached for path:", path);
    }
  }
}

