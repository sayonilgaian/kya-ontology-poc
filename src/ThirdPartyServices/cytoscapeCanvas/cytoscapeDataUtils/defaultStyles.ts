const cytoscapeDefaultStyles = [
    {
        selector: 'node',
        style: {
            'background-color': '#666',
            'label': 'data(label)',
            'text-valign': 'center',
            'text-halign': 'center',
            'color': '#fff',
            'font-size': 12,
            'width': 30,
            'height': 30
        }
    },
    {
        selector: 'edge',
        style: {
            'width': 2,
            'line-color': '#ccc',
            'target-arrow-color': '#ccc',
            'target-arrow-shape': 'triangle',
            'curve-style': 'bezier',
            'label': 'data(label)',
            'font-size': 10,
            'color': '#666'
        }
    },
    {
        selector: 'node:selected',
        style: {
            'background-color': '#ff6b6b',
            'border-width': 3,
            'border-color': '#ff4757'
        }
    },
    {
        selector: 'edge:selected',
        style: {
            'line-color': '#ff6b6b',
            'target-arrow-color': '#ff6b6b',
            'width': 4
        }
    }
]

export default cytoscapeDefaultStyles