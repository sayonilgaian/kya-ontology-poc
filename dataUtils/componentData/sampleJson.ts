const sampleJson = {
    tag: "my-app",
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
    ],
    children: [
        // {
        //     "tag": "header-component",
        //     "id": "header1",
        //     "atoms": [...],
        //     "children": [...]
        // },
        // {
        //     "tag": "content-area",
        //     "id": "content1",
        //     "atoms": [...],
        //     "children": [...]
        // }
    ]
}

export default sampleJson