const sampleJson = {
    tag: 'center-section',
    atoms: [
        {
            type: 'LayoutAtom',
            config: {
                width: '100%',
                height: '100%',
                display: 'flex',
            },
        },
        {
            type: 'ColourAtom',
            config: {
                role: 'background',
                value: 'token:color-bg-surface8',
            },
        },
        { type: 'StateAtom', config: { op: 'Initialize', name: 'ontologyData', value: {} } },
        {
            type: 'InteractionAtom',
            id: 'get-data19f9e5e1-b474-4eca-8662-0abbdd83abfb',
            config: {
                trigger: 'OnLoad',
                dependencies: [],
                params: [
                    {
                        source: 'exact',
                        value: 'https://jsonplaceholder.typicode.com/todos',
                    },
                ],
                action: 'get',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'update-data-in-state-329457d4-949b-48a8-99a2-b0c65e6815be',
            config: {
                trigger: 'stateChange',
                dependencies: ['get-data19f9e5e1-b474-4eca-8662-0abbdd83abfb'],
                params: [
                    {
                        source: 'exact',
                        value: 'ontologyData',
                    },
                    {
                        source: 'state',
                        name: 'ontologyData',
                    },
                ],
                action: 'setState',
            },
        },
    ],
    children: [],
};

export default sampleJson;
