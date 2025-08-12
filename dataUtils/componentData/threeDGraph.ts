const threeDGraph = {
    tag: "force-graph-screen",
    atoms: [
        { type: 'ColourAtom', config: { role: 'background', value: '#202939' } },
        {
            type: 'LayoutAtom',
            config: {
                display: 'flex',
                width: '100%',
                height: '100%',
                justify: 'center',
                align: 'center',
            },
        },
        {
            "type": "ThirdPartyAtom",
            "config": {
                "op": "Create",
                "thirdPartyLibraryName": "3dForceGraph",
                "name": "graph-1"
            }
        },
        {
            "type": "InteractionAtom",
            "id": "loop1",
            "config": {
                "trigger": "OnLoad",
                "dependencies": [],
                "params": [
                    {
                        "source": "exact",
                        "value": "graph-1"
                    },
                    {
                        "source": "exact",
                        "value": "setContainer"
                    }
                ],
                "action": "callThirdPartyService"
            }
        },
        {
            "type": "InteractionAtom",
            "id": "loop11",
            "config": {
                "trigger": null,
                "dependencies": [
                    "loop1"
                ],
                "params": [
                    {
                        "source": "exact",
                        "value": "graph-1"
                    },
                    {
                        "source": "exact",
                        "value": "init"
                    },
                    {
                        "source": "exact",
                        "value": {
                            "width": '100%',
                            "height": '100%',
                            "backgroundColor": "gray",
                            "data": {
                                "nodes": [
                                    {
                                        "id": "1",
                                        "name": "Node 1",
                                        "group": "A"
                                    },
                                    {
                                        "id": "2",
                                        "name": "Node 2",
                                        "group": "A"
                                    },
                                    {
                                        "id": "3",
                                        "name": "Node 3",
                                        "group": "B"
                                    },
                                    {
                                        "id": "4",
                                        "name": "Node 4",
                                        "group": "B"
                                    }
                                ],
                                "links": [
                                    {
										"name": "links 2",
                                        "source": "1",
                                        "target": "2"
                                    },
                                    {
										"name": "links 2",
                                        "source": "1",
                                        "target": "3"
                                    },
                                    {
										"name": "links 2",
                                        "source": "1",
                                        "target": "4"
                                    }
                                ]
                            },"nodeColor":"red"
                        }
                    }
                ],
                "action": "callThirdPartyService"
            }
        }
    ],
    children: []
}

export default threeDGraph