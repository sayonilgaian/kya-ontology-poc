import { thirdParty } from "./thirdPartyType";

// InstanceManager.ts
type ServiceConstructor<T = any> = new (...args: any[]) => T;

export class InstanceManager {
  registry: Record<string, Record<string, any>> = {};
  nameToClassMapping: Record<string, ServiceConstructor> = {}

  registerDependency<T>(dependencyName: string, ServiceClass: ServiceConstructor<T>) {
    if(this.nameToClassMapping[dependencyName]) {
      console.warn(`${dependencyName} already registered`);
    } else {
      this.nameToClassMapping[dependencyName] = ServiceClass
    }
  }

  createInstance(className: string, variableName: string) {
    if(this.nameToClassMapping[className]) {
      const instance: thirdParty = new this.nameToClassMapping[className]();
      const instanceMethods = instance.returnMethods();

      this.registry[variableName] = instanceMethods;
    } else {
      console.warn(`${className} is not registered`);
    }
  }

  get(variableName: string): Record<string, any>{
    return this.registry[variableName]
  }

  has(variableName: string): boolean {
    return !!this.registry[variableName]
  }

  call(
    variableName: string,
    method: string,
    ...args: any[]
  ) {
    const instance: any = this.get(variableName);
    if (!instance) {
      console.warn(`No instance found with this name "${variableName}"`);
      return;
    }

    const fn = instance[method];
    if (typeof fn !== 'function') {
      console.warn(`Method not found "${variableName}.${method}"`);
      return;
    }

    return fn.apply(instance, args);
  }

  destroy(
    variableName: string,
    destroyFn?: (instance: any) => void
  ) {
    const instance = this.get(variableName);
    if (instance) {
      destroyFn?.(instance);
      delete this.registry[variableName];
    }
  }

  list(variableName?: string): string[] {
    if (variableName) {
      return Object.keys(this.registry[variableName] ?? {});
    }
    return Object.keys(this.registry);
  }

  clear(variableName?: string): void {
    if (variableName) {
      delete this.registry[variableName];
    } else {
      this.registry = {};
    }
  }
}
