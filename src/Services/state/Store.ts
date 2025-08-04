import { Signal } from "./Signal";

class Store {
  private _signals: { [key: string]: Signal } = {};
  private _undoStack: Array<{ storeName: string, prev: any }> = [];
  private _redoStack: Array<{ storeName: string, next: any }> = [];
  private _maxHistory: number = 50; // Optional limit to prevent memory issues

  constructor() {
    this._signals = {};
  }

  getSignal(name: string, initialValue?: any): Signal {
    if (!this._signals[name]) {
      this._signals[name] = new Signal(initialValue);
    } else if (this._signals[name].get() === undefined && initialValue) {
      this._signals[name].set(initialValue);
    }
    return this._signals[name];
  }

  garbageCollection(state: string, listeners: Function[]) {
    const signal = this._signals[state];
    if (!signal) return;
    listeners.forEach((listener) => {
      signal.detach(listener);
    });
  }

  #initializeState(storeName: string, initialValue: any, cb: Function) {
    const sig = new Signal(initialValue);
    sig.attach(cb);
    this._signals[storeName] = sig;
  }

  createState(storeName: string, initialValue: any, cb: Function) {
    if (this._signals[storeName]) {
      console.warn(
        `State "${storeName}" already exists. Use #setState or #getState instead.`
      );
      return;
    }
    this.#initializeState(storeName, initialValue, cb);
  }

  getState(storeName: string): unknown {
    const signal = this._signals[storeName];
    if (!signal) {
      console.warn(`State "${storeName}" not found.`);
      return undefined;
    }
    return signal.get();
  }

  setState(storeName: string, value: any) {
    const signal = this._signals[storeName];

    if (!signal) {
      this.#initializeState(storeName, [value], () => {});
      return;
    }

    // Push to undo stack with limit
    if (this._undoStack.length >= this._maxHistory) {
      this._undoStack.shift(); // remove oldest
    }
    // console.log("SET STATE:", storeName, value);
    const prev = signal.get()
    this._undoStack.push({ storeName, prev: structuredClone(prev) });

    // Clear redo stack on new change
    this._redoStack = [];
    signal.set(value);
  }


  undo() {
    if (!this._undoStack.length) return;

    const poppedArray = this._undoStack.pop();
    if (!poppedArray) return;
    const { storeName, prev } = poppedArray;
    const signal = this._signals[storeName];
    if (!signal) return;

    const current = structuredClone(signal.get());

    // Push to redo stack with limit
    if (this._redoStack.length >= this._maxHistory) {
      this._redoStack.shift(); // remove oldest
    }
    this._redoStack.push({ storeName, next: current });

    signal.set(prev);
  }


  redo() {
    if (!this._redoStack.length) return;

    const poppedArray = this._redoStack.pop();
    if (!poppedArray) return;
    const { storeName, next } = poppedArray;
    const signal = this._signals[storeName];
    if (!signal) return;

    const current = structuredClone(signal.get());

    // Push to undo stack again
    if (this._undoStack.length >= this._maxHistory) {
      this._undoStack.shift();
    }
    this._undoStack.push({ storeName, prev: current });

    signal.set(next);
  }

  setWithoutNotify(storeName: string, value: any) {
    const signal = this._signals[storeName];    
    if (!signal) {
      this.#initializeState(storeName, [value], () => {});
      return;
    }

    // Push to undo stack with limit
    if (this._undoStack.length >= this._maxHistory) {
      this._undoStack.shift(); // remove oldest
    }
    // console.log("SET STATE:", storeName, value);
    const prev = signal.get()
    this._undoStack.push({ storeName, prev: structuredClone(prev) });
    
    // Clear redo stack on new change
    this._redoStack = [];
    signal.setWithoutNotify(value);
  }

  deleteState(storeName: string) {
    const signal = this._signals[storeName];
    if (!signal) {
      console.warn(`State "${storeName}" not found.`);
      return;
    }
    this.garbageCollection(storeName, signal.listeners);
    delete this._signals[storeName];
    this._undoStack = [];
    this._redoStack = [];
  }
}

export default Store;
