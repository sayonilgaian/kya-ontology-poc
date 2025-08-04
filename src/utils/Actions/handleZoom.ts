import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function handleZoom(this: BaseUIElement, e: Event): void {
	const wheelEvent = e as WheelEvent;
	let scale = parseFloat(this.style.scale || '1');

	if (wheelEvent.deltaY < 0) {
		scale *= 1.1; // Zoom in
	} else {
		scale /= 1.1; // Zoom out
	}

	scale = Math.min(Math.max(scale, 0.5), 3); // Clamp between 0.5x and 3x

	this.style.scale = scale.toString();
}
