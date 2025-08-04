import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export async function put(
	this: BaseUIElement,
	url: string,
	data: unknown,
	serviceKey: string,
	headers: HeadersInit = {}
): Promise<unknown> {
	return await this.apiService?.put(url, data, headers, serviceKey);
}
