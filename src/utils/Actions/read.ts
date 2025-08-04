import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

// export function read(this: BaseUIElement): string | null {
// 	// console.log("READ:", this.textContent);
// 	return this.textContent;
// }

export function read(this: BaseUIElement): string | null {
	const value = this.textContent || "";
	// Remove invisible char
	const cleaned = value.replace(/\u200B/g, "").trim();
	return cleaned;
}
