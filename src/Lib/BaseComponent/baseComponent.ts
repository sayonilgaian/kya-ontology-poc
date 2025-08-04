import { ensureTag, appliers, executeActionPipeline } from '../../utils/common';
import { IndexedDBService } from '../../Services/database/DatabaseService';
// Actions
import { actions } from '../../utils/Actions';

// Services
import { serviceManager } from '../../Services';
import { RouterService } from '../../Services/router/RouterService';
import Store from '../../Services/state/Store';
import { FetchService } from '../../Services/api/APIService';
import { KeyboardShortcutService } from '../../Services/keyEventService/keyEventService';
import { DesignSystemService } from '../../Services/DesignSystemService/DesignSystemService';
import { instanceManger } from '../../ThirdPartyServices';

export class BaseUIElement extends HTMLElement {
  static observedAttributes = ['atoms', 'children'];
  static designSystem = {}; // give variables as key and css properties as value
  store: Store | null = null;
  apiService: FetchService | null = null;
  idexedDBService: IndexedDBService | null = null;
  designSystemService: DesignSystemService | null = null;
  _keyboardService: KeyboardShortcutService | null = null;
  static serviceManager = serviceManager;
  static _thirdPartyInstances = instanceManger;
  routerService: RouterService | null = null;

  actionData: any = {};
  actionCb = async () => { };

  // -------------------------------------------- For Template Registry --------------------------------------------
  private static _templateRegistry: { [key: string]: any } = {};
  // -------------------------------------------- For Template Registry --------------------------------------------

  static get templateRegistry() {
    return this._templateRegistry;
  }

  static set templateRegistry(value) {
    this._templateRegistry = value;
  }

  // Default values for plan and registry
  _plan: any = {};
  _currentPlan = {};
  #loop: { index?: number | string; value?: any } = {};
  _registry = new Map();

  constructor() {
    super();

    this.store = BaseUIElement.serviceManager.get(Store);
    this.apiService = BaseUIElement.serviceManager.get(FetchService);
    this.routerService = BaseUIElement.serviceManager.get(RouterService);
    this.idexedDBService = BaseUIElement.serviceManager.get(IndexedDBService);
    this.designSystemService = BaseUIElement.serviceManager.get(DesignSystemService);

    this._keyboardService = new KeyboardShortcutService(this);
  }

  attributeChangedCallback(name: string, _old: string, val: string) {
    if (!val || val === 'undefined') return;
    try {
      const parsed = JSON.parse(val);
      if (name === 'atoms') this.atoms = parsed;
      if (name === 'children') this.childDefs = parsed;
    } catch (err) {
      console.error('Error parsing attribute value', err);
    }
  }

  _atoms: Array<any> = [];
  _children: Array<any> = [];
  _reg = new Map();
  _listeners = [];

  set atoms(v: Array<any>) {
    this._atoms = v || [];
    if (this.isConnected) this.#applyAtoms();
  }

  set childDefs(v) {
    this._children = v || [];
    if (this.isConnected) this.#render();
  }

  get childDefs() {
    return this._children;
  }

  set functionRegistry(m: any) {
    this._reg = m;
  }

  set plan(newPlan) {
    this._plan = newPlan;
  }
  get plan() {
    return this._plan;
  }
  set currentPlan(newPlan) {
    this._currentPlan = newPlan;
  }
  get currentPlan() {
    return this._currentPlan;
  }
  set loop(loop: { index?: number | string; value?: any }) {
    this.#loop = loop;
  }
  get loop() {
    return this.#loop;
  }
  set registry(newRegistry: any) {
    this._registry = newRegistry;
  }

