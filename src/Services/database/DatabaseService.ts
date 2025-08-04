export class IndexedDBService<T = any> {
    private _dbName = "test";
    private _storeName = "jsonStore";
    private _version = 1;
    private db: IDBDatabase | null = null;
  
    // ==== GETTERS ====
    get dbName() {
      return this._dbName;
    }
  
    get storeName() {
      return this._storeName;
    }
  
    get version() {
      return this._version;
    }
  
    // ==== SETTERS ====
    set dbName(name: string) {
      this._dbName = name;
    }
  
    set storeName(name: string) {
      this._storeName = name;
    }
  
    set version(ver: number) {
      this._version = ver;
    }
  
    // ==== INIT ====
    async init(): Promise<IDBDatabase> {
      if (this.db) return this.db;
  
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this._dbName, this._version);
  
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(this._storeName)) {
            db.createObjectStore(this._storeName); // no keyPath
          }
        };
  
        request.onsuccess = () => {
          this.db = request.result;
          resolve(this.db);
        };
  
        request.onerror = () => reject("Failed to open IndexedDB");
      });
    }
  
    // ==== OPERATIONS ====
  
    async save(key: IDBValidKey, data: T): Promise<string> {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this._storeName, "readwrite");
        const store = tx.objectStore(this._storeName);
        const request = store.put(data, key); // provide key manually
  
        request.onsuccess = () => resolve("Saved");
        request.onerror = () => reject("Save failed");
      });
    }
  
    async get(key: IDBValidKey): Promise<T | undefined> {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this._storeName, "readonly");
        const store = tx.objectStore(this._storeName);
        const request = store.get(key);
  
        request.onsuccess = () => resolve(request.result as T);
        request.onerror = () => reject("Fetch failed");
      });
    }
  
    async delete(key: IDBValidKey): Promise<string> {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this._storeName, "readwrite");
        const store = tx.objectStore(this._storeName);
        const request = store.delete(key);
  
        request.onsuccess = () => resolve("Deleted");
        request.onerror = () => reject("Delete failed");
      });
    }
  
    async clear(): Promise<string> {
      const db = await this.init();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(this._storeName, "readwrite");
        const store = tx.objectStore(this._storeName);
        const request = store.clear();
  
        request.onsuccess = () => resolve("Cleared");
        request.onerror = () => reject("Clear failed");
      });
    }
  }
  