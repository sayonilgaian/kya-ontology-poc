// threejs-service.ts
// @ts-ignore

import * as THREE from 'three';
// @ts-ignore
import { DragControls } from 'three/examples/jsm/controls/DragControls.js';

// OrbitControls is in examples, import as needed
// @ts-ignore
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
//@ts-ignore
import * as d3 from 'd3-force-3d';

interface Node {
	id: string;
	x: number;
	y: number;
	z: number;
	color?: string;
}
interface Edge {
	source: string;
	target: string;
}

interface ThreeJsConfig {
	sceneBackground?: number | string;
	camera?: {
		fov: number;
		near: number;
		far: number;
		position: [number, number, number];
	};
	nodes?: Node[];
	edges?: Edge[];
}
export class ThreeSemanticGraphService {
	private scene: THREE.Scene;
	private camera: THREE.PerspectiveCamera;
	private renderer: THREE.WebGLRenderer;
	private controls: OrbitControls;
	private config: ThreeJsConfig = {};
	private container: HTMLElement | null = null;
	private nodes: Map<string, THREE.Mesh> = new Map();
	private edges: THREE.Line[] = [];

	constructor() {}

	init(container: HTMLElement, config: ThreeJsConfig = {}) {
		this.container = container;
		this.config = config;

		this.scene = new THREE.Scene();
		// if (config.sceneBackground)
			this.scene.background = new THREE.Color("gray");

		// Camera setup
		this.camera = new THREE.PerspectiveCamera(
			config.camera?.fov ?? 75,
			container.offsetWidth / container.offsetHeight,
			config.camera?.near ?? 0.1,
			config.camera?.far ?? 1000
		);
		const pos = config.camera?.position ?? [0, 0, 10];
		this.camera.position.set(...pos);

		// Renderer setup
		this.renderer = new THREE.WebGLRenderer({ antialias: true });
		this.renderer.setSize(container.offsetWidth, container.offsetHeight);
		container.appendChild(this.renderer.domElement);

		// Controls
		this.controls = new OrbitControls(
			this.camera,
			this.renderer.domElement
		);

		// Sample light
		const light = new THREE.AmbientLight(0xffffff, 0.9);
		this.scene.add(light);
		const dirLight = new THREE.DirectionalLight(0xffffff, 0.6);
		dirLight.position.set(5, 10, 7.5);
		this.scene.add(dirLight);

		// Add sample data
		const data = {
			nodes: [
				{ id: 'A', x: 0, y: 0, z: 0, color: '#ff0000' },
				{ id: 'B', x: 2, y: 0, z: 0, color: '#00ff00' },
				{ id: 'C', x: 1, y: 2, z: 0, color: '#0000ff' },
				{ id: 'D', x: -1, y: 1, z: 1, color: '#ffff00' },
			],
			edges: [
				{ source: 'A', target: 'B' },
				{ source: 'A', target: 'C' },
				{ source: 'B', target: 'C' },
				{ source: 'C', target: 'D' },
			],
		};
		this.renderGraph(data.nodes, data.edges ?? []);

		this.animate();
		return this;
	}

	makeTextSprite(message: string, parameters: any = {}) {
		const fontface = parameters['fontface'] || 'Arial';
		const fontsize = parameters['fontsize'] || 24;
		const borderThickness = parameters['borderThickness'] || 4;
		const borderColor = parameters['borderColor'] || {
			r: 0,
			g: 0,
			b: 0,
			a: 1.0,
		};
		const backgroundColor = parameters['backgroundColor'] || {
			r: 255,
			g: 255,
			b: 255,
			a: 1.0,
		};

		const canvas = document.createElement('canvas');
		const context = canvas.getContext('2d')!;
		context.font = fontsize + 'px ' + fontface;
		context.fillStyle = `rgba(${backgroundColor.r},${backgroundColor.g},${backgroundColor.b},${backgroundColor.a})`;
		context.fillRect(
			0,
			0,
			context.measureText(message).width + borderThickness,
			fontsize + borderThickness
		);
		context.fillStyle = 'rgba(0,0,0,1.0)';
		context.fillText(message, borderThickness, fontsize);

		const texture = new THREE.CanvasTexture(canvas);
		const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
		const sprite = new THREE.Sprite(spriteMaterial);
		sprite.scale.set(1, 0.5, 1); // scale labels appropriately
		return sprite;
	}

	renderGraph(nodes: Node[], edges: Edge[]) {
		// Clear old nodes/edges
		this.nodes.forEach((mesh) => this.scene.remove(mesh));
		this.edges.forEach((line) => this.scene.remove(line));
		this.nodes.clear();
		this.edges = [];

		// Add nodes as spheres
		for (const node of nodes) {
			const geometry = new THREE.SphereGeometry(0.5, 16, 16);
			const material = new THREE.MeshPhongMaterial({
				color: node.color ?? 0x2196f3,
			});
			const sphere = new THREE.Mesh(geometry, material);
			sphere.position.set(node.x, node.y, node.z);
			this.nodes.set(node.id, sphere);
			this.scene.add(sphere);
			const label = this.makeTextSprite(node.id, { fontsize: 60 });
			label.position.set(node.x, node.y + 0.3, node.z); // offset above sphere
			this.scene.add(label);
		}

		// Add edges as lines
		for (const edge of edges) {
			const src = this.nodes.get(edge.source);
			const tgt = this.nodes.get(edge.target);
			if (!src || !tgt) continue; // skip invalid edge
			const points = [src.position, tgt.position];
			const geometry = new THREE.BufferGeometry().setFromPoints(points);
			const material = new THREE.LineBasicMaterial({ color: 0x757575 });
			const line = new THREE.Line(geometry, material);
			this.edges.push(line);
			this.scene.add(line);
		}
	}

	updateData(nodes: Node[], edges: Edge[]) {
		this.renderGraph(nodes, edges);
	}

	animate() {
		requestAnimationFrame(() => this.animate());
		this.controls.update();
		this.renderer.render(this.scene, this.camera);
	}

	fit() {
		// Optional: fit all objects in camera view (implement as you need)
		this.controls.reset();
	}
	zoom(level: number) {
		this.camera.zoom = level;
		this.camera.updateProjectionMatrix();
	}
	destroy() {
		if (this.container) this.container.innerHTML = '';
		this.nodes.forEach((mesh) => mesh.geometry.dispose());
		this.edges.forEach((line) => line.geometry.dispose());
		this.renderer.dispose();
	}
	returnMethods() {
		return {
			init: this.init.bind(this),
			updateData: this.updateData.bind(this),
			fit: this.fit.bind(this),
			zoom: this.zoom.bind(this),
			destroy: this.destroy.bind(this),
		};
	}
}
