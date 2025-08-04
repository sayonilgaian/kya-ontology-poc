import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function traverse(
    this: BaseUIElement,
    obj: any,
    updatedObj: any,
    callback: (node: any, updatedObj: any) => void
): any {
    console.log("TRAVERSE:", obj, updatedObj);
    const traverseObj = (node: any): any => {
        if (node && updatedObj) {
            if (node?.id && node.id === updatedObj.id) {
                callback(node, updatedObj);
            }
            if (node?.children && Array.isArray(node.children)) {
                node.children = node.children.map((child: any) =>
                    traverseObj(child)
                );
            }
        }
        return node;
    };

    const result = traverseObj(obj);
	console.log("TRAVERSE RESULT:", result);
	return result
}
