import { BaseUIElement } from '../Lib/BaseComponent/baseComponent';
import { IndexedDBService } from '../Services/database/DatabaseService';
import { actions } from './Actions';
import { v4 } from 'uuid';

// ─── 1 · Helper Functions ───────────────────────────────────────
export type TokenInput =
  | string
  | {
    type: 'token';
    key: string;
    designSystem: string;
    theme: string;
  };

export const token = (v: TokenInput): string => {
  // Case 1: Token as object with design system and theme
  if (typeof v === 'object' && v.type === 'token' && v.key && v.designSystem && v.theme) {
    return `var(--custom-${v.designSystem.toLowerCase()}-${v.theme.toLowerCase()}-${v.key})`;
  }

  // Case 2: String like "token:p-color" (fallback/global default style)
  if (typeof v === 'string' && v.startsWith('token:')) {
    const key = v.slice(6);
    return `var(--${key})`; // fallback to plain var(--p-color)
  }

  // Fallback: return the raw value
  return v as string;
};

export const alias: any = {
  bg: 'background',
  align: 'align-items',
  justify: 'justify-content',
  flexDirection: 'flex-direction',
  flexG: 'flex-grow',
  flexS: 'flex-shrink',
  boxSizing: 'box-sizing',
  borderRadius: 'border-radius',
};

/**
 * 
 * {
    "type": "ColourAtom",
    "config": {
    "role": "text",
      "value": "token:p-color", // refrencing to variable
      "theming": { // refrencing to diff design system in a component 
        "designSystem": "Core",
        "theme": "Dark",
        "variables": ["p-color"]
      } 
    }
  },
 * 
 * @param el
 * @param obj 
 * @param applyTheme 
 */

export const applyStyles = (
  el: BaseUIElement,
  obj: Record<string, any>,
  applyTheme?: any
): void => {
  // Apply theme-scoped variables if provided
  if (applyTheme) {
    const { designSystem, theme, variables } = applyTheme;
    el.designSystemService?.applyThemeToElement(designSystem, theme, el, variables);
  }

  // Apply each style from JSON config
  for (const [k, v] of Object.entries(obj)) {
    const styleProperty = alias[k] ?? k;

    // Convert string token references to token object using applyTheme
    const themedValue =
      typeof v === 'string' && v.startsWith('token:') && applyTheme
        ? {
          type: 'token',
          key: v.slice(6),
          designSystem: applyTheme.designSystem,
          theme: applyTheme.theme,
        }
        : v;

    el.style.setProperty(styleProperty, token(themedValue));
  }
};

// ─── 2 · Register Tags on Demand ─────────────────────────────────
export const ensureTag = (tag: string, Base: any) => {
  if (!tag) {
    console.error('Tag is undefined or empty!');
    return;
  }
  // Check if the tag is already defined in the customElements registry
  if (!customElements.get(tag)) {
    // Only define the tag if it hasn't been registered already
    customElements.define(tag, class extends Base { });
  } else {
    console.log(`Tag "${tag}" is already defined, skipping definition.`);
  }
};

