import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { thirdParty } from '../thirdPartyType';

interface ForceGraphConfig {
  data: any;
  width?: number;
  height?: number;
  nodeColor?: string | ((node: any) => string);
  linkWidth?: number | ((link: any) => number);
  linkColor?: string | ((link: any) => string);
  onNodeClick?: (node: any) => void;
  onLinkClick?: (link: any) => void;
  backgroundColor?: string;
  [key: string]: any; // for extensibility
}

export class ForceGraphService implements thirdParty {
  private graph: ForceGraph3DInstance | null | any = null;
  private container: HTMLElement | null = null;

  setContainer(context: HTMLElement) {
    this.container = context;
  }

  init(context: HTMLElement, config: ForceGraphConfig) {
    
    if(!this.container) {
        console.log("Before initializing have to set canvas container use setContainer method")
        return
    } 
    
    this.graph = new ForceGraph3D(this.container);

    if (config.width && config.height) {
      this.graph?.width(config.width).height(config.height);
    }

    if (config.backgroundColor) {
      this.graph?.backgroundColor(config.backgroundColor);
    }

    if (config.nodeColor) {
      this.graph?.nodeColor(config.nodeColor);
    }

    if (config.linkWidth) {
      this.graph?.linkWidth(config.linkWidth);
    }

    if (config.linkColor) {
      this.graph?.linkColor(config.linkColor);
    }

    if (config.onNodeClick) {
      this.graph?.onNodeClick(config.onNodeClick);
    }

    if (config.onLinkClick) {
      this.graph?.onLinkClick(config.onLinkClick);
    }

    if (config.data) {
      this.graph?.graphData(config.data);
    }

    // Set any other properties dynamically
    if (this.graph) {
      for (const key in config) {
        if (
          this.graph[key] &&
          typeof this.graph[key] === 'function' &&
          ![
            'graphData',
            'nodeColor',
            'linkWidth',
            'linkColor',
            'onNodeClick',
            'onLinkClick',
            'backgroundColor',
          ].includes(key)
        ) {
          this.graph[key](config[key]);
        }
      }
    }

  }

  updateData(context: HTMLElement, data: any) {
    if (this.graph) {
      this.graph?.graphData(data);
    }
  }

  getInstance(context: HTMLElement): ForceGraph3DInstance | null {
    return this.graph;
  }

  destroy(context: HTMLElement) {
    if (this.container && this.graph) {
      this.container.innerHTML = '';
      this.graph = null;
    }
  }

  returnMethods() { // this method is compulsory in all our third party services
    return {
      init: this.init,
      setContainer: this.setContainer,
      updateData: this.updateData,
      getInstance: this.getInstance,
      destroy: this.destroy
    }
  }
}
