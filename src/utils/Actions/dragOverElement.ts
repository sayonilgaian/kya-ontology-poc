import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function dragOverElement(
  this: BaseUIElement,
  gridRows: any,
  gridColumns: any,
  e: DragEvent
): any {
  if (this.style.display === "grid") {
    const droppedX = e.clientX;
    const droppedY = e.clientY;

    const gridRect = this.getBoundingClientRect();
    const cellWidth = gridRect.width / gridColumns;
    const cellHeight = gridRect.height / gridRows;

    const x_cell = Math.floor((droppedX - gridRect.left) / cellWidth) + 1;
    const y_cell = Math.floor((droppedY - gridRect.top) / cellHeight) + 1;
    const currentGridArea = `${y_cell} / ${x_cell}`;

    // ✅ Remove previous highlight if exists
    if (this.actionData._highlightElement) {
      this.removeChild(this.actionData._highlightElement);
    }

    // ✅ Check if any child has atom with matching grid-area
    let conflict = false;

    if (Array.isArray(this._children)) {
      for (const child of this._children) {
        if (Array.isArray(child.atoms)) {
          for (const atom of child.atoms) {
            const gridArea = atom?.config?.["grid-area"];
            if (gridArea === currentGridArea) {
              conflict = true;
              break;
            }
          }
        }
        if (conflict) break;
      }
    }

    // ✅ Create new highlight div
    const highlight = document.createElement("div");
    highlight.style.position = "absolute";
    highlight.style.left = (x_cell - 1) * cellWidth + "px";
    highlight.style.top = (y_cell - 1) * cellHeight + "px";
    highlight.style.width = cellWidth + "px";
    highlight.style.height = cellHeight + "px";

    // Change style based on conflict
    if (conflict) {
      highlight.style.backgroundColor = "rgba(255, 255, 0, 0.5)"; // yellow
      highlight.style.border = "2px solid red";
    } else {
      highlight.style.backgroundColor = "rgba(0, 150, 255, 0.2)";
      highlight.style.border = "2px solid #0096ff";
    }

    highlight.style.pointerEvents = "none"; // No mouse interaction

    this.style.position = "relative";
    this.appendChild(highlight);
    this.actionData._highlightElement = highlight;

    // Auto-remove after delay
    setTimeout(() => {
      if (this.actionData._highlightElement === highlight) {
        this.removeChild(highlight);
        delete this.actionData._highlightElement;
      }
    }, 500);
  }

  e.preventDefault();
  e.stopImmediatePropagation();
}
