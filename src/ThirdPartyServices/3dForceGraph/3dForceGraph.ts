import ForceGraph3D, { ForceGraph3DInstance } from '3d-force-graph';
import { thirdParty } from '../thirdPartyType';
import * as THREE from 'three';

interface ForceGraphConfig {
	data: any;
	width?: number;
	height?: number;
	nodeRadius?: number;
	nodeColor?: string | ((node: any) => string);
	nodeLabelFontColor?: string;
	linkWidth?: number;
	linkColor?: string;
	linkResolution?: number;
	linkOpacity?: number;
	linkLabelFontSize: number;
	linkLabelFontColor: string;
	linkLabelOffset: number;
	linkLength: number;
	onNodeClick?: (node: any) => void;
	onLinkClick?: (link: any) => void;
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
	label?: string;
	label?: string;
}

export class ForceGraphService implements thirdParty {
	private graph: ForceGraph3DInstance | null | any = null;
	private container: HTMLElement | null = null;
	private selectedElement!: ForceGraphNode | ForceGraphLink;

	setContainer(context: HTMLElement) {
		this.container = context;
	}

	init(context: HTMLElement, config: ForceGraphConfig) {
		this.container ??= context;
		this.graph = new ForceGraph3D(this.container);

		const defaultConfig = {
			width: 800,
			height: 600,
			nodeRadius: 10,
			nodeColor: 'rgb(212,59,59)',
			backgroundColor: '#d43b3bff',
			linkLength: 100,
		};

		this.graph.width(config.width || defaultConfig.width);
		this.graph.height(config.height || defaultConfig.height);

		this.graph.showNavInfo(false);

		this.graph.nodeRelSize(config.nodeRadius || defaultConfig.nodeRadius);

		this.graph.nodeColor(config.nodeColor || defaultConfig.nodeColor);

		this.graph.backgroundColor(
			config.backgroundColor || defaultConfig.backgroundColor
		);

		if (config.data) this.graph.graphData(config.data);

		// Node click handler
		this.graph.onNodeClick((node: ForceGraphNode, evt) => {
			this.selectedElement = node;
			console.log('Node clicked:', node);
		});

		// Link click handler
		this.graph.onLinkClick((link: ForceGraphLink, evt) => {
			this.selectedElement = link;
			console.log('Link clicked:', link);
		});

		// desried length of links
		this.graph
			.d3Force('link')
			.distance(() => config.linkLength || defaultConfig.linkLength);

		this.graph.nodeThreeObject((node:  ForceGraphNode) => {
			// Sphere for the node
			const sphereGeometry = new THREE.SphereGeometry(
				config.nodeRadius || defaultConfig.nodeRadius
			);
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
		this.graph.linkColor(() => config.linkColor || 'gray');
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
			label.position.set(0, 20, 0);
			group.add(label);

			// Arrow at end
			const arrow = new THREE.Mesh(
				new THREE.ConeGeometry(
					config.linkWidth ? config.linkWidth * 3 : 10,
					config.linkWidth ? config.linkWidth * 7 : 10,
					32
				),
				new THREE.MeshBasicMaterial({
					color: config.linkColor
						? config.linkColor.slice(0, 7)
						: '#0d0d0eff',
				})
			);
			arrow.position.set(0, 0, 0);
			group.add(arrow);

			// Store ref for position update
			(link as any).__arrowObj = arrow;
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

				// +Y axis in model space
				const yAxis = new THREE.Vector3(0, 1, 0);
				const quaternion = new THREE.Quaternion().setFromUnitVectors(
					yAxis,
					dir
				);
				arrow.quaternion.copy(quaternion);

				arrow.position.copy(end).addScaledVector(
					dir,
					config.nodeRadius ? config.nodeRadius * -1.5 : -2
					// 0
				);
			}
		});
	}

	private createTextSprite(
		text: string,
		config: ForceGraphConfig,
		target: 'node' | 'link'
	) {
		const fontSize = config.linkLabelFontSize || 28;
		const font = `Bold ${fontSize}px Arial`;

		// Temporary canvas for measurement
		const tempCanvas = document.createElement('canvas');
		const tempCtx = tempCanvas.getContext('2d')!;
		tempCtx.font = font;
		const textWidth = tempCtx.measureText(text).width;

		// Create final canvas with exact size
		const canvas = document.createElement('canvas');
		canvas.width = Math.ceil(textWidth) + 20; // padding
		canvas.height = fontSize * 1.5; // some vertical padding

		const ctx = canvas.getContext('2d')!;
		ctx.font = font;
		ctx.fillStyle =
			target === 'node'
				? config.nodeLabelFontColor || 'rgba(219, 33, 33, 1)'
				: config.linkLabelFontColor || 'rgba(219, 33, 33, 1)';
		ctx.textAlign = 'center';
		ctx.textBaseline = 'middle';

		// Draw centered text
		ctx.fillText(text, canvas.width / 2, canvas.height / 2);

		// Turn into texture & sprite
		const texture = new THREE.CanvasTexture(canvas);
		texture.needsUpdate = true;
		texture.minFilter = THREE.LinearFilter; // prevents blurring for small text

		const spriteMaterial = new THREE.SpriteMaterial({
			map: texture,
			transparent: true,
		});

		const sprite = new THREE.Sprite(spriteMaterial);

		// Scale based on text length (optional)
		const aspect = canvas.width / canvas.height;
		sprite.scale.set(10 * aspect, 10, 1);

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

	// Always returns most recent clicked node
	onElementClick(): ForceGraphNode | ForceGraphLink {
    console.log("ln1" , this.selectedElement)
		return this.selectedElement;
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
			onElementClick: this.onElementClick.bind(this),
			getInstance: this.getInstance,
			destroy: this.destroy,
		};
	}
}
