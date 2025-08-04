export class KeyboardShortcutService {
	private keyMap: { [key: string]: (e: Event) => void } = {};
	private component: HTMLElement;
	private boundKeyHandler: (e: KeyboardEvent) => void;
	private boundMouseHandler: (e: MouseEvent) => void;
	private boundMoveHandler: (e: MouseEvent) => void;
	private boundWheelHandler: (e: WheelEvent) => void;
	#isInit = false;

	constructor(component: HTMLElement) {
		this.component = component;

		this.boundKeyHandler = this.handleKeyDown.bind(this);
		this.boundMouseHandler = this.handleMouseDown.bind(this);
		this.boundMoveHandler = this.handleMouseMove.bind(this);
		this.boundWheelHandler = this.handleWheel.bind(this);
	}

	init() {
		this.component.setAttribute('tabindex', '0');
		this.component.addEventListener('keydown', this.boundKeyHandler);
		this.component.addEventListener('mousedown', this.boundMouseHandler);
		this.component.addEventListener('mousemove', this.boundMoveHandler);
		this.component.addEventListener('wheel', this.boundWheelHandler);

		this.#isInit = true;
	}

	destroy() {
		this.component.removeEventListener('keydown', this.boundKeyHandler);
		this.component.removeEventListener('mousedown', this.boundMouseHandler);
		this.component.removeEventListener('mousemove', this.boundMoveHandler);
		this.component.removeEventListener('wheel', this.boundWheelHandler);
		this.keyMap = {};
	}

	get isInit() {
		return this.#isInit;
	}

	registerShortcut(combo: string) {
		this.keyMap[combo.toLowerCase()] = () => {};
	}

	onShortcut(combo: string, handler: (e: Event) => void) {
		const key = combo.toLowerCase();
		this.keyMap[key] = handler;
	}

	offShortcut(combo: string) {
		const key = combo.toLowerCase();
		delete this.keyMap[key];
	}

	getEvents(): Array<string> {
		return Object.keys(this.keyMap);
	}

	// --- Event Handlers ---
	private handleKeyDown(event: KeyboardEvent) {
		const tag = (event.target as HTMLElement)?.tagName;
		if (['INPUT', 'TEXTAREA'].includes(tag)) return;

		const combo = this.getCombo(event);
		this.#trigger(combo, event);
	}

	private handleMouseDown(event: MouseEvent) {
		this.#checkCombo(event, 'mousedown');
	}

	private handleMouseMove(event: MouseEvent) {
		this.#checkCombo(event, 'mousemove');
	}

	private handleWheel(event: WheelEvent) {
		this.#checkCombo(event, 'wheel');
	}

	// --- Combo Builders ---
	private getCombo(event: KeyboardEvent | MouseEvent | WheelEvent): string {
		const keys = [];
		if (event.ctrlKey) keys.push('ctrl');
		if (event.altKey) keys.push('alt');
		if (event.shiftKey) keys.push('shift');
		if (event.metaKey) keys.push('meta');

		// Special handling based on event type
		if (event instanceof KeyboardEvent) {
			keys.push(event.key.toLowerCase());
		}
		return keys.join('+');
	}

	#checkCombo(event: MouseEvent | WheelEvent, type: string) {
		const combo = this.getCombo(event) + '+' + type;
		this.#trigger(combo, event);
	}

	#trigger(combo: string, event: Event) {
		const handler = this.keyMap[combo.toLowerCase()];
		if (typeof handler === 'function') {
			event.preventDefault?.();
			event.stopPropagation?.();
			handler(event);
		}
	}
}
