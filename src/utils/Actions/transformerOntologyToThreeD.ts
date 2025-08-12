interface OntologyData {
  ontologyMetrics: {
    classes: number;
    objectProperties: number;
    dataTypeProperties: number;
    individuals: number;
    nodes: number;
    edges: number;
  };
  classes: Array<{
    nodeId: string;
    uri: string;
    labels: string[];
    properties: {
      name: string;
    };
    type: string;
    subClassOf: string[];
    superClassOf: string[];
  }>;
  properties: Array<{
    nodeId: string;
    uri: string;
    labels: string[];
    properties: {
      name: string;
    };
    type: string;
    domain?: string;
    range?: string;
    subPropertyOf: string[];
    superPropertyOf: string[];
  }>;
}

interface ForceGraphNode {
  id: string;
  name: string;
  type: string;
  uri: string;
  nodeType: 'class' | 'property' | 'datatype';
  size?: number;
  color?: string;
  group?: string;
}

interface ForceGraphLink {
  source: string;
  target: string;
  type: string;
  name: string;
  value?: number;
}

interface ForceGraphData {
  nodes: ForceGraphNode[];
  links: ForceGraphLink[];
}

interface LayoutConfig {
  nodeTypes: {
    [key: string]: {
      color: string;
      size: number;
      opacity?: number;
    };
  };
  linkTypes: {
    [key: string]: {
      color: string;
      width: number;
      opacity?: number;
    };
  };
  physics: {
    linkDistance: number;
    linkStrength: number;
    chargeStrength: number;
  };
  visual: {
    backgroundColor: string;
    showLabels: boolean;
    labelSize: number;
  };
}

export class OntologyDataTransformer {
  
  /**
   * Transform ontology data to force graph format
   */
  static transformOntologyData(
    ontologyData: OntologyData, 
    layoutConfig?: LayoutConfig
  ): ForceGraphData {
    const nodes: ForceGraphNode[] = [];
    const links: ForceGraphLink[] = [];
    
    // Create nodes from classes
    ontologyData.classes.forEach(cls => {
      const nodeType = cls.type === 'rdfs:Datatype' ? 'datatype' : 'class';
      
      nodes.push({
        id: cls.nodeId,
        name: cls.properties.name,
        type: cls.type,
        uri: cls.uri,
        nodeType: nodeType,
        size: layoutConfig?.nodeTypes[nodeType]?.size || this.getDefaultNodeSize(nodeType),
        color: layoutConfig?.nodeTypes[nodeType]?.color || this.getDefaultNodeColor(nodeType),
        group: nodeType
      });
    });

    // Create nodes from properties and links
    ontologyData.properties.forEach(prop => {
      const nodeType = 'property';
      
      // Add property as node
      nodes.push({
        id: prop.nodeId,
        name: prop.properties.name,
        type: prop.type,
        uri: prop.uri,
        nodeType: nodeType,
        size: layoutConfig?.nodeTypes[nodeType]?.size || this.getDefaultNodeSize(nodeType),
        color: layoutConfig?.nodeTypes[nodeType]?.color || this.getDefaultNodeColor(nodeType),
        group: nodeType
      });

      // Create links from domain to property
      if (prop.domain) {
        links.push({
          source: prop.domain,
          target: prop.nodeId,
          type: 'domain',
          name: 'hasDomain',
          value: layoutConfig?.linkTypes['domain']?.width || 2
        });
      }

      // Create links from property to range
      if (prop.range) {
        links.push({
          source: prop.nodeId,
          target: prop.range,
          type: 'range',
          name: 'hasRange',
          value: layoutConfig?.linkTypes['range']?.width || 2
        });
      }

      // Handle subPropertyOf relationships
      prop.subPropertyOf.forEach(parentProp => {
        links.push({
          source: prop.nodeId,
          target: parentProp,
          type: 'subPropertyOf',
          name: 'subPropertyOf',
          value: layoutConfig?.linkTypes['subPropertyOf']?.width || 1
        });
      });
    });

    // Handle class hierarchies
    ontologyData.classes.forEach(cls => {
      cls.subClassOf.forEach(parentClass => {
        links.push({
          source: cls.nodeId,
          target: parentClass,
          type: 'subClassOf',
          name: 'subClassOf',
          value: layoutConfig?.linkTypes['subClassOf']?.width || 1
        });
      });
    });

    return { nodes, links };
  }

  /**
   * Get default node size based on type
   */
  private static getDefaultNodeSize(nodeType: string): number {
    switch (nodeType) {
      case 'class': return 8;
      case 'property': return 6;
      case 'datatype': return 4;
      default: return 5;
    }
  }

  /**
   * Get default node color based on type
   */
  private static getDefaultNodeColor(nodeType: string): string {
    switch (nodeType) {
      case 'class': return '#4CAF50';      // Green for classes
      case 'property': return '#2196F3';   // Blue for properties
      case 'datatype': return '#FF9800';   // Orange for datatypes
      default: return '#9E9E9E';           // Gray for others
    }
  }

  /**
   * Create a sample layout config for HRMS ontology
   */
  static createSampleLayoutConfig(): LayoutConfig {
    return {
      nodeTypes: {
        class: {
          color: '#4CAF50',
          size: 10,
          opacity: 0.9
        },
        property: {
          color: '#2196F3',
          size: 8,
          opacity: 0.8
        },
        datatype: {
          color: '#FF9800',
          size: 6,
          opacity: 0.7
        }
      },
      linkTypes: {
        domain: {
          color: '#E91E63',
          width: 3,
          opacity: 0.8
        },
        range: {
          color: '#9C27B0',
          width: 3,
          opacity: 0.8
        },
        subClassOf: {
          color: '#607D8B',
          width: 2,
          opacity: 0.6
        },
        subPropertyOf: {
          color: '#795548',
          width: 2,
          opacity: 0.6
        }
      },
      physics: {
        linkDistance: 150,
        linkStrength: 0.5,
        chargeStrength: -200
      },
      visual: {
        backgroundColor: '#000011',
        showLabels: true,
        labelSize: 12
      }
    };
  }

  /**
   * Filter data based on node types (useful for large ontologies)
   */
  static filterByNodeTypes(
    data: ForceGraphData, 
    includeTypes: string[]
  ): ForceGraphData {
    const filteredNodes = data.nodes.filter(node => 
      includeTypes.includes(node.nodeType)
    );
    
    const nodeIds = new Set(filteredNodes.map(node => node.id));
    
    const filteredLinks = data.links.filter(link => 
      nodeIds.has(link.source.toString()) && nodeIds.has(link.target.toString())
    );
    
    return {
      nodes: filteredNodes,
      links: filteredLinks
    };
  }

  /**
   * Add clustering information based on URI namespaces
   */
  static addClustering(data: ForceGraphData): ForceGraphData {
    const clusteredNodes = data.nodes.map(node => {
      const namespace = node.uri.split('#')[0];
      return {
        ...node,
        cluster: namespace.includes('example.org/hrms') ? 'hrms' : 'standard'
      };
    });

    return {
      ...data,
      nodes: clusteredNodes
    };
  }
}