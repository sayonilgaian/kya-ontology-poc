import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

function isObject(value: any): value is Record<string, any> {
    return value !== null && typeof value === "object" && !Array.isArray(value);
}

function flattenObject(
    obj: Record<string, any>,
    prefix = ""
): Record<string, any> {
    let result: Record<string, any> = {};
    for (const key in obj) {
        if (Object.hasOwnProperty.call(obj, key)) {
            const newKey = prefix ? `${prefix}.${key}` : key;
            const value = obj[key];
            if (isObject(value)) {
                Object.assign(result, flattenObject(value, newKey));
            } else {
                result[newKey] = value;
            }
        }
    }
    return result;
}

export function setToLocalStorage(
    this: BaseUIElement,
    data: unknown,
    name: string,
    isFlatten: boolean = false
): unknown {
    if (isFlatten && isObject(data)) {
        const flatData = flattenObject(data);
        for (const key in flatData) {
            localStorage.setItem(key, JSON.stringify(flatData[key]));
        }
        return flatData;
    } else {
        localStorage.setItem(name, JSON.stringify(data));
        return data;
    }
}
