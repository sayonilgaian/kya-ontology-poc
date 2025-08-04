const sampleMegaDemoJson = {
    tag: 'mega-demo',
    atoms: [
        {
            type: 'InteractionAtom',
            id: 'routing1456',
            config: {
                trigger: 'OnLoad',
                dependencies: [],
                params: [
                    {
                        source: 'exact',
                        value: 'true',
                    },
                    {
                        source: 'exact',
                        value: '/',
                    },
                ],
                action: 'getJsonFromApi',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing5575',
            config: {
                trigger: null,
                dependencies: ['routing1456'],
                params: [
                    {
                        source: 'pipe',
                    },
                    {
                        source: 'exact',
                        value: '',
                    },
                    {
                        source: 'exact',
                        value: {},
                    },
                ],
                action: 'get',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing634567',
            config: {
                trigger: null,
                dependencies: ['routing5575'],
                params: [
                    {
                        source: 'pipe',
                    },
                    {
                        source: 'exact',
                        value: '/',
                    },
                ],
                action: 'SetJsonToIndexDb',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing1',
            config: {
                dependencies: [],
                trigger: 'OnPopState',
                params: [],
                action: 'getCurrentPath',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing2',
            config: {
                trigger: null,
                dependencies: ['routing1'],
                params: [
                    {
                        source: 'pipe',
                    },
                ],
                action: 'GetJsonFromIndexDb',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing3',
            config: {
                trigger: null,
                dependencies: ['routing2'],
                params: [
                    {
                        source: 'pipe',
                    },
                    {
                        source: 'exact',
                        value: null,
                    },
                    {
                        source: 'exact',
                        value: '==',
                    },
                ],
                action: 'Operate',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing4',
            config: {
                op: 'Conditional',
                trigger: null,
                dependencies: ['routing3'],
                params: [
                    {
                        source: 'pipe',
                    },
                    {
                        source: 'exact',
                        value: [
                            {
                                case: true,
                                return: ['routing14'],
                            },
                            {
                                case: false,
                                return: ['routing8'],
                            },
                        ],
                    },
                ],
                action: 'Switch',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing14',
            config: {
                trigger: null,
                dependencies: ['routing4', 'routing1'],
                params: [
                    {
                        source: 'exact',
                        value: 'true',
                    },
                    {
                        source: 'pipe',
                        value: 'routing1',
                    },
                ],
                action: 'getJsonFromApi',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing5',
            config: {
                trigger: null,
                dependencies: ['routing14'],
                params: [
                    {
                        source: 'pipe',
                    },
                    {
                        source: 'exact',
                        value: '',
                    },
                    {
                        source: 'exact',
                        value: {},
                    },
                ],
                action: 'get',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing6',
            config: {
                trigger: null,
                dependencies: ['routing5', 'routing1'],
                params: [
                    {
                        source: 'pipe',
                        value: 'routing5',
                    },
                    {
                        source: 'pipe',
                        value: 'routing1',
                    },
                ],
                action: 'SetJsonToIndexDb',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing7',
            config: {
                trigger: null,
                dependencies: ['routing5', 'routing1', 'routing2'],
                params: [
                    {
                        source: 'pipe',
                        value: 'routing1',
                    },
                    {
                        source: 'pipe',
                        value: 'routing5',
                    },
                ],
                action: 'attachRouteOnPopState',
            },
        },
        {
            type: 'InteractionAtom',
            id: 'routing8',
            config: {
                trigger: null,
                dependencies: ['routing4', 'routing1', 'routing2'],
                params: [
                    {
                        source: 'pipe',
                        value: 'routing1',
                    },
                    {
                        source: 'pipe',
                        value: 'routing2',
                    },
                ],
                action: 'attachRouteOnPopState',
            },
        },
        {
            type: 'RouterAtom',
            config: {
                op: 'CreateRoute',
                url: 'Dash.JSON',
                path: '/',
            },
        },
        {
            type: 'RouterAtom',
            config: {
                op: 'AttachRoute',
                path: '/',
            },
        },
        {
            type: 'RouterAtom',
            config: {
                op: 'CreateRoute',
                url: 'forceGraph.json',
                path: '/canvas',
            },
        },
        {
            type: 'RouterAtom',
            config: {
                op: 'AttachRoute',
                path: '/canvas',
            },
        },
        // {
        //   type: 'RouterAtom',
        //   config: {
        //     op: 'CreateRoute',
        //     url: 'Login.JSON',
        //     path: '/login',
        //   },
        // },
        // {
        //   type: 'RouterAtom',
        //   config: {
        //     op: 'AttachRoute',
        //     path: '/login',
        //   },
        // },
    ],
    children: [],
};

export default sampleMegaDemoJson
