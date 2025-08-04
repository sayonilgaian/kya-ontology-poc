export function updateCallback(node: any, updated: any): void {
	node.children = updated.children;
	node.atoms = updated.atoms;
}
