import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function panStart(this: BaseUIElement, e: MouseEvent): any {
    //console.log('pan start');

    const parentRect = this.parentNode instanceof ShadowRoot ? 
        this.parentNode.host.getBoundingClientRect()
        : undefined;
    
    const elementRect = this.getBoundingClientRect();

    // Where inside the element did we grab?
    const grabOffsetX = e.clientX - elementRect.left;
    const grabOffsetY = e.clientY - elementRect.top;

    this.actionData._panData = {
        grabOffsetX,
        grabOffsetY,
        dragging: true,
        parentRectLeft: parentRect?.left,
        parentRectTop: parentRect?.top,
    };
}
