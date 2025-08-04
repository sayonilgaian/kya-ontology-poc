import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function SetDataToIndexDb(
  this: BaseUIElement,
  key: string,
  value: any,
): any {
  if (!this.idexedDBService) {
    console.warn("IndexedDB service not available");
    return;
  }

  try {
    this.idexedDBService.save(key, value);
    console.log(`✅ Data saved to IndexedDB at path: ${key}`);
  } catch (error) {
    console.error("❌ Failed to save to IndexedDB:", error);
  }
}
