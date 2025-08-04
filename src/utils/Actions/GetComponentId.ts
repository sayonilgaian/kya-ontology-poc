import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function GetComponentId(this: BaseUIElement, e: Event): any {
	const componentId = this.id;
	e.stopPropagation();
	return componentId;
}
