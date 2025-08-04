import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function addAtomsToJSON(
    this: BaseUIElement,
    object: Array<any>,
    atomState: string,
    resultState: string,
    componentState: string
): any {
    const children = [];
    const atoms = object;

    for (let i of atoms) {
        const config = i.config;
        const keys = Object.keys(config);
        const type = i.type.replace("Atom", " Atom");
        if (i.tag === "InteractionAtom") {
            continue;
        }

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
                    atoms: [{ type: "ContentAtom", config: { text: type } }],
                },
                {
                    tag: "mobius-div",
                    atoms: [
                        { type: "ContentAtom", config: { text: "+" } },
                        {
                            type: "InteractionAtom",
                            id: "1",
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
                            id: "2",
                            config: {
                                trigger: null,
                                dependencies: ["1"],
                                params: [
                                    { source: "pipe" },
                                    { source: "exact", value: i },
                                ],
                                action: "pushToArray",
                                state: atomState,
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "3",
                            config: {
                                trigger: null,
                                dependencies: ["2"],
                                params: [
                                    { source: "exact", value: atomState },
                                    { source: "pipe", value: "" },
                                ],
                                action: "setState",
                                state: atomState,
                            },
                        },
                        {
                            type: "InteractionAtom",
                            id: "replaceAtomsOfComponentInJSON",
                            config: {
                                trigger: null,
                                dependencies: ["3"],
                                params: [
                                    { source: "state", name: resultState },
                                    { source: "state", name: componentState },
                                    { source: "state", name: atomState },
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
                                    { source: "exact", value: resultState },
                                    { source: "pipe", value: "" },
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
        children,
    };

    return wrapper;
}
