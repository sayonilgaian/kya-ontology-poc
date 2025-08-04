import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function dropElement(
  this: BaseUIElement,
  gridRows: any,
  gridColumns: any,
  e: DragEvent
): any {
  e.preventDefault();
  e.stopImmediatePropagation();

  const prev = document.querySelector(".drop-hover-highlight");
  if (prev) prev.classList.remove("drop-hover-highlight");

  const dropData = e.dataTransfer?.getData("application/json");
  if (!dropData) return;

  const droppedPlan = JSON.parse(dropData);

  let dropTarget = document.elementFromPoint(
    e.clientX,
    e.clientY
  ) as HTMLElement;
  if (!dropTarget) return;

  while (dropTarget?.shadowRoot?.elementFromPoint) {
    const deeper = dropTarget.shadowRoot.elementFromPoint(
      e.clientX,
      e.clientY
    ) as HTMLElement;
    if (!deeper || deeper === dropTarget) break;
    dropTarget = deeper;
  }

  // ❗ Grid location calculation
  if (dropTarget.style.display === "grid") {
    const droppedX = e.clientX;
    const droppedY = e.clientY;

    const gridRect = dropTarget.getBoundingClientRect();
    const cellWidth = gridRect.width / gridColumns;
    const cellHeight = gridRect.height / gridRows;

    const x_cell = Math.floor((droppedX - gridRect.left) / cellWidth) + 1;
    const y_cell = Math.floor((droppedY - gridRect.top) / cellHeight) + 1;

    const currentGridArea = `${y_cell} / ${x_cell}`;

    // ❗ Check conflict in existing elements
    let conflict = false;
    if (Array.isArray((dropTarget as any)._children)) {
      for (const child of (dropTarget as any)._children) {
        if (Array.isArray(child.atoms)) {
          for (const atom of child.atoms) {
            const gridArea = atom?.config?.["grid-area"];
            if (gridArea === currentGridArea) {
              conflict = true;
              break;
            }
          }
        }
        if (conflict){
          return (dropTarget as any)._currentPlan;
        };
      }
    }

    // ✅ No conflict: proceed to add atoms
    droppedPlan.atoms.push(
      {
        type: "LayoutAtom",
        config: {
          "grid-area": currentGridArea,
          position: "absolute",
        },
      }
    );
  }

  // ✅ Attach only if no conflict
  const attached = tryAttach(dropTarget as BaseUIElement);
  if (!attached) {
    console.warn(
      "Couldn't attach dropped element to any ancestor with 'children'"
    );
  }
  
  console.log("DROP ELEMENT:", (dropTarget as any)._currentPlan);
  return (dropTarget as any)._currentPlan;

  // Nested helper
  function tryAttach(el: BaseUIElement | null) {
    while (el) {
      const plan = (el as any).currentPlan;
      if(!plan.children){ plan.children = []}
      if (plan && Array.isArray(plan.children)) {
        const index = plan.children.findIndex(
          (child: any) => child.id === droppedPlan.id
        );
        if (index !== -1) {
          plan.children[index] = droppedPlan;
        } else {
          plan.children = [...plan.children, droppedPlan];
        }
        el.childDefs = plan.children;
        return true;
      }
      if (el) {
        const parent = el.parentElement;
        el = parent instanceof BaseUIElement ? parent : null;
      }
    }
    (dropTarget as any)._currentPlan;
  }
}
