import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

type KGNode = {
  id: string;
  hasName?: string;
  hasEmail?: string;
  PI_314_CREATIONTIMEMS: number;
  PI_314_TENANTID: string;
  ontologyId: string;
  PI_314_TRANSACTIONID: string;
  PI_314_ENTITYID: string;
  labels: string[];
};

type KGRelation = {
  relationshipType: string;
  relationshipDetails: Record<string, unknown>;
  startNodeEntityId: string;
  endNodeEntityId: string;
};

type KGResponse = {
  pageNumber: number;
  pageSize: number;
  noOfInstances: number;
  totalInstances: number;
  totalPages: number;
  content: KGNode[];
  relations: KGRelation[];
  customReferencedData: Record<string, unknown>;
};

export function transformKGData(this: BaseUIElement, data?: KGResponse): any[] {
  if (!data?.content || !Array.isArray(data.content)) {
    return [];
  }

  // Transform nodes
  const nodes = data.content.map((node: KGNode) => ({
    group: 'nodes',
    data: {
      id: node.PI_314_ENTITYID,
      label: node.hasName || node.id || node.PI_314_ENTITYID,
      type: node.labels?.find((l) => l !== '__KGBuilder__' && l !== 'Chunk') || 'Entity',
      email: node.hasEmail || '',
    },
  }));

  // Transform edges
  const edges = data.relations.map((rel: KGRelation) => ({
    group: 'edges',
    data: {
      id: generateUUID(),
      source: rel.startNodeEntityId,
      target: rel.endNodeEntityId,
      label: rel.relationshipType,
    },
  }));

  return [...nodes, ...edges];
}
