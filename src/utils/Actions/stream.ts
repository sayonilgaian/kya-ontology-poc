import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export async function stream(
  this: BaseUIElement,
  url: string,
  streamHandler: (chunk: string) => void,
  serviceKey: string,
  headers: HeadersInit = {}
): Promise<unknown> {
  return await this.apiService?.stream(url, streamHandler, headers, serviceKey);
}
