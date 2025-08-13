import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { thirdParty } from '../thirdPartyType';
//@ts-ignore
import * as THREE from 'three';

interface ForceGraphConfig {
	data: any;
	width?: number;
	height?: number;
	nodeColor?: string | ((node: any) => string);
	nodeLabelFontColor?: string;
	linkWidth?: number;
	linkColor?: string;
	linkResolution?: number;
	linkOpacity?: number;
	linkLabelFontSize: number;
	linkLabelFontColor: string;
	linkLabelOffset: number;
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

		this.graph.nodeThreeObject((node) => {
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
			const label = this.createTextSprite(
				node.name || node.id || '',
				config,
				'node'
			);
			label.position.set(0, 6, 0); // offset above sphere
			sphere.add(label);

			return sphere;
		});

		// Add links between nodes
		this.graph.linkWidth(config.linkWidth || 1);
		this.graph.linkColor(config.linkColor || 'black');
		this.graph.linkOpacity(config.linkOpacity || 1);
		this.graph.linkResolution(config.linkResolution || 12);

		// Add edge labels and place them with respect to edges properly
		this.graph.linkThreeObjectExtend(true).linkThreeObject((link) => {
			const group = new THREE.Group();
			// Label in middle
			const label = this.createTextSprite(
				link.label || link.name || '',
				config,
				'link'
			);
			group.add(label);

			// this.graph.linkLabel(this.createTextSprite(link.label || link.name || ''));

			// // Arrow at end
			// const arrow = new THREE.Mesh(
			// 	new THREE.ConeGeometry(0.8, 3, 8),
			// 	new THREE.MeshBasicMaterial({ color: 'yellow' })
			// );
			// group.add(arrow);

			// Store ref for position update
			// (link as any).__arrowObj = arrow;
			(link as any).__labelObj = label;

			return group;
		});

		// Update positions of label & arrow
		this.graph.linkPositionUpdate((obj, { start, end }, link) => {
			const label = (link as any).__labelObj;
			const arrow = (link as any).__arrowObj;
			const labelOffset =
				config.linkLabelOffset || config.linlinkLabelFontSize || 10;
			if (label) {
				label.position.set(
					(start.x + end.x) / 2,
					(start.y + end.y) / 2 + labelOffset,
					(start.z + end.z) / 2
				);
			}

			if (arrow) {
				const dir = new THREE.Vector3(
					end.x - start.x,
					end.y - start.y,
					end.z - start.z
				);
				const length = dir.length();
				dir.normalize();

				// Position arrow near the target node
				arrow.position.copy(end).addScaledVector(dir, -2); // move back slightly from target
				arrow.lookAt(start); // face source
			}
		});
	}

	// Creating text billnoards over edges
	private createTextSprite(
		text: string,
		config: ForceGraphConfig,
		target: 'node' | 'link'
	) {
		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d')!;
		context.font = `Bold ${config.linkLabelFontSize || 28}px Arial`;
		context.fillStyle =
			target === 'node'
				? config.nodeLabelFontColor || 'rgba(219, 33, 33, 1)'
				: config.linkLabelFontColor || 'rgba(219, 33, 33, 1)';
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
			updateData: this.updateData,
			getInstance: this.getInstance,
			destroy: this.destroy,
		};
	}
}