// ─── 3 · Style Appliers ─────────────────────────────────────────
export const appliers: any = {
  ColourAtom: (e: BaseUIElement, c: any) =>
    applyStyles(
      e,
      {
        [c.role === 'background' ? 'background' : 'color']: c.value,
      },
      c.theming
    ),

  SpacingAtom: (e: BaseUIElement, c: any) => {
    switch (c.role) {
      case 'margin':
        applyStyles(e, { margin: c.value }, c.theming);
        break;
      case 'padding':
        applyStyles(e, { padding: c.value }, c.theming);
        break;
      case 'gap':
        applyStyles(e, { gap: c.value }, c.theming);
        break;
      default:
        console.warn(`Unknown spacing role: ${c.role}`);
    }
  },

  TypographyAtom: (e: BaseUIElement, c: any) => {
    // //console.log(e);

    let config: Record<string, string> = {};
    switch (c.role) {
      case 'font':
        config['font-family'] = c.value;
        break;
      case 'size':
        config['font-size'] = c.value;
        break;
      case 'weight':
        config['font-weight'] = c.value;
        break;
      case 'style':
        config['font-style'] = c.value;
        break;
      case 'variant':
        config['font-variant'] = c.value;
        break;
      case 'lineHeight':
        config['line-height'] = c.value;
        break;
      case 'letterSpacing':
        config['letter-spacing'] = c.value;
        break;
      case 'align':
        config['text-align'] = c.value;
        break;
      case 'textDecoration':
        config['text-decoration'] = c.value;
        break;
      case 'textTransform':
        config['text-transform'] = c.value;
        break;
      default:
        console.warn(`Unknown typography role: ${c.role}`);
        return;
    }
    if (Object.keys(config).length > 0) {
      applyStyles(e, config, c.theming);
    } else {
      console.warn('No valid typography role provided');
    }
  },

  ImageAtom: (e: BaseUIElement, c: any) => {
    var cfg: any = {};
    cfg['background-repeat'] = c.noRepeat;
    if (c.src) {
      cfg['background-image'] = `url('${c.src}')`;
      cfg['display'] = 'block';
    } else if (c.img) {
      cfg['background-image'] = c.img;
    }
    if (c.cover) {
      cfg['background-size'] = c.cover;
    }
    applyStyles(e, cfg, c.theming);
  },

  LayoutAtom: (e: BaseUIElement, c: any) => {
    applyStyles(e, { [c.role]: c.value, ...c }, c.theming);
  },

  StyleAtom: (e: BaseUIElement, c: any) => applyStyles(e, { [c.role]: c.value, ...c }, c.theming),

  attributeAtom: (e: BaseUIElement, c: any) => {
    // //console.log('attributeAtom', e, c);

    if (c.attribute && c.value !== undefined) {
      if (c.value === null) {
        e.removeAttribute(c.name);
      } else {
        e.setAttribute(c.attribute, c.value);
      }
    } else {
      console.warn('attributeAtom requires both name and value');
    }
    // //console.log(e);
  },

  ContentAtom: (e: BaseUIElement, c: any) => {
    if (c.html) {
      e.innerHTML = c.html;
    } else {
      e.textContent = c.text ?? '';
    }
  },

  MicroAnimationAtom: (e: BaseUIElement, c: any) => {
    if (c.preset !== 'hover-raise') return;
    const d = c.duration ?? 180;
    applyStyles(
      e,
      {
        transition: `transform ${d}ms ease-out,box-shadow ${d}ms ease-out`,
      },
      c.theming
    );
    e.addEventListener('mouseenter', () => {
      applyStyles(
        e,
        {
          transform: 'scale(1.06)',
          boxShadow: '0 4px 10px rgba(0,0,0,.25)',
        },
        c.theming
      );
    });
    e.addEventListener('mouseleave', () => {
      applyStyles(e, { transform: 'scale(1)', boxShadow: 'none' }, c.theming);
    });
  },

  StateAtom: (e: BaseUIElement, c: any) => {
    /**
     * 		{ type: 'StateAtom', config: { op:"Initialize", name: 'state', value: 'noop' } }, // initialize
     *		{ type: 'InteractionAtom', id:"atom1", config: { name: '', trigger: "click", params: [ { source: "state", name: "state", path: "string" }] , action: "c", dependencies: [] } }, // triggering on click
     *		{ type: 'InteractionAtom', id:"atom2", config: { name: '', trigger: null,    params: [ { source: "local", name: "state", value: "state" }, { source: "local", name: "state", value: "noopUpdated" }] , action: "setState", dependencies: [ "atom1" ] } } // state updated
     *		{ type: 'StateAtom', config: { op:"Listen", name: 'state', value: 'noop', callback: "func1" } }, // Listen
     */

    const { op = 'Initialize', name = '', value = undefined, callback } = c;
    let cb = actions[callback];
    if (cb) {
      cb = cb.bind(e);
    } else {
      cb = () => { };
    }

    switch (op) {
      case 'Destroy':
        e.store?.deleteState(name);
        break;

      case 'Listen':
        const sig = e.store?.getSignal(name);
        if (sig) {
          sig.attach(cb);
        } else {
          console.info(`Can't listen to ${name}, this action does not exist`);
        }
        break;

      case 'Initialize':
      default:
        e.store?.createState(name, value, cb);
        break;
    }
  },

  APIAtom: (e: BaseUIElement, c: any) => {
    const { op, value, callback } = c;

    /**
     * Example of get API
     * {
        type: 'InteractionAtom',
        id: '1',
        config: {
          trigger: 'click',
          dependencies: [],
          params: [ { source: "exact", value: "/red" }, { source: "exact", value: {}}, { source: "exact", value:"figma"} ],
          action: 'get',
        },
      },
     */

    const cb = actions[callback];

    if (!e.apiService) {
      console.warn('apiService is not initialized in BaseUIElement.');
      return;
    }

    switch (op) {
      /**
       * Sets global headers for all requests.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'SetHeaders',
       *     value: { Authorization: 'Bearer xyz', 'Content-Type': 'application/json' }
       *   }
       * }
       */
      case 'SetHeaders': {
        if (typeof value === 'object') {
          e.apiService.setHeaders(value);
          cb?.(e.apiService.getHeaders());
        }
        break;
      }

      /**
       * Replaces the entire service map with a new one.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'SetServiceMap',
       *     value: { user: 'https://user-service.com', auth: 'https://auth-service.com' }
       *   }
       * }
       */
      case 'SetServiceMap': {
        if (typeof value === 'object') {
          e.apiService.setServiceMap(value);
          cb?.(e.apiService.getServiceMap());
        }
        break;
      }
      /**
       * Adds or updates a specific service entry, and optionally its headers.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'SetService',
       *     value: {
       *       key: 'figma',
       *       url: 'https://figma-service.com',
       *       headers: { Authorization: 'Bearer abc123' }
       *     }
       *   }
       * }
       */
      case 'SetService': {
        if (value && typeof value.key === 'string' && typeof value.url === 'string') {
          e.apiService.setService(value.key, value.url);
          e.apiService.setServiceHeaders(value.key, value.headers);
          cb?.(e.apiService.getServiceMap());
        }
        break;
      }

      /**
       * Removes a specific service and its associated headers.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'RemoveService',
       *     value: 'figma'
       *   }
       * }
       */
      case 'RemoveService': {
        if (typeof value === 'string') {
          e.apiService.removeService(value);
          cb?.(e.apiService.getServiceMap());
        }
        break;
      }
      /**
       * Sets headers for a specific service key.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'SetServiceHeaders',
       *     value: {
       *       key: 'figma',
       *       headers: { Authorization: 'Bearer user-token' }
       *     }
       *   }
       * }
       */
      case 'SetServiceHeaders': {
        if (value && typeof value.key === 'string' && typeof value.headers === 'object') {
          e.apiService.setServiceHeaders(value.key, value.headers);
          cb?.(e.apiService.getServiceHeaders(value.key));
        }
        break;
      }

      /**
       * Removes service-specific headers for a given service key.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'RemoveServiceHeaders',
       *     value: 'figma'
       *   }
       * }
       */
      case 'RemoveServiceHeaders': {
        if (typeof value === 'string') {
          e.apiService.removeServiceHeaders(value);
          cb?.();
        }
        break;
      }

      /**
       * Retrieves current global headers.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'GetHeaders',
       *     callback: "a"
       *   }
       * }
       */
      case 'GetHeaders': {
        cb?.(e.apiService.getHeaders());
        break;
      }

      /**
       * Retrieves the current service map.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'GetServiceMap',
       *     callback: "a"
       *   }
       * }
       */
      case 'GetServiceMap': {
        cb?.(e.apiService.getServiceMap());
        break;
      }

      /**
       * Retrieves the headers set for a specific service.
       * Example:
       * {
       *   type: 'APIAtom',
       *   config: {
       *     op: 'GetServiceHeaders',
       *     value: 'figma',
       *     callback: "a"
       *   }
       * }
       */
      case 'GetServiceHeaders': {
        if (typeof value === 'string') {
          cb?.(e.apiService.getServiceHeaders(value));
        }
        break;
      }

      /**
       * Catch-all for unsupported operations.
       */
      default:
        console.warn(`Unknown APIAtom operation: ${op}`);
    }
  },

  RouterAtom: (e: BaseUIElement, c: any) => {
    const { op, path, url } = c || {};
    switch (op) {
      case 'CreateRoute': {
        e.routerService?.addRoutes(path, url);
        break;
      }
      case 'AttachRoute': {
        e.routerService?.setContextOfPath(path, e);
      }
    }
  },

  IndexedDBAtom: (e: BaseUIElement, c: any) => {
    const { op, dbName, storeName, version } = c || {};
    switch (op) {
      case 'CreateIndexDb': {
        if (e.idexedDBService) {
          e.idexedDBService.dbName = dbName;
          e.idexedDBService.storeName = storeName;
          e.idexedDBService.version = parseInt(version); // number banana bahut zaruri hai
          e.idexedDBService.init();
        }
      }
    }
  },

  KeyboardEventAtom: (e: BaseUIElement, c: any) => {
    const { op, value, callback } = c;

    /**
     * { type: 'KeyboardEventAtom', config: { op: "AddCustomEvent", value: 'ctrl+shift+K'} },
     */
    if (!e._keyboardService) {
      console.warn('KeyboardEventAtom requires _keyboardService to be initialized');
      return;
    }

    if (e._keyboardService?.isInit === false) {
      e._keyboardService.init();
    }

    switch (op) {
      case 'AddCustomEvent': {
        e._keyboardService.registerShortcut(value);
        break;
      }
      case 'RemoveCustomEvent': {
        e._keyboardService.offShortcut(value);
        break;
      }
      default: {
        console.warn(`Unknown KeyboardEventAtom operation: ${op}`);
      }
    }
  },

  ThirdPartyAtom: (e: BaseUIElement, config: any) => {

    const { op = "Create", name = "", thirdPartyLibraryName = "" } = config;
    const manager = BaseUIElement._thirdPartyInstances;

    switch (op) {

      case "Create": {
        if (typeof thirdPartyLibraryName !== "string") {
          console.warn(`Expected class name string in "class", got ${typeof thirdPartyLibraryName}`);
          return;
        }
        manager.createInstance(thirdPartyLibraryName, name);
        break;
      }

      case "Destroy": {
        manager.destroy(name);
        break;
      }

      default: {
        console.warn(`Unknown ThirdPartyAtom operation: ${op}`);
      }
    }
  }
};

