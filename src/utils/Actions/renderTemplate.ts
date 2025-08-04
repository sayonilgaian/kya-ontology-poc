import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";
import { get, traverse } from "../common";

export function renderTemplate(
    this: BaseUIElement,
    templateId: string,
    index: number = 0,
    data: any
): any {
    const plan = structuredClone(BaseUIElement.templateRegistry[templateId]);

    const renderPlan = () => {
        if (!plan) return; // safety check

        plan.type = "Component";

        traverse(plan, (key, value) => {
            if(!value) return value
            const { path, defaultValue = "", type = "" } = value;
            if (type === "Dynamic") {
                value = get(data, path, defaultValue);
            } else if (type === "Index") {
                value = index;
            }
            return value;
        });

        this.childDefs = [...this.childDefs, plan];
    };

    if (plan) {
        renderPlan();
    }
}
