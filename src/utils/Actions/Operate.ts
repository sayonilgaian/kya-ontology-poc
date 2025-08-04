import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function Operate(
	this: BaseUIElement,
	left: any,
	right: any,
	operator: string,
	pipeResults: Record<string, any>
): boolean {
	console.log("OPERATE", left, operator,right)
	switch (operator) {
		case '==':
			return left == right;
		case '!=':
			return left != right;
		case '>':
			return left > right;
		case '<':
			return left < right;
		case '>=':
			return left >= right;
		case '<=':
			return left <= right;
		default:
			return false;
	}
}
