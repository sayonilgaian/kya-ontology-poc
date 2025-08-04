import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function convertAtomConfigsToArray(
    this: BaseUIElement,
    object: any
): any {
    const EXCLUDED_TYPES = [
        "KeyboardEventAtom",
        "StateAtom",
        "InteractionAtom",
        "APIAtom",
    ];

    function convertAtom(atom: any) {
        const cfg = atom.config;

        if (EXCLUDED_TYPES.includes(atom.type) || Array.isArray(cfg)) {
            return atom;
        }

        if (
            typeof cfg === "object" &&
            cfg !== null &&
            Object.keys(cfg).length === 2 &&
            "role" in cfg &&
            "value" in cfg
        ) {
            atom.config = [cfg];
            return atom;
        }

        if (typeof cfg === "object" && cfg !== null) {
            atom.config = Object.entries(cfg).map(([key, value]) => ({
                role: key,
                value,
            }));
        }

        return atom;
    }

    function traverse(node: any): any {
        if (!node) {
            return;
        }
        if (Array.isArray(node.atoms)) {
            node.atoms = node.atoms.map(convertAtom);
        }
        if (Array.isArray(node.children)) {
            node.children = node.children.map(traverse);
        }
        return node;
    }

    return traverse(structuredClone(object));
}