  #updateRootProps(root: any) {
    root.functionRegistry = this._registry;
    root.atoms = this._plan.atoms;
    root.childDefs = this._plan.children;
  }

  connectedCallback() {
    // Ensure that the plan and registry are available before proceeding
    if (!this._plan || !this._registry) {
      console.error('Plan and registry must be defined before rendering.');
      return;
    }

    // Automatically define all tags in the plan
    (function walk(n) {
      // Ensure the tag is registered
      console.log("----", n)
      if (!n.tag) {
        // console.error('Child element is missing a tag:', n);
        return;
      }
      ensureTag(n.tag, BaseUIElement); // Ensure tag is only defined once
      (n.children || []).forEach(walk); // Recursively walk through children
    })(this._plan); // need only in parent if we pass plan this will happen again and again

    // Hydrate/create root element
    let root = document.querySelector(this._plan.tag);
    if (!root && this._plan?.tag) {
      root = document.createElement(this._plan.tag);
      this.#updateRootProps(root);
      document.body.appendChild(root);
    }

    // Shadow DOM and Slot Management
    if (!this.shadowRoot) {
      this.attachShadow({ mode: 'open' });
    }
    if (!this.shadowRoot?.querySelector('slot')) {
      this.shadowRoot?.appendChild(document.createElement('slot'));
    }

    this.#applyAtoms();
    // console.log('BaseUIElement connected:', this);
    this.#render();
    this.#createPipelines(this._atoms.filter((a) => a.type === 'InteractionAtom'));
  }

  disconnectedCallback() {
    this._listeners.forEach((o: any) => o.el.removeEventListener(o.t, o.h));
    if (this._keyboardService) this._keyboardService.destroy();
  }

  #createPipelines(atoms: Array<any>) {
    const eventPipelines = new Map(); // To store pipelines for each event trigger
    const seenAtoms = new Map(); // To track and remove duplicate atoms based on their ID

    // Remove duplicates by id
    const uniqueAtoms = atoms.filter((atom) => {
      if (seenAtoms.has(atom.id)) {
        return false;
      }
      seenAtoms.set(atom.id, true);
      return true;
    });

    // Separate atoms with a trigger and those that depend on others (trigger is null)
    const eventAtoms = uniqueAtoms.filter((a) => a.config.trigger !== null);
    const dependentAtoms = uniqueAtoms.filter((a) => a.config.trigger === null);

    // Loop through the eventAtoms and create pipelines for each event
    while (eventAtoms.length > 0) {
      const atom = eventAtoms.shift();
      if (!atom || !atom.config || !atom.config.trigger) continue;

      let triggers = Array.isArray(atom.config.trigger)
        ? atom.config.trigger
        : [atom.config.trigger];

      // If the event pipeline is not already created for this trigger
      for (let trigger of triggers) {
        let pipelineKey = trigger + '-' + (atom.config.state || '');

        if (!eventPipelines.has(pipelineKey)) {
          const pipeline = this.#createPipeline(dependentAtoms, atom);
          eventPipelines.set(pipelineKey, pipeline);
        }
      }
    }

    // console.log('Event pipelines created:', eventPipelines);

    eventPipelines.forEach((pipeline, trigger) => {
      const upTrigger = trigger.slice(0, trigger.lastIndexOf('-')); // Remove the action part from the trigger
      // console.log(`Creating pipeline for trigger: ${trigger}`, pipeline);
      switch (upTrigger) {
        /**
         * {
            type: "InteractionAtom",
            id: "inputId1",
            config: {
              trigger: "OnLoad",
              dependencies: [],
              params: [{}],
              action: "read"
            },
          },
         */
        case 'OnLoad': {
          const cb = async () => {
            executeActionPipeline(pipeline, actions, this, 'StateChange');
          };
          cb();
          break;
        }
        case 'OnPopState': {
          this.routerService?.handleRoutingEvent(
            async () => await executeActionPipeline(pipeline, actions, this, 'OnPopState')
          );
          break;
        }
        case 'ComponentChange': {
          this.actionCb = async () => {
            await executeActionPipeline(pipeline, actions, this, 'StateChange');
          };
          break;
        }
        /**
         * {
            type: "InteractionAtom",
            id: "inputId1",
            config: {
              trigger: "StateChange",
              dependencies: [],
              params: [{}],
              action: "read",
              state: "apiResponse",
            },
          },
         */
        case 'StateChange': {
          const stateName = pipeline[0]?.config?.state;
          if (stateName) {
            this.store
              ?.getSignal(stateName)
              .attach(
                async () => await executeActionPipeline(pipeline, actions, this, 'StateChange')
              );
            break;
          }
        }
        // case 'TimeOut': {
        // 	let time = pipeline[0]?.config?.timeoutTime ?? 0

        // 	const clear = setTimeout(()=> {
        // 		executeActionPipeline(pipeline, actions, this, 'StateChange')
        // 		clearInterval(clear);
        // 	},time)

        // 	break;
        // }
        default: {
          if (this._keyboardService?.getEvents().includes(upTrigger.toLowerCase())) {
            this._keyboardService.onShortcut(upTrigger, (e) =>
              executeActionPipeline(pipeline, actions, this, e)
            );
            return;
          }
          this.addEventListener(upTrigger, (e) =>
            executeActionPipeline(pipeline, actions, this, e)
          );
        }
      }
    });

    return eventPipelines;
  }

  // Create the pipeline from the dependent atoms, starting from the initial atom (with a non-null trigger)
  #createPipeline(dependentAtoms: Array<any>, initialAtom: any) {
    const pipeline = [initialAtom]; // Start with the initial atom (the one with the trigger)
    const visited = new Set(); // To track atoms that have already been added to the pipeline

    function traverse(atom: any) {
      if (visited.has(atom.id)) return; // Skip if atom has already been visited
      visited.add(atom.id); // Mark this atom as visited

      // Go through all dependent atoms and add those that depend on the current atom
      dependentAtoms.forEach((depAtom) => {
        if (depAtom.config.dependencies?.includes(atom.id)) {
          // console.log(`Adding dependent atom: ${depAtom.id} for ${atom.id}`);
          if (!visited.has(depAtom.id)) {
            pipeline.push(depAtom); // Add the dependent atom to the pipeline
            traverse(depAtom); // Recursively process dependencies of the current dependent atom
          }
        }
      });
    }

    traverse(initialAtom); // Start traversal from the initial atom
    return pipeline;
  }

  #applyAtoms() {
    // Remove all old listeners
    this._listeners.forEach((o: any) => o.el.removeEventListener(o.t, o.h));
    this._listeners = [];

    // If there is an ImageAtom, filter out ColourAtom with background role
    let atomsToApply = this._atoms;
    const hasImageAtom = atomsToApply.some((a) => a.type === 'ImageAtom');

    if (hasImageAtom) {
      atomsToApply = atomsToApply.filter((a) => {
        // Only filter out ColourAtom with role 'background'
        return !(a.type === 'ColourAtom' && a.config?.role === 'background');
      });
    }

    // Apply all the atoms
    atomsToApply.forEach((a) => {
      const config = a.config;
      appliers[a.type]?.(this, config);
    });
  }

  #render() {
    // Remove existing children except for the <slot>
    if (!this.shadowRoot) return;

    Array.from(this.shadowRoot.children).forEach((n) => {
      if (n.localName !== 'slot') n.remove();
    });

    // Render children defined in the plan
    this._children.forEach((d) => {
      if (d.type === 'Template') {
        BaseUIElement.templateRegistry[d.id] = d;
        return;
      }

      ensureTag(d.tag, BaseUIElement); // Ensure tag is registered

      const el = document.createElement(d.tag);

      // Pass the registry, atoms, and childDefs to the child element
      el.id = d.id;
      el.functionRegistry = this._reg;
      el.atoms = d.atoms || [];
      el.childDefs = d.children || [];
      el._currentPlan = d;

      // Append the child element to the shadow DOM
      this.shadowRoot?.appendChild(el);
    });
  }
}

customElements.define('base-ui-element', BaseUIElement);
