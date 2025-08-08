const cytoscapeDefaultStyles = [
    {
        selector: 'node',
        style: {
            'background-color': '#123456',
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

const cytoscapeDefaultLayout = {
    name: 'cose',
    idealEdgeLength: 100,
    nodeOverlap: 20,
    refresh: 20,
    fit: true,
    padding: 30,
    randomize: false,
    componentSpacing: 40,
    nodeRepulsion: 400000,
    edgeElasticity: 100,
    nestingFactor: 5,
    gravity: 80,
    numIter: 1000,
    initialTemp: 200,
    coolingFactor: 0.95,
    minTemp: 1.0
}

export { cytoscapeDefaultStyles, cytoscapeDefaultLayout }