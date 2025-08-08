const createEdgeJson = [
  {
    tag: 'create-edge',
    atoms: [
      // ---- UI Styling ----
      { type: 'ContentAtom', config: { text: 'Create Edge:' } },
      { type: 'ColourAtom', config: { role: 'background', value: '#3e469aff' } },
      { type: 'LayoutAtom', config: { display: 'flex', align: 'center', gap: '16px', padding: '0.5rem 1rem', borderRadius: '10px', position: 'absolute', bottom: '6rem', left: '2rem', color: 'white', cursor: 'pointer' } },

      // ---- State for Inputs & Temp ----
      { type: 'StateAtom', id: 'edge-name-state',    config: { op: 'Initialize', name: 'edgeNameState', value: '' }},
      { type: 'StateAtom', id: 'edge-domain-state',  config: { op: 'Initialize', name: 'edgeDomainState', value: '' }},
      { type: 'StateAtom', id: 'edge-range-state',   config: { op: 'Initialize', name: 'edgeRangeState', value: '' }},
      { type: 'StateAtom', id: 'temp-edge-array',    config: { op: 'Initialize', name: 'tempEdgeArrayState', value: []} },

      // -- 1. Compose edge property URL --
      {
        type: 'InteractionAtom', id: 'edge-url-1-qowkrjoiroi',
        config: {
          trigger: 'click',
          action: 'concatString',
          params: [
            { source: 'exact', value: 'http://www.semanticweb.org/mdebe/ontologies/example#' },
            { source: 'state', name: 'edgeNameState' },
          ]
        }
      },
      // -- 2. Create property object --
      {
        type: 'InteractionAtom', id: 'property-object',
        config: {
          trigger: null, dependencies: ['edge-url-1-qowkrjoiroi'],
          action: 'setMethod',
          params: [
            {
              source: 'exact', value: {
                name: '', url: '', attributes: {}, ontologyNodeTypeEnum: 'PROPERTY'
              }
            },
            { source: 'exact', value: 'url' }, // setMethod: targetObj, property to set, value
            { source: 'pipe' }, // URL from previous step
          ]
        }
      },
      {
        type: 'InteractionAtom', id: 'property-object-name',
        config: {
          trigger: null, dependencies: ['property-object'],
          action: 'setMethod',
          params: [
            { source: 'pipe' },
            { source: 'exact', value: 'name' },
            { source: 'state', name: 'edgeNameState' },
          ]
        }
      },
      // --- 3. Compose domain URL ---
      {
        type: 'InteractionAtom', id: 'domain-url-1',
        config: {
          trigger: null, dependencies: ['property-object-name'],
          action: 'concatString',
          params: [
            { source: 'exact', value: 'http://example.org/standardOntology#' },
            { source: 'state', name: 'edgeDomainState' },
          ]
        }
      },
      // --- 4. Create domain object ---
      {
        type: 'InteractionAtom', id: 'domain-object',
        config: {
          trigger: null, dependencies: ['domain-url-1'],
          action: 'setMethod',
          params: [
            { source: 'exact', value: { name: '', url: '', attributes: {}, ontologyNodeTypeEnum: 'CLASS' }},
            { source: 'exact', value: 'url' },
            { source: 'pipe' }
          ]
        }
      },
      {
        type: 'InteractionAtom', id: 'domain-object-name',
        config: {
          trigger: null, dependencies: ['domain-object'],
          action: 'setMethod',
          params: [
            { source: 'pipe' },
            { source: 'exact', value: 'name' },
            { source: 'state', name: 'edgeDomainState' },
          ]
        }
      },
      // --- 5. Compose range URL ---
      {
        type: 'InteractionAtom', id: 'range-url-1',
        config: {
          trigger: null, dependencies: ['domain-object-name'],
          action: 'concatString',
          params: [
            { source: 'exact', value: 'http://example.org/standardOntology#' },
            { source: 'state', name: 'edgeRangeState' },
          ]
        }
      },
      // --- 6. Create range object ---
      {
        type: 'InteractionAtom', id: 'range-object',
        config: {
          trigger: null, dependencies: ['range-url-1'],
          action: 'setMethod',
          params: [
            { source: 'exact', value: { name: '', url: '', attributes: {}, ontologyNodeTypeEnum: 'RESOURCE' }},
            { source: 'exact', value: 'url' },
            { source: 'pipe' }
          ]
        }
      },
      {
        type: 'InteractionAtom', id: 'range-object-name',
        config: {
          trigger: null, dependencies: ['range-object'],
          action: 'setMethod',
          params: [
            { source: 'pipe' },
            { source: 'exact', value: 'name' },
            { source: 'state', name: 'edgeRangeState' },
          ]
        }
      },
      // --- 7. Compose the Edge Payload (final object) ---
      {
        type: 'InteractionAtom', id: 'compose-edge-payload',
        config: {
          trigger: null, dependencies: ['property-object-name', 'domain-object-name', 'range-object-name'],
          action: 'setMethod',
          params: [
            {
              source: 'exact',
              value: {
                properties: {},
                domain: {},
                range: {}
              }
            },
            { source: 'exact', value: 'properties' },
            { source: 'pipe', value: 'property-object-name' }
          ],
        },
      },
      {
        type: 'InteractionAtom', id: 'set-domain-on-payload',
        config: {
          trigger: null, dependencies: ['compose-edge-payload', 'domain-object-name'],
          action: 'setMethod',
          params: [
            { source: 'pipe', value: 'compose-edge-payload' },
            { source: 'exact', value: 'domain' },
            { source: 'pipe', value: 'domain-object-name' },
          ]
        }
      },
      {
        type: 'InteractionAtom', id: 'set-range-on-payload',
        config: {
          trigger: null, dependencies: ['set-domain-on-payload', 'range-object-name'],
          action: 'setMethod',
          params: [
            { source: 'pipe', value: 'set-domain-on-payload' },
            { source: 'exact', value: 'range' },
            { source: 'pipe', value: 'range-object-name' },
          ]
        }
      },
      // --- 8. Wrap in array and set state for API ---
      {
        type: 'InteractionAtom', id: 'wrap-array',
        config: {
          trigger: null, dependencies: ['set-range-on-payload'],
          action: 'pushToArray',
          params: [
            { source: 'state', name: 'tempEdgeArrayState' },
            { source: 'pipe' }
          ],
        },
      },
      {
        type: 'InteractionAtom', id: 'set-edge-payload-state-uiu8000',
        config: {
          trigger: null, dependencies: ['wrap-array'],
          action: 'setState',
          params: [
            { source: 'exact', value: 'tempEdgeArrayState' },
            { source: 'pipe' }
          ],
        },
      },
      // --- 9. POST the payload ---
      {
        type: 'InteractionAtom', id: 'post-create-edge-api',
        config: {
          trigger: null,
          dependencies: [
            'edge-url-1-qowkrjoiroi', // This holds the api url: ends with '/create'
            'create-headers-bf127fc7-04fd-4011-a82a-e21e4fc68ccb-sadjnbjsbd', // you can reuse "create" header logic from node pipeline
            // 'set-edge-payload-state-uiu8000',
          ],
          action: 'post',
          params: [
            { source: 'exact', value: 'edge-url-1-qowkrjoiroi' }, // API URL
            { source: 'state', name: 'tempEdgeArrayState' }, // Payload
            { source: 'exact', value: '' }, // service map key
            { source: 'exact', value: 'create-headers-bf127fc7-04fd-4011-a82a-e21e4fc68ccb-sadjnbjsbd' }, // Headers
          ],
        },
      },
      // --- Success/notification atoms can go here ---
    ],
    children: [
      // Inputs (label + input) for edgeName, domainName, rangeName:
      {
        tag: 'edge-name-input',
        atoms: [
          { type: 'ContentAtom', config: { text: '' } },
          { type: 'attributeAtom', config: { attribute: 'contenteditable', value: 'true' }},
          { type: 'LayoutAtom', config: { 'min-width': '3rem', border: 'none', borderRadius: '8px', padding: '8px', outline: 'none', background: '#fff', color: 'black', cursor: 'text' }},
          // input pipeline
          { type: 'InteractionAtom', id: 'edge-name-input-read', config: { trigger: 'input', action: 'read', params: [{}]}},
          { type: 'InteractionAtom', id: 'edge-name-handle', config: { trigger: null, dependencies: ['edge-name-input-read'], action: 'handleInput', params: [{ source: 'pipe' }] }},
          { type: 'InteractionAtom', id: 'set-state-edge-name', config: { trigger: null, dependencies: ['edge-name-handle'], action: 'setState', params: [{ source: 'exact', value: 'edgeNameState' }, { source: 'pipe' }] }},
        ],
      },
      {
        tag: 'edge-domain-input',
        atoms: [
          { type: 'ContentAtom', config: { text: '' } },
          { type: 'attributeAtom', config: { attribute: 'contenteditable', value: 'true' }},
          { type: 'LayoutAtom', config: { 'min-width': '3rem', border: 'none', borderRadius: '8px', padding: '8px', outline: 'none', background: '#fff', color: 'black', cursor: 'text' }},
          { type: 'InteractionAtom', id: 'edge-domain-input-read', config: { trigger: 'input', action: 'read', params: [{}]}},
          { type: 'InteractionAtom', id: 'edge-domain-handle', config: { trigger: null, dependencies: ['edge-domain-input-read'], action: 'handleInput', params: [{ source: 'pipe' }] }},
          { type: 'InteractionAtom', id: 'set-state-edge-domain', config: { trigger: null, dependencies: ['edge-domain-handle'], action: 'setState', params: [{ source: 'exact', value: 'edgeDomainState' }, { source: 'pipe' }] }},
        ],
      },
      {
        tag: 'edge-range-input',
        atoms: [
          { type: 'ContentAtom', config: { text: '' } },
          { type: 'attributeAtom', config: { attribute: 'contenteditable', value: 'true' }},
          { type: 'LayoutAtom', config: { 'min-width': '3rem', border: 'none', borderRadius: '8px', padding: '8px', outline: 'none', background: '#fff', color: 'black', cursor: 'text' }},
          { type: 'InteractionAtom', id: 'edge-range-input-read', config: { trigger: 'input', action: 'read', params: [{}]}},
          { type: 'InteractionAtom', id: 'edge-range-handle', config: { trigger: null, dependencies: ['edge-range-input-read'], action: 'handleInput', params: [{ source: 'pipe' }] }},
          { type: 'InteractionAtom', id: 'set-state-edge-range', config: { trigger: null, dependencies: ['edge-range-handle'], action: 'setState', params: [{ source: 'exact', value: 'edgeRangeState' }, { source: 'pipe' }] }},
        ],
      }
    ],
  },
];

export default createEdgeJson;
