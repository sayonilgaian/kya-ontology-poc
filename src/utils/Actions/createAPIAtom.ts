import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';
import { generateUUID } from '../common';

export function createAPIAtom(this: BaseUIElement, config: any = {}): any {
	const type = config?.op || "SetHeaders";
	let value = config?.value || {};

	switch (type) {
		case "SetHeaders":
			config.value = {
				Authorization: value["Authorization"] || "Bearer xyz",
				"Content-Type": value["Content-Type"] || "application/json"
			};
			break;
		case "SetServiceMap":
			config.value = {
				user: value["user"] || "https://user-service.com",
				auth: value["auth"] || "https://auth-service.com"
			};
			break;
		case "SetService":
			config.value = {
				key: value.key || "service-key",
				url: value.url || "https://default-service.com",
				headers: value.headers || { Authorization: "Bearer abc123" }
			};
			break;
		case "RemoveService":
			config.value = value || "service-key";
			break;
		case "SetServiceHeaders":
			config.value = {
				key: value.key || "service-key",
				headers: value.headers || { Authorization: "Bearer user-token" }
			};
			break;
		case "RemoveServiceHeaders":
			config.value = value || "service-key";
			break;
		case "GetHeaders":
		case "GetServiceMap":
			config.callback = config.callback || "defaultCallback";
			break;
		case "GetServiceHeaders":
			config.value = value || "service-key";
			config.callback = config.callback || "defaultCallback";
			break;
		default:
			console.warn(`Unknown APIAtom operation: ${type}`);
			break;
	}

	return {
		id: generateUUID(),
		type: "APIAtom",
		config
	};
}
