import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export async function GetDataFromIndexDb(
  this: BaseUIElement,
  key: string,
  defaultValue: any = null
): Promise<any> {
  if (!this.idexedDBService) {
    console.warn("⚠️ IndexedDB service not available");
    return defaultValue;
  }

  try {
    const data = await this.idexedDBService.get(key);
    console.log("GET DATA", data, defaultValue, key);
    return data ?? defaultValue;
  } catch (error) {
    console.error(`❌ Failed to get key "${key}" from IndexedDB:`, error);
    return defaultValue;
  }
}