const cytoscapeGraph = {
    tag: "cytoscape-graph",
    atoms: [{ type: 'ColourAtom', config: { role: 'background', value: '#202939' } },
    {
        type: 'LayoutAtom',
        config: {
            display: 'flex',
            width: '100%',
            height: '100%',
            justify: 'center',
            align: 'center',
        },
    }, {
        "type": "ThirdPartyAtom",
        "config": {
            "op": "Create",
            "thirdPartyLibraryName": "cytoscape",
            "name": "cy-graph"
        }
    }, {
        "type": "InteractionAtom",
        "id": "loop1",
        "config": {
            "trigger": "OnLoad",
            "dependencies": [],
            "params": [
                {
                    "source": "exact",
                    "value": "cy-graph"
                },
                {
                    "source": "exact",
                    "value": "setContainer"
                }
            ],
            "action": "callThirdPartyService"
        }
    }, {
        "type": "InteractionAtom",
        "id": "loop2",
        "config": {
            "trigger": null,
            "dependencies": [
                "loop1"
            ],
            "params": [
                {
                    "source": "exact",
                    "value": "cy-graph"
                },
                {
                    "source": "exact",
                    "value": "init"
                },
                {
                    "source": "exact",
                    "value": {
                        "elements": [
                            {
                                "group": "nodes",
                                "data": {
                                    "id": "node1",
                                    "label": "Node 1",
                                    "customProperty": "value1"
                                }
                            },
                            {
                                "group": "nodes",
                                "data": {
                                    "id": "node2",
                                    "label": "Node 2",
                                    "customProperty": "value2"
                                }
                            },
                            {
                                "group": "edges",
                                "data": {
                                    "id": "edge1",
                                    "source": "node1",
                                    "target": "node2",
                                    "label": "connects to"
                                }
                            }
                        ], "layout": {
                            "name": "cose",
                            "idealEdgeLength": 100,
                            "nodeOverlap": 20,
                            "refresh": 20,
                            "fit": true,
                            "padding": 30,
                            "randomize": false,
                            "componentSpacing": 40,
                            "nodeRepulsion": 400000,
                            "edgeElasticity": 100,
                            "nestingFactor": 5,
                            "gravity": 80,
                            "numIter": 1000,
                            "initialTemp": 200,
                            "coolingFactor": 0.95,
                            "minTemp": 1.0
                        }, "style": [
                            {
                                "selector": "node",
                                "style": {
                                    "background-color": "#666",
                                    "label": "data(label)",
                                    "text-valign": "center",
                                    "text-halign": "center",
                                    "color": "#fff",
                                    "font-size": 12,
                                    "width": 30,
                                    "height": 30
                                }
                            },
                            {
                                "selector": "edge",
                                "style": {
                                    "width": 2,
                                    "line-color": "#ccc",
                                    "target-arrow-color": "#ccc",
                                    "target-arrow-shape": "triangle",
                                    "curve-style": "bezier",
                                    "label": "data(label)",
                                    "font-size": 10,
                                    "color": "#666"
                                }
                            }
                        ],
                        "zoom": 1,
                        "pan": { "x": 0, "y": 0 },
                        "minZoom": 0.1,
                        "maxZoom": 3,
                        "zoomingEnabled": true,
                        "userZoomingEnabled": true,
                        "panningEnabled": true,
                        "userPanningEnabled": true,
                        "boxSelectionEnabled": true,
                        "selectionType": "single",
                        "autoungrabify": false,
                        "autounselectify": false

                    }
                }
            ],
            "action": "callThirdPartyService"
        }
    }], children: []
}

export default cytoscapeGraph