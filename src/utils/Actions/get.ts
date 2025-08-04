import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export async function get(
	this: BaseUIElement,
	url: string,
	serviceKey: string,
	headers: HeadersInit = {}
): Promise<unknown> {
	return await this.apiService?.get(url || '', headers, serviceKey);
}
