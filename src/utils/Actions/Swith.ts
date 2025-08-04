import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function Switch(
	this: BaseUIElement,
	switchInput: unknown,
	cases: Array<{ case: any; return: string[] }>
): string[] {
	for (let i = 0; i < cases.length; i++) {
		if (cases[i].case === switchInput) {
			return cases[i].return;
		}
	}
	return [];
}
