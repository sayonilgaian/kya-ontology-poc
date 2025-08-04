import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export async function deleteCall(
  this: BaseUIElement,
  url: string,
  data: undefined | any,
  serviceKey: string,
  headers: HeadersInit = {}
): Promise<unknown> {
  return await this.apiService?.delete(url, data, headers, serviceKey);
}
