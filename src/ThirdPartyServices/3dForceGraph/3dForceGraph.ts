import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { thirdParty } from '../thirdPartyType';
//@ts-ignore
import * as THREE from 'three';

interface ForceGraphConfig {
	data: any;
	width?: number;
	height?: number;
	nodeColor?: string | ((node: any) => string);
	linkWidth?: number | ((link: any) => number);
	linkColor?: string | ((link: any) => string);
	backgroundColor?: string;
	[key: string]: any; // for extensibility
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
  label?:string;
}

export class ForceGraphService implements thirdParty {
	private graph: ForceGraph3DInstance | null | any = null;
	private container: HTMLElement | null = null;

	setContainer(context: HTMLElement) {
		this.container = context;
	}

	init(context: HTMLElement, config: ForceGraphConfig) {
		this.container ??= context;
		this.graph = new ForceGraph3D(this.container);

		this.graph.width(config.width || 800);
		this.graph.height(config.height || 600);

		this.graph.showNavInfo(false);

		this.graph.nodeRelSize(10);

		// this.graph.nodeColor("#d43b3b")
		this.graph.nodeColor('rgb(212,59,59)');

		this.graph.backgroundColor(config.backgroundColor || '#d43b3bff');

		if (config.data) this.graph.graphData(config.data);

		this.graph.nodeThreeObject((node:ForceGraphNode) => {
			// Sphere for the node
			const sphereGeometry = new THREE.SphereGeometry(5);
			const sphereMaterial = new THREE.MeshStandardMaterial({
				color: config.nodeColor
					? typeof config.nodeColor === 'function'
						? config.nodeColor(node)
						: config.nodeColor
					: '#d43b3b',
				metalness: 0.5,
				roughness: 0.5,
			});
			const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);

			// Text label above the sphere
			const label = this.createTextSprite(node.name || node.id || '');
			label.position.set(0, 6, 0); // offset above sphere
			sphere.add(label);

			return sphere;
		});

    this.graph.linkWidth(1);
     this.graph.linkThreeObjectExtend(true).linkThreeObject((link:ForceGraphLink) => {
    const group = new THREE.Group();

    // Label in middle
    const label = this.createTextSprite(link.label || link.name || '');
    label.position.set(0, 0, 0);
    group.add(label);

    // Arrow at end
    const arrow = new THREE.Mesh(
      new THREE.ConeGeometry(0.8, 3, 8),
      new THREE.MeshBasicMaterial({ color: 'yellow' })
    );
    group.add(arrow);

    // Store ref for position update
    (link as any).__arrowObj = arrow;
    (link as any).__labelObj = label;

    return group;
  });

  // Update positions of label & arrow
  this.graph.linkPositionUpdate((obj, { start, end }, link:ForceGraphLink) => {
    const label = (link as any).__labelObj;
    const arrow = (link as any).__arrowObj;

    if (label) {
      label.position.set(
        (start.x + end.x) / 2,
        (start.y + end.y) / 2,
        (start.z + end.z) / 2
      );
    }

    if (arrow) {
      const dir = new THREE.Vector3(end.x - start.x, end.y - start.y, end.z - start.z);
      dir.normalize();

      // Position arrow near the target node
      arrow.position.copy(end).addScaledVector(dir, -2); // move back slightly from target
      arrow.lookAt(start); // face source
    }
  })
	}
	private createTextSprite(text: string) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d')!;
		context.font = 'Bold 28px Arial';
		context.fillStyle = 'rgba(219, 33, 33, 1)';
		context.textAlign = 'center';
		context.fillText(text, canvas.width / 2, canvas.height / 2);

		const texture = new THREE.CanvasTexture(canvas);
		const spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
		});
		const sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(20, 10, 1); // label size

		return sprite;
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

	returnMethods() {
		return {
			init: this.init.bind(this),
			setContainer: this.setContainer,
			updateData: this.updateData.bind(this),
			getInstance: this.getInstance,
			destroy: this.destroy,
		};
	}
}
