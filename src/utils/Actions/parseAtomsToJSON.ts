import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";
import { generateUUID } from "../common";

export function parseAtomsToJSON(
    this: BaseUIElement,
    object: Array<any>,
    resultState: string,
    atomState: string,
    componentState: string,
    addAtomPopupState: string
) {
    const children = [];
    const atoms = object;
    for (let i of atoms) {
        const config = i.config;
        const keys = Object.keys(config);
        const type = i.type.replace("Atom", " Atom");
        const atomId = i.id;
        if(i.tag === "InteractionAtom"){
            continue;
        }
        // Row 1: Type heading
        const typeHeading = {
            tag: "mobius-div",
            atoms: [
                {
                    type: "LayoutAtom",
                    config: {
                        display: "flex",
                        "justify-content": "space-between",
                        "align-items": "center",
                        width: "100%",
                        "font-family": "Inter",
                        "font-weight": "500",
                        size: "14px",
                        color: "rgb(17, 25, 40)",
                    },
                },
            ],
            children: [
                {
                    tag: "mobius-div",
                    atoms: [
                        {
                            type: "ContentAtom",
                            config: { text: type },
                        },
                    ],
                },
                {
                    tag: "mobius-div",
                    atoms: [
                        {
                            type: "ContentAtom",
                            config: { text: "✕" },
                        },
                        {
                            type: "InteractionAtom",
                            id: "4",
                            config: {
                                trigger: "click",
                                params: [
                                    { source: "state", name: atomState },
                                    { source: "exact", value: "" },
                                ],
                                dependencies: [],
                                action: "getMethod",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "5",
                            config: {
                                trigger: null,
                                dependencies: ["4"],
                                params: [
                                    {
                                        source: "pipe",
                                        value: "",
                                    },
                                    {
                                        source: "exact",
                                        value: atomId,
                                    },
                                ],
                                action: "removeAtomsFromArray",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "6",
                            config: {
                                trigger: null,
                                dependencies: ["5"],
                                params: [
                                    {
                                        source: "exact",
                                        value: atomState,
                                    },
                                    {
                                        source: "pipe",
                                        value: "",
                                    },
                                ],
                                action: "setState",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "replaceAtomsOfComponentInJSON",
                            config: {
                                trigger: null,
                                dependencies: ["6"],
                                params: [
                                    {
                                        source: "state",
                                        name: resultState,
                                    },
                                    {
                                        source: "state",
                                        name: componentState,
                                    },
                                    {
                                        source: "state",
                                        name: atomState,
                                    },
                                ],
                                action: "replaceAtomsOfComponentInJSON",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "setState",
                            config: {
                                trigger: null,
                                dependencies: ["replaceAtomsOfComponentInJSON"],
                                params: [
                                    {
                                        source: "exact",
                                        value: resultState,
                                    },
                                    {
                                        source: "pipe",
                                        value: "",
                                    },
                                ],
                                action: "setState",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "setState2",
                            config: {
                                trigger: null,
                                dependencies: ["setState"],
                                params: [
                                    {
                                        source: "exact",
                                        value: "selectedComp",
                                    },
                                    {
                                        source: "pipe",
                                        value: "",
                                    },
                                ],
                                action: "setState",
                            },
                        },
                    ],
                },
            ],
        };

        // Row 2: Grid of key-value pairs
        const gridChildren = [];

        for (let key of keys) {
            const value = config[key];
            if (typeof value !== "string") continue;

            gridChildren.push(
                {
                    tag: "mobius-div",
                    atoms: [
                        { type: "ContentAtom", config: { text: key } },
                        {
                            type: "LayoutAtom",
                            config: {
                                color: "rgb(17, 25, 40)",
                                width: "100%",
                                height: "auto",
                                "font-family": "Inter",
                                size: "14px",
                                "font-weight": "500",
                                "white-space": "nowrap",
                                overflow: "hidden",
                                "text-overflow": "ellipsis",
                            },
                        },
                    ],
                },
                {
                    tag: "mobius-div",
                    atoms: [
                        { type: "ContentAtom", config: { text: value } },
                        {
                            type: "LayoutAtom",
                            config: {
                                color: "rgb(17, 25, 40)",
                                width: "100%",
                                height: "auto",
                                "font-family": "Inter",
                                size: "12px",
                                "font-weight": "500",
                                "white-space": "nowrap",
                                overflow: "hidden",
                                "text-overflow": "ellipsis",
                            },
                        },
                        {
                            type: "attributeAtom",
                            config: {
                                attribute: "contenteditable",
                                value: "true",
                            },
                        },
                        {
							"type": "StateAtom",
							"config": {
								"op": "Initialize",
								"name": "input",
								"value": null
							}
						},
                        {
                            type: "InteractionAtom",
                            id: "1",
                            config: {
                                trigger: "input",
                                dependencies: [],
                                params: [{}],
                                action: "read",
                            },
                        },
                        {
							"type": "InteractionAtom",
							"id": "11",
							"config": {
								"trigger": null,
								"dependencies": ["1"],
								"params": [
									{ "source": "pipe" }
								],
								"action": "handleInput"
							}
						},
                        {
                            type: "InteractionAtom",
                            "tag":"ram-1",
                            id: "2",
                            config: {
                                trigger: null,
                                dependencies: ["11"],
                                params: [
                                    { source: "exact", value: i },
                                    { source: "exact", value: key },
                                    { source: "pipe" },
                                ],
                                action: "updatePropertyInAtom",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "3",
                            config: {
                                trigger: null,
                                dependencies: ["2"],
                                params: [
                                    { source: "exact", value: object },
                                    { source: "pipe" },
                                ],
                                action: "replaceAtomInComponent",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "4",
                            config: {
                                trigger: null,
                                dependencies: ["3"],
                                params: [
                                    {
                                        source: "exact",
                                        value: atomState,
                                    },
                                    {
                                        source: "pipe",
                                        value: "",
                                    },
                                ],
                                action: "setStateWithoutNotify",
                            },
                        },
                        {
                            type: "KeyboardEventAtom",
                            config: { op: "AddCustomEvent", value: "enter" },
                        },
                        {
                            type: "InteractionAtom",
                            id: "5",
                            config: {
                                trigger: "enter",
                                dependencies: [],
                                params: [
                                    {
                                        source: "exact",
                                        value: atomState,
                                    },
                                    {
                                        source: "state",
                                        name: atomState,
                                    },
                                ],
                                action: "setState",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "replaceAtomsOfComponentInJSON",
                            config: {
                                trigger: null,
                                dependencies: ["5"],
                                params: [
                                    {
                                        source: "state",
                                        name: resultState,
                                    },
                                    {
                                        source: "state",
                                        name: componentState,
                                    },
                                    {
                                        source: "state",
                                        name: atomState,
                                    },
                                ],
                                action: "replaceAtomsOfComponentInJSON",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "setState",
                            config: {
                                trigger: null,
                                dependencies: ["replaceAtomsOfComponentInJSON"],
                                params: [
                                    {
                                        source: "exact",
                                        value: resultState,
                                    },
                                    {
                                        source: "pipe",
                                        value: "",
                                    },
                                ],
                                action: "setState",
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "setState2",
                            config: {
                                trigger: null,
                                dependencies: ["setState"],
                                params: [
                                    {
                                        source: "exact",
                                        value: "selectedComp",
                                    },
                                    {
                                        source: "pipe",
                                        value: "",
                                    },
                                ],
                                action: "setState",
                            },
                        },
                    ],
                }
            );
        }

        const gridWrapper = {
            tag: "mobius-div",
            atoms: [
                {
                    type: "LayoutAtom",
                    config: {
                        display: "grid",
                        "grid-template-columns": "1fr 1fr",
                        gap: "12px",
                    },
                },
                {
                    type: "StyleAtom",
                    config: {
                        "background-color": "#f8fafc",
                        border: "1px solid #e2e8f0",
                        padding: "12px",
                        "border-radius": "8px",
                    },
                },
            ],
            children: gridChildren,
        };

        children.push({
            tag: "mobius-div",
            atoms: [
                {
                    type: "LayoutAtom",
                    config: {
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                    },
                },
            ],
            children: [typeHeading, gridWrapper],
        });
    }

    const addAtom = {
        tag: "btn-content",
        atoms: [
            {
                type: "LayoutAtom",
                config: {
                    display: "flex",
                    width: "30%",
                    height: "60%",
                    align: "center",
                    justify: "center",
                    border: "1px solid black",
                    background: "blue",
                    cursor: "pointer",
                    "border-radius": "5px",
                    "font-size": "0.9vw",
                    padding: "0.5rem",
                },
            },
            {
                type: "ContentAtom",
                config: {
                    role: "text",
                    text: "Add atom",
                },
            },
            {
                type: "ColourAtom",
                config: {
                    role: "text",
                    value: "white",
                },
            },
            {
                type: "InteractionAtom",
                id: addAtomPopupState,
                config: {
                    trigger: "click",
                    params: [
                        { source: "exact", value: addAtomPopupState },
                        { source: "exact", value: true },
                    ],
                    dependencies: [],
                    action: "setState",
                    state: addAtomPopupState,
                },
            },
        ],
        children: [],
    };
    
    const saveAtom = {
        tag: "btn-content",
        atoms: [
            {
                type: "LayoutAtom",
                config: {
                    display: "flex",
                    width: "30%",
                    height: "60%",
                    align: "center",
                    justify: "center",
                    border: "1px solid #1548B8",
                    background: "blue",
                    cursor: "pointer",
                    "border-radius": "5px",
                    "font-size": "0.9vw",
                    padding: "0.5rem",
                },
            },
            {
                type: "ContentAtom",
                config: {
                    role: "text",
                    text: "Save",
                },
            },
            {
                type: "ColourAtom",
                config: {
                    role: "text",
                    value: "white",
                },
            },
            {
                "type": "StateAtom",
                "config": {
                    "op": "Initialize",
                    "name": "atomIds",
                    "value":  []
                }
            },
            {
                "type": "InteractionAtom",
                "id": "1",
                "config": {
                    "trigger": "click",
                    "dependencies": [],
                    "params": [
                        {"source": "state", "name": "selectedComp"},
                        {"source": "exact", "value": "atoms"}
                    ],
                    "action": "getMethod"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "2",
                "config": {
                    "trigger": null,
                    "op": "LoopStart",
                    "loopOver": {"source": "pipe"},
                    "dependencies": ["1"],
                    "params": [],
                    "action": "func1"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "3",
                "config": {
                    "trigger": null,
                    "dependencies": ["2"],
                    "params": [
                        {"source": "loop"},
                        {"source": "exact", "value": "id"}
                    ],
                    "action": "getMethod"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "4",
                "config": {
                    "trigger": null,
                    "dependencies": ["3"],
                    "params": [
                        {"source": "state", "name": "atomIds"},
                        {"source": "pipe"}
                    ],
                    "action": "pushToArray"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "5",
                "config": {
                    "trigger": null,
                    "dependencies": ["4"],
                    "params": [
                        {"source": "exact", "value": "atomIds"},
                        {"source": "pipe"}
                    ],
                    "action": "setState"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "6",
                "config": {
                    "trigger": null,
                    "op": "LoopEnd",
                    "dependencies": ["5"],
                    "params": [],
                    "action": "func1"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "7",
                "config": {
                    "trigger": null,
                    "dependencies": ["6"],
                    "params": [
                        {"source": "state", "name": "selectedComp"},
                        {"source": "exact", "value": "atoms"},
                        {"source": "state", "name": "atomIds"}
                    ],
                    "action": "setMethod"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "8",
                "config": {
                    "trigger": null,
                    "dependencies": ["7"],
                    "params": [
                        {"source": "exact", "value": {
                            "data": []
                        }},
                        {"source": "exact", "value": "data[0]"},
                        {"source": "pipe"}
                    ],
                    "action": "setMethod"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "9",
                "config": {
                    "trigger": null,
                    "dependencies": ["8"],
                    "params": [
                        { "source": "exact", "value": "https://ui-framework-node-api.gov-cloud.ai/api/v2/component"},
                        { "source": "pipe" },
                        { "source": "exact", "value": ""},
                        {   "source": "exact", 
                            "value": {
                                "accept": "*/*",
                                "content-type": "application/json"
                            }
                        }
                    ],
                    "action": "post"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "10",
                "config": {
                    "trigger": null,
                    "dependencies": ["9"],
                    "params": [
                        {"source": "state", "name": "allComponents"},
                        {"source": "state", "name": "selectedComp"}
                    ],
                    "action": "pushToArray"
                }
            },
            {
                "type": "InteractionAtom",
                "id": "11",
                "config": {
                    "trigger": null,
                    "dependencies": ["10"],
                    "params": [
                        {"source": "exact", "value": "allComponents"},
                        {"source": "pipe"}
                    ],
                    "action": "setState"
                }
            }
        ],
        children: [],
    };


    const wrapper = {
        tag: "mobius-div",
        atoms: [
            {
                type: "LayoutAtom",
                config: {
                    display: "flex",
                    "flex-direction": "column",
                    gap: "12px",
                },
            },
            {
                type: "StyleAtom",
                config: {
                    padding: "16px",
                    height: "max-content",
                    border: "1px solid #e2e8f0",
                    "border-radius": "8px",
                    "background-color": "#f8fafc",
                },
            },
        ],
        children: [
            {
                tag: "mobius-save-add",
                atoms: [
                    {
                        type: "LayoutAtom",
                        config: {
                            "display": "flex",
                            "justify-content": "space-between",
                            "align-items": "center",
                           " gap": "12px",
                        },
                    },
                    {
                        type: "StyleAtom",
                        config: {
                            padding: "8px",
                            height: "max-content",
                            border: "1px solid #e2e8f0",
                            "border-radius": "8px",
                            "background-color": "#f8fafc",
                        },
                    },
                ],
                 children:[addAtom,saveAtom]
                },
                {
                  tag: "mobius-add-comp",
                  atoms: [
                    {
                        type: "LayoutAtom",
                        config: {},
                    },
                   ],
                   children:[...children]
                }
        ],
    };
    return wrapper;
}
