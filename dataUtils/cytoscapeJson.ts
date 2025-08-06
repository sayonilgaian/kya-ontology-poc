const cytoscapeJson = {
    tag: 'cytoscape-graph-screen',
    atoms: [
        {
            type: 'ColourAtom',
            config: {
                role: 'background',
                value: 'white',
            },
        },
        {
            type: 'LayoutAtom',
            config: {
                display: 'flex',
                width: '100%',
                height: '100vh',
                justify: 'center',
                align: 'center',
                padding: '20px',
                boxSizing: 'border-box',
            },
        },
        {
            type: 'ThirdPartyAtom',
            config: {
                op: 'Create',
                thirdPartyLibraryName: 'cytoscapeCanvas',
                name: 'cyto-graph-1',
            },
        },
        // {
        //     type: 'APIAtom',
        //     config: {
        //         op: 'SetService',
        //         value: {
        //             key: 'dummy',
        //             url: 'https://jsonplaceholder.typicode.com/todos',
        //             headers: {
        //                 'Content-Type': 'application/json',
        //             },
        //         },
        //     },
        // },
        {
            type: 'InteractionAtom',
            id: 'setup-container',
            config: {
                trigger: 'OnLoad',
                dependencies: [],
                params: [
                    {
                        source: 'exact',
                        value: 'cyto-graph-1',
                    },
                    {
                        source: 'exact',
                        value: 'setContainer',
                    },
                ],
                action: 'callThirdPartyService',
            },
        },
        // {
        //     type: 'InteractionAtom',
        //     id: '1',
        //     config: {
        //         trigger: 'OnLoad',
        //         dependencies: [],
        //         params: [
        //             {
        //                 source: 'exact',
        //                 value: 'https://jsonplaceholder.typicode.com/todos',
        //             },
        //         ],
        //         action: 'get',
        //     },
        // },
        {
            type: 'InteractionAtom',
            id: 'init-cytoscape',
            config: {
                trigger: null,
                dependencies: ['setup-container'],
                params: [
                    {
                        source: 'exact',
                        value: 'cyto-graph-1',
                    },
                    {
                        source: 'exact',
                        value: 'init',
                    },
                    {
                        source: 'exact',
                        value: {
                            elements: [
                                {
                                    data: {
                                        id: 'EMP1',
                                        label: 'EMPLOYEE1',
                                        email: 'emp1@mobius.org',
                                        labels: ['Person', 'Chunk', '__KGBuilder__'],
                                        ontologyId: '6892e3f503d2e55af06e3007',
                                        tenantId: '2cf76e5f-26ad-4f2c-bccc-f4bc1e7bfb64',
                                        transactionId: '59307bf1-39a0-4d4c-a3ce-696bbdc95f22',
                                        creationTime: 1754459583259,
                                        entityId: 'c53b8f5a-5654-47b3-994f-0ce30da5dc06',
                                    },
                                },
                                {
                                    data: {
                                        id: 'PI',
                                        label: 'PI',
                                        email: null,
                                        labels: ['Chunk', '__KGBuilder__', 'Project'],
                                        ontologyId: '6892e3f503d2e55af06e3007',
                                        tenantId: '2cf76e5f-26ad-4f2c-bccc-f4bc1e7bfb64',
                                        transactionId: '59307bf1-39a0-4d4c-a3ce-696bbdc95f22',
                                        creationTime: 1754459583841,
                                        entityId: '86345054-4eab-4529-8280-6dcd9ecfa53e',
                                    },
                                },
                                {
                                    data: {
                                        id: 'mobius',
                                        label: 'mobius',
                                        email: null,
                                        labels: ['Chunk', '__KGBuilder__', 'Organization'],
                                        ontologyId: '6892e3f503d2e55af06e3007',
                                        tenantId: '2cf76e5f-26ad-4f2c-bccc-f4bc1e7bfb64',
                                        transactionId: '59307bf1-39a0-4d4c-a3ce-696bbdc95f22',
                                        creationTime: 1754459583825,
                                        entityId: 'bc067d9a-178f-4fa0-bde0-e1ae5dcbcaed',
                                    },
                                },
                                {
                                    data: {
                                        id: 'e0',
                                        source: 'EMP1',
                                        target: 'PI',
                                        label: 'managesProject',
                                    },
                                },
                                {
                                    data: {
                                        id: 'e1',
                                        source: 'EMP1',
                                        target: 'mobius',
                                        label: 'worksFor',
                                    },
                                },
                                {
                                    data: {
                                        id: 'e2',
                                        source: 'PI',
                                        target: 'mobius',
                                        label: 'belongsTo',
                                    },
                                },
                            ],
                            // [
                            //     // Nodes
                            //     {
                            //         data: {
                            //             id: 'automation',
                            //             label: 'Automation',
                            //             type: 'server',
                            //         },
                            //         classes: 'affected',
                            //     },
                            //     {
                            //         data: {
                            //             id: 'lightingSystem',
                            //             label: 'Lighting System',
                            //             type: 'client',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'temperatureSensor',
                            //             label: 'TemperatureSensor',
                            //             type: 'sensor',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'user',
                            //             label: 'User',
                            //             type: 'auth',
                            //         },
                            //         classes: 'affected',
                            //     },
                            //     {
                            //         data: {
                            //             id: 'environment',
                            //             label: 'Environment',
                            //             type: 'database',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'inputDevice',
                            //             label: 'Input Device',
                            //             type: 'cache',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'supportsMode',
                            //             label: 'supports mode',
                            //             type: 'balancer',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'inRoom1',
                            //             label: 'inRoom',
                            //             type: 'balancer',
                            //         },
                            //     },

                            //     // Edges
                            //     {
                            //         data: {
                            //             id: 'e1',
                            //             source: 'automation',
                            //             target: 'lightingSystem',
                            //             label: 'supports',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'e2',
                            //             source: 'lightingSystem',
                            //             target: 'supportsMode',
                            //             label: 'supports mode',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'e3',
                            //             source: 'automation',
                            //             target: 'temperatureSensor',
                            //             label: 'has an',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'e4',
                            //             source: 'automation',
                            //             target: 'user',
                            //             label: 'has sensor',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'e5',
                            //             source: 'environment',
                            //             target: 'automation',
                            //             label: 'controls',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'e6',
                            //             source: 'user',
                            //             target: 'inRoom1',
                            //             label: 'inRoom',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'e7',
                            //             source: 'user',
                            //             target: 'automation',
                            //             label: 'hasPreference',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'e8',
                            //             source: 'user',
                            //             target: 'lightingSystem',
                            //             label: 'forAction',
                            //         },
                            //     },
                            //     {
                            //         data: {
                            //             id: 'e9',
                            //             source: 'inputDevice',
                            //             target: 'automation',
                            //             label: 'hasSensor',
                            //         },
                            //     },
                            // ],
                            style: [
                                // Default node style
                                {
                                    selector: 'node',
                                    style: {
                                        label: 'data(label)',
                                        'text-valign': 'center',
                                        'text-halign': 'center',
                                        color: '#2c3e50',
                                        'font-size': '11px',
                                        'font-weight': 'bold',
                                        'text-wrap': 'wrap',
                                        'text-max-width': '100px',
                                        'background-color': '#dfe6e9',
                                        'border-color': '#b2bec3',
                                        'border-width': 2,
                                        shape: 'ellipse',
                                        width: 'label',
                                        height: 'label',
                                        padding: '8px',
                                    },
                                },

                                // Automation (central red node)
                                {
                                    selector: 'node[label = "Automation"]',
                                    style: {
                                        'background-color': '#c0392b',
                                        'border-color': '#96281b',
                                        color: '#fff',
                                    },
                                },

                                // User (orange node)
                                {
                                    selector: 'node[label = "User"]',
                                    style: {
                                        'background-color': '#f39c12',
                                        'border-color': '#d35400',
                                        color: '#fff',
                                    },
                                },

                                // Environment (blue node)
                                {
                                    selector: 'node[label = "Environment"]',
                                    style: {
                                        'background-color': '#74b9ff',
                                        'border-color': '#0984e3',
                                        color: '#fff',
                                    },
                                },

                                // Lighting System (dark orange-red)
                                {
                                    selector: 'node[label = "Lighting System"]',
                                    style: {
                                        'background-color': '#e67e22',
                                        'border-color': '#d35400',
                                        color: '#fff',
                                    },
                                },

                                // TemperatureSensor (bright red box)
                                {
                                    selector: 'node[label = "TemperatureSensor"]',
                                    style: {
                                        'background-color': '#ff4d4d',
                                        'border-color': '#c0392b',
                                        shape: 'round-rectangle',
                                        color: '#fff',
                                    },
                                },

                                // Input Device (blue gray)
                                {
                                    selector: 'node[label = "Input Device"]',
                                    style: {
                                        'background-color': '#a29bfe',
                                        'border-color': '#6c5ce7',
                                        color: '#fff',
                                    },
                                },

                                // inRoom nodes (yellow label boxes)
                                {
                                    selector: 'node[label = "inRoom"]',
                                    style: {
                                        'background-color': '#ffeaa7',
                                        'border-color': '#fdcb6e',
                                        color: '#2d3436',
                                        shape: 'round-rectangle',
                                    },
                                },

                                // Affected or impacted nodes
                                {
                                    selector: 'node.affected',
                                    style: {
                                        'overlay-color': '#ff7675',
                                        'overlay-opacity': 0.25,
                                        'border-width': 3,
                                    },
                                },

                                // Edge style
                                {
                                    selector: 'edge',
                                    style: {
                                        width: 2,
                                        'line-color': '#b2bec3',
                                        'target-arrow-color': '#b2bec3',
                                        'target-arrow-shape': 'triangle',
                                        'curve-style': 'bezier',
                                        label: 'data(label)',
                                        'font-size': '10px',
                                        'text-background-color': '#ffffff',
                                        'text-background-opacity': 1,
                                        'text-background-shape': 'roundrectangle',
                                        'text-background-padding': '3px',
                                        color: '#2d3436',
                                        'text-rotation': 'autorotate',
                                    },
                                },

                                // Highlight edge on selection
                                {
                                    selector: 'edge:selected',
                                    style: {
                                        'line-color': '#ff7675',
                                        'target-arrow-color': '#ff7675',
                                        width: 3,
                                    },
                                },

                                // Hover effects
                                {
                                    selector: 'node:hover',
                                    style: {
                                        'border-color': '#ffffff',
                                        'border-width': 3,
                                    },
                                },
                            ],
                            layout: {
                                name: 'cose',
                                idealEdgeLength: 120,
                                nodeOverlap: 10,
                                refresh: 20,
                                fit: true,
                                padding: 50,
                                randomize: false,
                                componentSpacing: 60,
                                nodeRepulsion: 400000,
                                edgeElasticity: 100,
                                nestingFactor: 5,
                                gravity: 80,
                                numIter: 1000,
                                initialTemp: 200,
                                coolingFactor: 0.95,
                                minTemp: 1.0,
                            },
                            zoom: 1,
                            pan: { x: 0, y: 0 },
                            minZoom: 0.3,
                            maxZoom: 3,
                            zoomingEnabled: true,
                            userZoomingEnabled: true,
                            panningEnabled: true,
                            userPanningEnabled: true,
                            boxSelectionEnabled: true,
                            selectionType: 'single',
                            autoungrabify: false,
                            autounselectify: false,
                            onNodeClick: function (node) {
                                console.log('Node clicked:', node.data());
                                // You can trigger framework actions here
                            },
                            onEdgeClick: function (edge) {
                                console.log('Edge clicked:', edge.data());
                            },
                            onBackgroundClick: function () {
                                console.log('Background clicked');
                            },
                        },
                    },
                ],
                action: 'callThirdPartyService',
            },
        },
        // Optional: Add interaction to add new nodes dynamically
        {
            type: 'InteractionAtom',
            id: 'add-node-demo',
            config: {
                trigger: 'click',
                dependencies: [],
                params: [
                    {
                        source: 'exact',
                        value: 'cyto-graph-1',
                    },
                    {
                        source: 'exact',
                        value: 'addNode',
                    },
                    {
                        source: 'exact',
                        value: {
                            id: '467c0265-47ba-4b06-b41d-841eb4b21143',
                            label: 'New Node',
                            type: 'dynamic',
                        },
                    },
                ],
                action: 'callThirdPartyService',
            },
        },
    ],
    children: [],
};

export default cytoscapeJson;
