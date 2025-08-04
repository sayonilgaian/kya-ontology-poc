import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function handlePan(this: BaseUIElement, e: MouseEvent): any {
    //console.log('panning');

    if (!this.actionData._panData || !this.actionData._panData.dragging) return;

    // Cursor position relative to parent
    const cursorX = e.clientX - this.actionData._panData.parentRectLeft;
    const cursorY = e.clientY - this.actionData._panData.parentRectTop;

    // Move the element so the "grab point" stays under the cursor
    const moveX = cursorX - this.actionData._panData.grabOffsetX;
    const moveY = cursorY - this.actionData._panData.grabOffsetY;

    this.style.transform = `translate(${moveX}px, ${moveY}px)`;
}
