import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function replaceAtomsOfComponentInJSON(
    this: BaseUIElement,
    object: any,
    componentId: string,
    atoms: Array<any>
): any {
    function replaceAtoms(node: any): any {
        let compare = componentId
        if(typeof componentId === "object") {
            compare = componentId[0]
        }
        if (node.id === compare) {
            // Return a new node with updated atoms
            return {
                ...node,
                atoms: Array.isArray(atoms) ? atoms : [],
                children: node.children ? node.children.map(replaceAtoms) : []
            };
        }
        // For all other nodes, return a new node with children processed
        return {
            ...node,
            children: node.children ? node.children.map(replaceAtoms) : []
        };
    }

    return replaceAtoms(structuredClone(object));
}