function getAtomIdById(deps: Array<string>, atoms: Array<any>, result: Array<unknown>) {
  const atomIndexes: any = {};
  deps?.forEach((dep: string) => {
    atoms.forEach((atom: any, index: number) => {
      if (atom.id === dep) {
        return (atomIndexes[dep] = result[index]);
      }
    });
  });

  return atomIndexes;
}

export function traverse(obj: any, callback: (key: string, value: any) => any) {
  if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        obj[key] = callback(key, obj[key]);
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          traverse(obj[key], callback); // recurse first
        }
        // update the value with the result of callback
      }
    }
  }
}

export function get(
  object: unknown,
  path: string | Array<string | number>,
  defaultValue: any = ''
) {
  if (!path) return object;

  const keys = Array.isArray(path)
    ? path
    : path
      .split(/\.|\[|\]/g)
      .filter(Boolean)
      .map((key) => (/^\d+$/.test(key) ? Number(key) : key));

  let result: any = object;

  for (let key of keys) {
    result = result == null ? undefined : result[key];
    if (result === undefined) return defaultValue;
  }

  return result;
}

export function set(object: unknown, path: string | Array<string | number>, value: any): unknown {
  if (!path) return;

  const keys = Array.isArray(path)
    ? path
    : path
      .split(/\.|\[|\]/g)
      .filter(Boolean)
      .map((key) => (/^\d+$/.test(key) ? Number(key) : key));

  let current: any = object;
  // //console.log(keys);

  keys.forEach((key, index) => {
    if (index === keys.length - 1) {
      // //console.log(key, index, current)
      current[key] = value;
      // //console.log(current);
    } else {
      //console.log(key, index, current, "else")
      if (!current[key] || typeof current[key] !== 'object') {
        //console.log(key, index, current, "elseIf")
        current[key] = typeof keys[index + 1] === 'number' ? [] : {};
      }
      current = current[key];
      // //console.log(current);
    }
  });

  return object;
}

