import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export async function post(
  this: BaseUIElement,
  url: string,
  data: unknown,
  serviceKey: string,
  headers: HeadersInit = {}
): Promise<unknown> {
  console.log(url, data, headers, serviceKey);
  const response = await this.apiService?.post(url, data, headers, serviceKey);
  // Optionally transform or inspect the response
  return response;
}
