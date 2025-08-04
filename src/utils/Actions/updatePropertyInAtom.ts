import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function updatePropertyInAtom(
	this: BaseUIElement,
	atom: any,
	key: string,
	newValue: any
): any {
	if (!atom || !atom.config || !(key in atom.config)) {
		console.warn(`Key "${key}" not found in atom.config`);
		return atom;
	}

	const oldValue = atom.config[key];
	const oldType = typeof oldValue;

	let convertedValue;

	try {
		switch (oldType) {
			case 'number':
				convertedValue = Number(newValue);
				if (isNaN(convertedValue)) throw new Error('Invalid number');
				break;
			case 'boolean':
				convertedValue =
					newValue === 'true' || newValue === true || newValue === 1;
				break;
			case 'object':
				convertedValue =
					typeof newValue === 'string' ? JSON.parse(newValue) : newValue;
				break;
			case 'string':
			default:
				convertedValue = String(newValue);
				break;
		}
	} catch (err) {
		console.error('Type conversion error:', err);
		return atom;
	}

	atom.config[key] = convertedValue;
	return atom;
}
