export const plan = {
    tag: "login-form",
    atoms: [
        { type: "ColourAtom", config: { role: "background", value: "white" } },
        { type: "ColourAtom", config: { role: "text", value: "#fff" } },
        {
            type: "ImageAtom",
            config: {
                src: "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/f819eb2b-716e-49d4-be69-bbd4dbc57381_$$_V1_8cfdc9a1ed9b6a5cca44223a48dddc71.png",
                noRepeat: "no-repeat",
            },
        },
        {
            id: "figma-stata",
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "allProjects",
                value: [],
            },
        },
        {
            id: "figma-stata",
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "atomState",
                value: [],
            },
        },
        {
            id: "figma-stata",
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "allAtomsState",
                value: [],
            },
        },
        {
            id: "figma-stata",
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "selectedComponent",
                value: "",
            },
        },
        {
            id: "figma-stata",
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "figmaCreds",
                value: {
                    token: "figd_KWtVPsvuyrTkv4y74OxDgWJUiNgnGQk5MaM6F0AG",
                    url: "https://www.figma.com/design/y6gmhAgBWiGT1Vv9olP0IG/Monet---Vinci?node-id=327-70787&t=K8CBj6xi6CY8Tv5y-4",
                },
            },
        },
        {
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "apiResponse",
                value: "",
            },
        },
        {
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "importPopup",
                value: false,
            },
        },
        {
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "addAtomPopUp",
                value: false,
            },
        },
        {
            type: "RouterAtom",
            config: {
                path: "/Projects",
                url: "http://localhost:5173/Projects.JSON",
                id: "1",
            },
        },
        {
            type: "RouterAtom",
            config: {
                path: "/Screens",
                url: "http://localhost:5173/Dash.JSON",
                id: "2",
            },
        },
        {
            type: "RouterAtom",
            config: {
                path: "/Component",
                url: "http://localhost:5173/Component.JSON",
                id: "3",
            },
        },
        {
            type: "RouterAtom",
            config: {
                path: "/DesignSystem",
                url: "http://localhost:5173/DesignSystem.JSON",
                id: "4",
            },
        },
        {
            type: "StateAtom",
            config: {
                op: "Initialize",
                name: "routerState",
                value: {},
            },
        },
        {
            type: "StateAtom",
            config: {
                op: "Listen",
                name: "routerState",
                callback: "render",
            },
        },
        {
            type: "LayoutAtom",
            config: {
                display: "flex",
                width: "100%",
                height: "100%",
                flexDirection: "column",
                justify: "center",
                align: "center",
                "background-size": "100% 100%",
                "background-color": "rgba(255, 255, 255, 0.3)",
                "backdrop-filter": "blur(24px)",
                position: "absolute",
            },
        },
        {
            type: "InteractionAtom",
            id: "loop1",
            config: {
                trigger: "OnLoad",
                dependencies: [],
                params: [{ source: "exact", value: "login-form" }],
                action: "func1",
            },
        },
        {
            type: "InteractionAtom",
            id: "loop2",
            config: {
                op: "LoopStart",
                start: { source: "exact", value: 2 },
                end: { source: "exact", value: 10 },
                trigger: null,
                params: [{ source: "exact", value: "login-form" }],
                action: "func1",
                dependencies: ["loop1"],
            },
        },
        {
            type: "InteractionAtom",
            id: "renderTemplateId",
            config: {
                trigger: null,
                dependencies: ["loop2"],
                params: [
                    { source: "exact", value: "child-2Template" },
                    { source: "loop", value: "index" },
                    { source: "loop" },
                ],
                action: "renderTemplate",
            },
        },
        {
            type: "InteractionAtom",
            id: "loop3",
            config: {
                trigger: null,
                dependencies: ["renderTemplateId"],
                params: [
                    { source: "exact", value: 6 },
                    { source: "loop", value: "index" },
                    { source: "exact", value: "==" },
                ],
                action: "Operate",
            },
        },
        {
            type: "InteractionAtom",
            id: "loopCondition",
            config: {
                op: "Conditional",
                trigger: null,
                dependencies: ["loop3"],
                params: [
                    { source: "pipe" },
                    {
                        source: "exact",
                        value: [
                            {
                                case: true,
                                return: ["loopBreak"],
                            },
                            {
                                case: false,
                                return: ["loop4"],
                            },
                        ],
                    },
                ],
                action: "Switch",
            },
        },
        {
            type: "InteractionAtom",
            id: "loopBreak",
            config: {
                op: "LoopBreak",
                trigger: null,
                dependencies: ["loopCondition"],
                params: [{ source: "exact", value: "login-form" }],
                action: "func2",
            },
        },
        {
            type: "InteractionAtom",
            id: "loop4",
            config: {
                trigger: null,
                dependencies: ["loopCondition"],
                params: [{ source: "exact", value: "login-form" }],
                action: "func1",
            },
        },
        {
            type: "InteractionAtom",
            id: "loop5",
            config: {
                op: "LoopEnd",
                trigger: null,
                dependencies: ["loop3"],
                params: [{ source: "exact", value: "login-form" }],
                action: "func1",
            },
        },
        {
            type: "InteractionAtom",
            id: "loop6",
            config: {
                trigger: null,
                dependencies: ["loop5"],
                params: [{ source: "exact", value: "login-form" }],
                action: "func2",
            },
        },
    ],
    children: [
        {
            tag: "child-1",
            atoms: [
                {
                    type: "LayoutAtom",
                    config: {
                        display: "flex",
                        width: "30%",
                        height: "40%",
                        flexDirection: "column",
                        gap: "5%",
                        border: "1px solid black",
                        "border-radius": "20px",
                    },
                },
                {
                    type: "ColourAtom",
                    config: { role: "background", value: "white" },
                },
                {
                    type: "SpacingAtom",
                    config: { role: "padding", value: "2% 4%" },
                },
                {
                    type: "KeyboardEventAtom",
                    config: { op: "AddCustomEvent", value: "ctrl+z" },
                },
                {
                    type: "KeyboardEventAtom",
                    config: { op: "AddCustomEvent", value: "ctrl+y" },
                },

                {
                    type: "InteractionAtom",
                    id: "inputId1",
                    config: {
                        trigger: "ctrl+z",
                        dependencies: [],
                        params: [{}],
                        action: "undo",
                    },
                },
                {
                    type: "InteractionAtom",
                    id: "inputId2",
                    config: {
                        trigger: "ctrl+y",
                        dependencies: [],
                        params: [{}],
                        action: "redo",
                    },
                },
            ],
            children: [
                {
                    tag: "input-div",
                    atoms: [
                        {
                            type: "LayoutAtom",
                            config: {
                                display: "flex",
                                width: "full",
                                height: "10%",
                                "font-size": "30px",
                                "font-weight": "bold",
                            },
                        },
                        {
                            type: "ColourAtom",
                            config: { role: "background", value: "" },
                        },
                        {
                            type: "StateAtom",
                            config: {
                                op: "Initialize",
                                name: "loginState",
                                value: {
                                    productId:
                                        "c2255be4-ddf6-449e-a1e0-b4f7f9a2b636",
                                    platformId: "67e1471506da752b78716d21",
                                    provider: "PASSWORD",
                                    userName: "ksamxp@mobiusdtaas.ai",
                                    password: "Gaian@123",
                                },
                            },
                        },
                        {
                            type: "APIAtom",
                            config: {
                                op: "SetService",
                                value: {
                                    key: "figma",
                                    url: "http://localhost:8080/api/v1",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                },
                            },
                        },
                    ],
                    children: [
                        {
                            tag: "input-label",
                            atoms: [
                                {
                                    type: "ContentAtom",
                                    config: {
                                        role: "text",
                                        text: "MVT",
                                    },
                                },
                                {
                                    type: "TypographyAtom",
                                    config: {
                                        "font-size": "30px",
                                        "font-style": "",
                                    },
                                },
                                {
                                    type: "ColourAtom",
                                    config: {
                                        role: "background",
                                        value: "white",
                                        role: "text",
                                        value: "black",
                                    },
                                },
                            ],
                            children: [],
                        },
                    ],
                },
                {
                    tag: "input-div",
                    atoms: [
                        {
                            type: "LayoutAtom",
                            config: {
                                display: "flex",
                                width: "full",
                                height: "10%",
                                "font-size": "20px",
                                "font-weight": "semi-bold",
                            },
                        },
                    ],
                    children: [
                        {
                            tag: "input-label",
                            atoms: [
                                {
                                    type: "ContentAtom",
                                    config: {
                                        display: "flex",
                                        width: "100%",
                                        height: "10%",
                                        role: "text",
                                        text: "Welcome Back",
                                    },
                                },
                                {
                                    type: "ColourAtom",
                                    config: {
                                        role: "background",
                                        value: "white",
                                        role: "text",
                                        value: "black",
                                    },
                                },
                            ],
                            children: [],
                        },
                    ],
                },
                {
                    tag: "form-wrapper",
                    atoms: [
                        {
                            type: "LayoutAtom",
                            config: {
                                display: "flex",
                                width: "full",
                                height: "40%",
                                flexDirection: "column",
                                gap: "5%",
                            },
                        },
                    ],
                    children: [
                        {
                            tag: "input-div",
                            atoms: [
                                {
                                    type: "LayoutAtom",
                                    config: {
                                        display: "flex",
                                        width: "full",
                                        height: "100%",
                                        flexDirection: "column",
                                        gap: "5px",
                                    },
                                },
                                {
                                    type: "ColourAtom",
                                    config: {
                                        role: "background",
                                        value: "white",
                                    },
                                },
                            ],
                            children: [
                                {
                                    tag: "input-label",
                                    atoms: [
                                        {
                                            type: "ContentAtom",
                                            config: {
                                                display: "flex",
                                                width: "100%",
                                                height: "10%",
                                                role: "text",
                                                text: "Email *",
                                            },
                                        },
                                        {
                                            type: "ColourAtom",
                                            config: {
                                                role: "background",
                                                value: "white",
                                                role: "text",
                                                value: "black",
                                            },
                                        },
                                    ],
                                    children: [],
                                },
                                {
                                    tag: "input-label",
                                    atoms: [
                                        {
                                            type: "attributeAtom",
                                            config: {
                                                attribute: "contenteditable",
                                                value: "true",
                                            },
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "stateId1",
                                            config: {
                                                trigger: "StateChange",
                                                dependencies: [],
                                                params: [
                                                    {
                                                        source: "state",
                                                        name: "loginState",
                                                    },
                                                    {
                                                        source: "exact",
                                                        value: "userName",
                                                    },
                                                ],
                                                action: "getMethod",
                                                state: "loginState",
                                            },
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "inputId1",
                                            config: {
                                                trigger: "input",
                                                dependencies: [],
                                                params: [{}],
                                                action: "read",
                                            },
                                        },
                                        {
                                            "type": "InteractionAtom",
                                            "id": "1",
                                            "config": {
                                                "trigger": null,
                                                "dependencies": ["inputId1"],
                                                "params": [
                                                    {"source":"pipe"}
                                                ],
                                                "action": "handleInput"
                                            }
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "inputId2",
                                            config: {
                                                trigger: null,
                                                dependencies: ["1"],
                                                params: [
                                                    {
                                                        source: "state",
                                                        name: "loginState",
                                                    },
                                                    {
                                                        source: "exact",
                                                        value: "userName",
                                                    },
                                                    {
                                                        source: "pipe",
                                                        value: "",
                                                    },
                                                ],
                                                action: "setMethod",
                                            },
                                        },
                                        {
                                            "tag": "right-nav-top-quick-1",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "height": "12.5%",
                                                        "width": "100%",
                                                        "display": "flex",
                                                        "justify": "center",
                                                        "align": "center",
                                                        "gap": "2px"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "nav-top-quick-delete",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/5302fb4d-9ebb-4800-841f-ba83bbe73b7f_$$_V1_Nav%20Icons.png",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": "2.4rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "tag": "right-nav-top-quick-1",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "height": "12.5%",
                                                        "width": "100%",
                                                        "display": "flex",
                                                        "justify": "center",
                                                        "align": "center",
                                                        "gap": "2px"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "nav-top-quick-shield-icon",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/d2d28db8-1ce1-4357-9cdc-5f87795c1697_$$_V1_Nav%20IconsShield.svg",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": "2.4rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "tag": "right-nav-top-quick-1",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "height": "12.5%",
                                                        "width": "100%",
                                                        "display": "flex",
                                                        "justify": "center",
                                                        "align": "center",
                                                        "gap": "2px"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "nav-top-quick-play-icon",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/7e4a94eb-f424-4b0b-a91f-80478dceac81_$$_V1_Icon%20wrapper-No%20Statesplay.svg",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": "1.4rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "tag": "right-nav-top-quick-1",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "height": "12.5%",
                                                        "width": "100%",
                                                        "display": "flex",
                                                        "justify": "center",
                                                        "align": "center",
                                                        "gap": "2px"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "nav-top-quick-faq-icon",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/522e0b35-6a63-4d61-8bc0-417465d5fc97_$$_V1_Icon%20wrapper-No%20StatesFAQ.png",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": "1.4rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "tag": "right-nav-top-quick-7",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "height": "12.5%",
                                                        "width": "100%",
                                                        "display": "flex",
                                                        "justify": "center",
                                                        "align": "center",
                                                        "gap": "2px"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "nav-top-quick-calender",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/5d342449-050d-45ed-bfa4-f8c9eee270bd_$$_V1_Nav%20Iconscalender.png",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": " 2.4rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "tag": "right-nav-top-quick-8",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "height": "12.5%",
                                                        "width": "100%",
                                                        "display": "flex",
                                                        "justify": "center",
                                                        "align": "center",
                                                        "gap": "2px"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "nav-top-quick-round-icon",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/1bbf7c39-f0d9-4759-8a11-d5bcac2d4b3b_$$_V1_Nav%20Iconsround-icon.png",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": "2.4rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "tag": "right-nav-bottom",
                                    "atoms": [
                                        {
                                            "type": "LayoutAtom",
                                            "config": {
                                                "height": "15%",
                                                "width": "100%",
                                                "display": "flex",
                                                "justify": "center",
                                                "align": "center",
                                                "flexDirection": "column",
                                                "gap": "2px",
                                                "justify-content": "space-between"
                                            }
                                        }
                                    ],
                                    "children": [
                                        {
                                            "tag": "right-nav-bottom-quick-1",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "display": "flex",
                                                        "min-height": "33.3%",
                                                        "width": " 100%",
                                                        "align": "center",
                                                        "justify": "center",
                                                        "cursor": "pointer"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "right-nav-bottom-delete-icon-1",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/e685b42c-4a19-4f13-a9c1-2bd259a75da4_$$_V1_Icon%20wrapper-No%20States.svg",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": "1.4rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "tag": "right-nav-bottom-quick-2",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "display": "flex",
                                                        "min-height": "1.4rem",
                                                        "width": "100%",
                                                        "align": "center",
                                                        "justify": "center",
                                                        "cursor": "pointer"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "right-nav-bottom-delete-icon-2",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/ccc23724-6e5b-4584-8d3d-3693f65ed5fe_$$_V1_XPX%20logosbottom-img-2.svg",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": "1.4rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            "tag": "right-nav-bottom-quick-3",
                                            "atoms": [
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "display": "flex",
                                                        "min-height": "1.4rem",
                                                        "width": "100%",
                                                        "align": "center",
                                                        "justify": "center",
                                                        "cursor": "pointer"
                                                    }
                                                }
                                            ],
                                            "children": [
                                                {
                                                    "tag": "right-nav-bottom-delete-icon-3",
                                                    "atoms": [
                                                        {
                                                            "type": "ImageAtom",
                                                            "config": {
                                                                "src": "https://cdn.gov-cloud.ai/_ENC(zb1bHrOhcui65V6FALbz23Izjy/gkhGnG+BYF910t7wo4AHsY/uYfxuotV/5lfQ6)/CMS/5302fb4d-9ebb-4800-841f-ba83bbe73b7f_$$_V1_Nav%20Icons.png",
                                                                "background-size": "cover"
                                                            }
                                                        },
                                                        {
                                                            "type": "LayoutAtom",
                                                            "config": {
                                                                "display": "flex",
                                                                "min-height": "2.5rem",
                                                                "width": "100%",
                                                                "align": "center",
                                                                "background-size": "cover",
                                                                "cursor": "pointer",
                                                                "background-repeat": "no-repeat",
                                                                "background-position": "center",
                                                                "overflow": "hidden"
                                                            }
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "tag": "right-nav-popup-panel",
                            "atoms": [
                                {
                                    "type": "LayoutAtom",
                                    "config": {
                                        "display": "none",
                                        "flexDirection": "column",
                                        "height": "85vh",
                                        "width": "280px",
                                        "overflow-y": "scroll",
                                        "background-color": "#ffffff",
                                        "box-shadow": "0px 4px 12px rgba(0, 0, 0, 0.1)",
                                        "border-radius": "12px",
                                        "position": "absolute",
                                        "z-index": "1000",
                                        "padding": "16px",
                                        "top": "10vh",
                                        "right": "5vw",
                                        "gap": "12px"
                                    }
                                },
                                {
                                    "type": "StateAtom",
                                    "config": {
                                        "op": "Initialize",
                                        "name": "openAtomsComponentsTab",
                                        "value": false
                                    }
                                },
                                {
                                    "type": "attributeAtom",
                                    "config": {
                                        "attribute": "class",
                                        "value": "scroll-thin"
                                    }
                                },
                                {
                                    "type": "StyleAtom",
                                    "config": {
                                        "border": "1px solid #e2e8f0"
                                    }
                                },
                                {
                                    "type": "InteractionAtom",
                                    "config": {
                                        "trigger": "StateChange",
                                        "state": "openAtomsComponentsTab",
                                        "params": [
                                            {
                                                "source": "state",
                                                "name": "openAtomsComponentsTab"
                                            }
                                        ],
                                        "dependencies": [],
                                        "action": "hideUnhide"
                                    }
                                }
                            ],
                            "children": [
                                {
                                    "tag": "parent-header",
                                    "atoms": [
                                        {
                                            "type": "LayoutAtom",
                                            "config": {
                                                "height": "5%",
                                                "width": "85%",
                                                "display": "flex",
                                                "justify-content": "space-between",
                                                "align": "center"
                                            }
                                        },
                                        {
                                            "type": "StateAtom",
                                            "config": {
                                                "op": "Initialize",
                                                "name": "sideDrawerTab",
                                                "value": false
                                            }
                                        }
                                    ],
                                    "children": [
                                        {
                                            "tag": "dashboard-1",
                                            "atoms": [
                                                {
                                                    "type": "ContentAtom",
                                                    "config": {
                                                        "text": "Atoms"
                                                    }
                                                },
                                                {
                                                    "type": "ColourAtom",
                                                    "config": {
                                                        "role": "text",
                                                        "value": "#000000"
                                                    }
                                                },
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "font-size": "14px",
                                                        "font-weight": "500"
                                                    }
                                                },
                                                {
                                                    "type": "InteractionAtom",
                                                    "id": "sideDrawerTab1",
                                                    "config": {
                                                        "trigger": "click",
                                                        "params": [
                                                            {
                                                                "source": "exact",
                                                                "value": "sideDrawerTab"
                                                            },
                                                            {
                                                                "source": "exact",
                                                                "value": false
                                                            }
                                                        ],
                                                        "dependencies": [],
                                                        "action": "setState",
                                                        "state": "sideDrawerTab"
                                                    }
                                                }
                                            ]
                                        },
                                        {
                                            "tag": "icon-1",
                                            "atoms": [
                                                {
                                                    "type": "ContentAtom",
                                                    "config": {
                                                        "text": "Component"
                                                    }
                                                },
                                                {
                                                    "type": "ColourAtom",
                                                    "config": {
                                                        "role": "text",
                                                        "value": "#000000"
                                                    }
                                                },
                                                {
                                                    "type": "LayoutAtom",
                                                    "config": {
                                                        "font-size": "14px",
                                                        "font-weight": "500"
                                                    }
                                                },
                                                {
                                                    "type": "InteractionAtom",
                                                    "id": "sideDrawerTab2",
                                                    "config": {
                                                        "trigger": "click",
                                                        "params": [
                                                            {
                                                                "source": "exact",
                                                                "value": "sideDrawerTab"
                                                            },
                                                            {
                                                                "source": "exact",
                                                                "value": true
                                                            }
                                                        ],
                                                        "dependencies": [],
                                                        "action": "setState",
                                                        "state": "sideDrawerTab"
                                                    }
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    "tag": "child-demo-atom-renderer",
                                    "id": "child-demo-atom-renderer",
                                    "atoms": [
                                        {
                                            "type": "LayoutAtom",
                                            "config": {
                                                "width": "100%",
                                                "flex-direction": "column",
                                                "max-height": "80vh",
                                                "overflow-y": "auto"
                                            }
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "inputId2",
                                            config: {
                                                trigger: null,
                                                dependencies: ["inputId1"],
                                                params: [
                                                    {
                                                        source: "state",
                                                        name: "loginState",
                                                    },
                                                    {
                                                        source: "exact",
                                                        value: "password",
                                                    },
                                                    {
                                                        source: "pipe",
                                                        value: "",
                                                    },
                                                ],
                                                action: "setMethod",
                                            },
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "inputId3",
                                            config: {
                                                trigger: null,
                                                dependencies: ["inputId2"],
                                                params: [
                                                    {
                                                        source: "exact",
                                                        value: "loginState",
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
                                            type: "LayoutAtom",
                                            config: {
                                                display: "flex",
                                                width: "full",
                                                height: "100%",
                                                border: "1px solid black",
                                                "border-radius": "5px",
                                            },
                                        },
                                        {
                                            type: "ColourAtom",
                                            config: {
                                                role: "background",
                                                value: "white",
                                                role: "text",
                                                value: "black",
                                            },
                                        },
                                        {
                                            type: "BorderAtom",
                                            config: {
                                                role: "border",
                                                value: "rounded",
                                            },
                                        },
                                    ],
                                    children: [],
                                },
                            ],
                        },
                    ],
                },
                {
                    tag: "bottom-div",
                    atoms: [
                        {
                            type: "LayoutAtom",
                            config: {
                                display: "flex",
                                width: "100%",
                                height: "15%",
                                justify: "between",
                                align: "center",
                            },
                        },
                        {},
                    ],
                    children: [
                        {
                            tag: "btn-div",
                            atoms: [
                                {
                                    type: "LayoutAtom",
                                    config: {
                                        display: "flex",
                                        width: "74%",
                                        height: "100%",
                                        align: "center",
                                    },
                                },
                            ],
                            children: [
                                {
                                    tag: "btn-content",
                                    atoms: [
                                        {
                                            type: "LayoutAtom",
                                            config: {
                                                display: "flex",
                                                width: "30%",
                                                height: "60%",
                                                justify: "center",
                                                align: "center",
                                                justify: "center",
                                                border: "1px solid black",
                                                background: "blue",
                                                cursor: "pointer",
                                                "border-radius": "5px",
                                                "font-size": "0.9vw",
                                            },
                                        },
                                        {
                                            type: "ContentAtom",
                                            config: {
                                                role: "text",
                                                text: "Login",
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
                                            id: "1",
                                            config: {
                                                trigger: "click",
                                                dependencies: [],
                                                params: [
                                                    {
                                                        source: "exact",
                                                        value: "https://ig.gov-cloud.ai/mobius-iam-service/v1.0/login?mask=false",
                                                    },
                                                    {
                                                        source: "state",
                                                        name: "loginState",
                                                    },
                                                    {
                                                        source: "exact",
                                                        value: "",
                                                    },
                                                    {
                                                        source: "exact",
                                                        value: {
                                                            accept: "*/*",
                                                            "content-type":
                                                                "application/json",
                                                        },
                                                    },
                                                ],
                                                action: "post",
                                            },
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "getMethod",
                                            config: {
                                                trigger: null,
                                                dependencies: ["1"],
                                                params: [
                                                    {
                                                        source: "pipe",
                                                    },
                                                    {
                                                        source: "exact",
                                                        value: "accessToken"
                                                    }
                                                ],
                                                action: "getMethod",
                                            },
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "concatString",
                                            config: {
                                                trigger: null,
                                                dependencies: ["getMethod"],
                                                params: [
                                                    {
                                                        source: "exact",
                                                        value: "Bearer "
                                                    },
                                                    {
                                                        source: "pipe",
                                                    }
                                                ],
                                                action: "concatString",
                                            },
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "setHeader",
                                            config: {
                                                trigger: null,
                                                dependencies: ["concatString"],
                                                params: [
                                                    {
                                                        source: "exact",
                                                        value: "Authorization"
                                                    },
                                                    {
                                                        source: "pipe",
                                                    }
                                                ],
                                                action: "setHeader",
                                            },
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "2",
                                            config: {
                                                trigger: null,
                                                dependencies: ["1"],
                                                params: [
                                                    {
                                                        source: "pipe",
                                                    },
                                                ],
                                                action: "validate",
                                            },
                                        },
                                        {
                                            type: "InteractionAtom",
                                            id: "3",
                                            config: {
                                                trigger: null,
                                                dependencies: ["2"],
                                                params: [
                                                    {
                                                        source: "pipe",
                                                    },
                                                    {
                                                        source: "exact",
                                                        value: "/Projects",
                                                    },
                                                ],
                                                action: "getJsonFromApi",
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
                                                        source: "pipe",
                                                    },
                                                ],
                                                action: "get",
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
                                                        source: "exact",
                                                        value: "routerState",
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
                                            id: "6",
                                            config: {
                                                trigger: null,
                                                dependencies: ["5"],
                                                params: [
                                                    {
                                                        source: "pipe",
                                                    },
                                                ],
                                                action: "redirect",
                                            },
                                        },
                                    ],
                                    children: [],
                                },
                            ],
                        },
                        {
                            tag: "btn-div",
                            atoms: [
                                {
                                    type: "LayoutAtom",
                                    config: {
                                        display: "flex",
                                        height: "100%",
                                        align: "center",
                                        "font-size": "0.8vw",
                                    },
                                },
                                {
                                    type: "InteractionAtom",
                                    id: "5",
                                    config: {
                                        trigger: "stateChange",
                                        dependencies: [],
                                        params: [
                                            {
                                                source: "exact",
                                                value: "apiResponse",
                                            },
                                            {
                                                source: "state",
                                                name: "apiResponse",
                                            },
                                        ],
                                        action: "setState",
                                    },
                                },
                                {
                                    type: "ContentAtom",
                                    config: {
                                        role: "text",
                                        text: "Forget password ?",
                                    },
                                },
                                {
                                    type: "ColourAtom",
                                    config: {
                                        role: "background",
                                        value: "white",
                                        role: "text",
                                        value: "black",
                                    },
                                },
                            ],
                            children: [],
                        },
                    ],
                },
            ],
        },
        {
            tag: "child-2",
            id: "child-2Template",
            type: "Template",
            atoms: [
                {
                    type: "ContentAtom",
                    config: {
                        role: "text",
                        text: {
                            path: "",
                            type: "Dynamic",
                            defaultValue: "",
                        },
                    },
                },
                {
                    type: "TypographyAtom",
                    config: { "font-size": "30px", "font-style": "" },
                },
                {
                    type: "ColourAtom",
                    config: {
                        role: "background",
                        value: "white",
                        role: "text",
                        value: "black",
                    },
                },
            ],
            children: [],
        },
    ],
};