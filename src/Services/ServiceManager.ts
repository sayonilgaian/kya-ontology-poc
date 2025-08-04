type ServiceConstructor<T = any> = new (...args: any[]) => T;

export class ServiceManager {
  private services = new Map<string, any>();

  register<T>(ServiceClass: ServiceConstructor<T>, ...deps: any[]): void {
    const name = ServiceClass.name;
    if (!this.services.has(name)) {
      const instance = new ServiceClass(...deps);
      this.services.set(name, instance);
    }
  }

  get<T>(ServiceClass: ServiceConstructor<T>): T {
    const name = ServiceClass.name;
    const instance = this.services.get(name);
    if (!instance) throw new Error(`Service ${name} not registered`);
    return instance;
  }
}