function getParamFromSource(
  source: string,
  name: string,
  value: string,
  context: BaseUIElement,
  mapOfAtomIdAndResult?: Record<string, number>
) {
  switch (source) {
    case "state":
      return context.store ? context.store.getState(name) : undefined;
    case "class":
      return context.actionData[value] ?? "";
    case "action":
      return actions[value];
    case "env":
      return import.meta.env[value]
    case "loop":
      if (value === "index") {
        return context.loop ? context.loop.index : undefined;
      }
      return context.loop ? context.loop.value : undefined;
    case "pipe":
      if (mapOfAtomIdAndResult) {
        const mapKeys = Object.keys(mapOfAtomIdAndResult);
        if (mapKeys.length === 1 && !value) {
          return mapOfAtomIdAndResult[mapKeys[0]];
        }
        return mapOfAtomIdAndResult[value ? value : 0];
      } else {
        return null
      }
    case "exact":
    default:
      return value;
  }
}

export async function executeActionPipeline(
  actionToPerform: any,
  actions: Record<string, Function>,
  context: BaseUIElement,
  e: Event | 'StateChange' | 'OnLoad' | 'OnPopState',
  setBreakLoopTrue: Function = () => { }
) {
  // //console.log(actionToPerform);

  const n = actionToPerform.length;
  const results = Array(n).fill(undefined);
  const inDegree = Array(n).fill(0);
  const dependents: Array<any> = Array(n)
    .fill(0)
    .map(() => []);
  const atomIdToIndex: any = {}; // Mapping atom ids to their indices

  // Build atomIdToIndex for quick lookup
  actionToPerform.forEach((atom: any, index: number) => {
    atomIdToIndex[atom.id] = index;
  });

  const queue = [];
  // Build inDegree and dependents
  for (let i = 0; i < n; i++) {
    const deps = actionToPerform[i].config.dependencies || [];
    inDegree[i] = deps.length;

    deps.forEach((depId: any) => {
      const depIndex = atomIdToIndex[depId]; // Get the index from the atomIdToIndex map
      if (dependents && dependents[depIndex]) {
        dependents[depIndex].push(i);
      }
    });

    if (inDegree[i] === 0) queue.push(i);
  }

  let processed = 0;

  while (queue.length > 0) {
    let current: number | undefined = queue.shift();
    if (current === undefined) {
      console.warn('Queue is empty, but there are still unprocessed actions.');
      break;
    }
    const { op = 'Execute', action, dependencies, params } = actionToPerform[current].config;
    const paramValues = Array.isArray(params)
      ? params?.map((param: { source: string; name: string; value: string; path: string }) =>
        getParamFromSource(
          param.source,
          param.name,
          param.value,
          context,
          getAtomIdById(dependencies, actionToPerform, results)
        )
      )
      : [];

    const bindFn = actions[action].bind(context);

    let result: any;
    try {
      // console.log("Binding Function");
      result = await bindFn(...paramValues, e);
    } catch (error) {
      console.error('Error occured, Cannot continue with the current pipeline', error);
      break;
    }

    let deps: Array<number> = dependents[current]; // Array of indexes
    if (op === 'Conditional') {
      if (Array.isArray(result)) {
        deps = result.map((id: string) => {
          // [ '5' ]
          return actionToPerform.findIndex((atom: any) => {
            return atom.id === id;
          });
        });
      }
      results[current] = result;
    } else if (op === 'LoopStart') {
      //   { "id": "1", "config": { "op": "LoopStart", "iteratorVar": "user", "iterableKey": "users" }},

      const loopEndIndex = actionToPerform.findIndex(
        (atom: any, idx: number) => atom.config.op === 'LoopEnd' && idx > (current ?? -1)
      );

      if (loopEndIndex === -1) {
        throw new Error('LoopEnd not found for LoopStart at index ' + current);
      }

      const { loopOver, start, end } = actionToPerform[current].config;

      const resolvedDeps = getAtomIdById(dependencies, actionToPerform, results);
      const data = getParamFromSource(
        loopOver?.source,
        loopOver?.name,
        loopOver?.value,
        context,
        resolvedDeps
      );
      const startPos = Number(
        getParamFromSource(start?.source, start?.name, start?.value, context, resolvedDeps) || 0
      );
      const endPosRaw = getParamFromSource(
        end?.source,
        end?.name,
        end?.value,
        context,
        resolvedDeps
      );

      // Normalize iterable data
      let iterable: Array<any> = [];
      let endPos: number | undefined = undefined;

      if (Array.isArray(data)) {
        iterable = data;
        endPos = endPosRaw !== undefined ? Math.min(endPosRaw, iterable.length) : iterable.length;
      } else if (data && typeof data === 'object' && !Array.isArray(data)) {
        iterable = Object.entries(data); // [ [key, value], ... ]
        endPos = endPosRaw !== undefined ? Math.min(endPosRaw, iterable.length) : iterable.length;
      } else if (typeof data === 'number' || typeof data === 'string') {
        const str = String(data);
        iterable = Array.from(str);
        endPos = endPosRaw !== undefined ? Math.min(endPosRaw, str.length) : str.length;
      } else {
        // If data is undefined, loop only by start-end
        const limit = endPosRaw !== undefined ? Number(endPosRaw) : 0;
        iterable = Array.from({ length: limit }, (_, i) => i);
        endPos = limit;
      }

      // Slice based on start and end
      const finalIterable = iterable.slice(startPos, endPos);
      const loopResults = [];

      for (let i = 0; i < finalIterable.length; i++) {
        const item = finalIterable[i];

        if (Array.isArray(item)) {
          // key-value pair from Object.entries
          context.loop = {
            index: item[0],
            value: item[1],
          };
        } else {
          context.loop = {
            index: i + startPos,
            value: item,
          };
        }

        const subActions = structuredClone(actionToPerform.slice(current + 1, loopEndIndex));
        subActions[0].config.dependencies = [];
        let isBreakLoop = false;
        const setBreakLoopTrue = () => {
          isBreakLoop = true;
        };
        const result: any = await executeActionPipeline(
          subActions,
          actions,
          context,
          e,
          setBreakLoopTrue
        );
        loopResults.push(result);
        for (let j = current + 1; j <= current + 1 + result.length; j++) {
          if (!results[j]) {
            results[j] = [];
          }
          if (Array.isArray(results[j])) results[j].push(result[j - (current + 1)]);
        }

        if (isBreakLoop) break;
      }

      results[current] = loopResults;

      // Skip loop body actions in main pipeline
      for (let i = current + 1; i <= loopEndIndex; i++) {
        inDegree[i]--;
      }

      deps = dependents[loopEndIndex];
    } else if (op === 'LoopBreak') {
      results[current] = { breakLoop: true };
      setBreakLoopTrue();
      break;
    } else {
      results[current] = result;
    }

    // Update the inDegree of dependent functions
    for (const neighbor of deps) {
      inDegree[neighbor]--;
      if (inDegree[neighbor] === 0) queue.push(neighbor);
    }

    processed++;
  }

  if (processed !== n) {
    console.log('Cycle detected or unresolved dependencies');
  }

  //console.log('All functions executed successfully.', results);
  return results;
}

export function generateUUID(): string {
  const uuid = v4()
  return uuid
}
