import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function dragElement(this: BaseUIElement, e: DragEvent): any {
    e.stopImmediatePropagation();
    let id:string = 'id_' + Date.now();
    const plan:any = structuredClone(this.currentPlan);
    if(!plan.id){
        plan['id'] = id
    }
    e.dataTransfer?.setData(
        "application/json",
        JSON.stringify(plan)
    );
}
