const cytoscapeJson = {
    tag: "cytoscape-graph-screen",
    atoms: [
        { 
            type: 'ColourAtom', 
            config: { 
                role: 'background', 
                value: '#1a1a1a' 
            } 
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
                boxSizing: 'border-box'
            },
        },
        {
            type: "ThirdPartyAtom",
            config: {
                op: "Create",
                thirdPartyLibraryName: "cytoscapeCanvas",
                name: "cyto-graph-1"
            }
        },
        {
            type: "InteractionAtom",
            id: "setup-container",
            config: {
                trigger: "OnLoad",
                dependencies: [],
                params: [
                    {
                        source: "exact",
                        value: "cyto-graph-1"
                    },
                    {
                        source: "exact",
                        value: "setContainer"
                    }
                ],
                action: "callThirdPartyService"
            }
        },
        {
            type: "InteractionAtom",
            id: "init-cytoscape",
            config: {
                trigger: null,
                dependencies: ["setup-container"],
                params: [
                    {
                        source: "exact",
                        value: "cyto-graph-1"
                    },
                    {
                        source: "exact",
                        value: "init"
                    },
                    {
                        source: "exact",
                        value: {
                            elements: [
                                // Nodes
                                { 
                                    data: { 
                                        id: 'node1', 
                                        label: 'Database',
                                        type: 'database'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'node2', 
                                        label: 'API Server',
                                        type: 'server'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'node3', 
                                        label: 'Frontend',
                                        type: 'client'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'node4', 
                                        label: 'Cache',
                                        type: 'cache'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'node5', 
                                        label: 'Load Balancer',
                                        type: 'balancer'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'node6', 
                                        label: 'Authentication',
                                        type: 'auth'
                                    } 
                                },
                                
                                // Edges
                                { 
                                    data: { 
                                        id: 'edge1', 
                                        source: 'node2', 
                                        target: 'node1',
                                        label: 'queries'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'edge2', 
                                        source: 'node3', 
                                        target: 'node2',
                                        label: 'API calls'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'edge3', 
                                        source: 'node2', 
                                        target: 'node4',
                                        label: 'cache'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'edge4', 
                                        source: 'node5', 
                                        target: 'node2',
                                        label: 'routes'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'edge5', 
                                        source: 'node3', 
                                        target: 'node5',
                                        label: 'requests'
                                    } 
                                },
                                { 
                                    data: { 
                                        id: 'edge6', 
                                        source: 'node6', 
                                        target: 'node2',
                                        label: 'validates'
                                    } 
                                }
                            ],
                            style: [
                                {
                                    selector: 'node',
                                    style: {
                                        'background-color': '#4a90e2',
                                        'label': 'data(label)',
                                        'text-valign': 'center',
                                        'text-halign': 'center',
                                        'color': '#ffffff',
                                        'font-size': '12px',
                                        'font-weight': 'bold',
                                        'width': '60px',
                                        'height': '60px',
                                        'border-width': '2px',
                                        'border-color': '#357abd',
                                        'text-wrap': 'wrap',
                                        'text-max-width': '80px'
                                    }
                                },
                                {
                                    selector: 'node[type="database"]',
                                    style: {
                                        'background-color': '#e74c3c',
                                        'border-color': '#c0392b',
                                        'shape': 'round-rectangle'
                                    }
                                },
                                {
                                    selector: 'node[type="server"]',
                                    style: {
                                        'background-color': '#2ecc71',
                                        'border-color': '#27ae60',
                                        'shape': 'hexagon'
                                    }
                                },
                                {
                                    selector: 'node[type="client"]',
                                    style: {
                                        'background-color': '#f39c12',
                                        'border-color': '#e67e22',
                                        'shape': 'triangle'
                                    }
                                },
                                {
                                    selector: 'node[type="cache"]',
                                    style: {
                                        'background-color': '#9b59b6',
                                        'border-color': '#8e44ad',
                                        'shape': 'diamond'
                                    }
                                },
                                {
                                    selector: 'node[type="balancer"]',
                                    style: {
                                        'background-color': '#34495e',
                                        'border-color': '#2c3e50',
                                        'shape': 'octagon'
                                    }
                                },
                                {
                                    selector: 'node[type="auth"]',
                                    style: {
                                        'background-color': '#e67e22',
                                        'border-color': '#d35400',
                                        'shape': 'pentagon'
                                    }
                                },
                                {
                                    selector: 'edge',
                                    style: {
                                        'width': '3px',
                                        'line-color': '#95a5a6',
                                        'target-arrow-color': '#95a5a6',
                                        'target-arrow-shape': 'triangle',
                                        'curve-style': 'bezier',
                                        'label': 'data(label)',
                                        'font-size': '10px',
                                        'color': '#ecf0f1',
                                        'text-rotation': 'autorotate',
                                        'text-margin-y': '-10px'
                                    }
                                },
                                {
                                    selector: 'node:selected',
                                    style: {
                                        'border-width': '4px',
                                        'border-color': '#ffff00',
                                        'background-color': '#ff6b6b'
                                    }
                                },
                                {
                                    selector: 'edge:selected',
                                    style: {
                                        'line-color': '#ff6b6b',
                                        'target-arrow-color': '#ff6b6b',
                                        'width': '5px'
                                    }
                                },
                                {
                                    selector: 'node:hover',
                                    style: {
                                        'border-width': '3px',
                                        'border-color': '#ffffff'
                                    }
                                }
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
                                minTemp: 1.0
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
                            onNodeClick: function(node) {
                                console.log('Node clicked:', node.data());
                                // You can trigger framework actions here
                            },
                            onEdgeClick: function(edge) {
                                console.log('Edge clicked:', edge.data());
                            },
                            onBackgroundClick: function() {
                                console.log('Background clicked');
                            }
                        }
                    }
                ],
                action: "callThirdPartyService"
            }
        },
        // Optional: Add interaction to add new nodes dynamically
        {
            type: "InteractionAtom",
            id: "add-node-demo",
            config: {
                trigger: "click",
                dependencies: [],
                params: [
                    {
                        source: "exact",
                        value: "cyto-graph-1"
                    },
                    {
                        source: "exact",
                        value: "addNode"
                    },
                    {
                        source: "exact",
                        value: {
                            id: 'dynamic-node-' + Date.now(),
                            label: 'New Node',
                            type: 'dynamic'
                        }
                    }
                ],
                action: "callThirdPartyService"
            }
        }
    ],
    children: []
};

export default cytoscapeJson;