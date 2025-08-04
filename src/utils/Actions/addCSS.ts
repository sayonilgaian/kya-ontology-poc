import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";
import { applyStyles } from "../common";

export function addCSS(this: BaseUIElement, css: Record<string, string>): void {
    applyStyles(this, css);
}
