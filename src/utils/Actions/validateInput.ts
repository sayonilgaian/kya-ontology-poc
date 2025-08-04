import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function validateInput(this: BaseUIElement,type:string): boolean {

    const value =
        this.textContent
            ?.replace(/\u200B/g, "")
            .replace(/\n/g, "")
            .trim() || "";
    let isValid = true;

    switch (type) {
        case "email":
            isValid = /^[\w.-]+@[a-zA-Z\d.-]+\.(com|org|net|edu|gov|io)$/.test(
                value
            );
            break;
        case "singleLine":
            isValid = /^[^\r\n]+$/.test(value);
            break;
        case "multiline":
            isValid = /^[\s\S]*$/.test(value);
            break;
        case "url":
            isValid =
                /^(https?:\/\/)?([\w-]+\.)+[\w-]{2,}(\/[\w\-._~:/?#[\]@!$&'()+,;=])?$/i.test(
                    value
                );
            break;
        case "userName":
        case "password":
        case "AlphaNumeric":
            isValid = /^[a-zA-Z0-9]+$/.test(value);
            break;
        case "onlyDigits":
            isValid = /^\d+$/.test(value);
            break;
        case "onlyText":
            isValid = /^[a-zA-Z]+$/.test(value);
            break;
        case "text":
            isValid = typeof value === "string";
            break;
        case "telephone":
            isValid = /^\+?[0-9\s\-()]{7,20}$/.test(value);
            break;
        case "date":
            isValid =
                /^(0[1-9]|[12]\d|3[01])[-\/\.](0[1-9]|1[0-2])[-\/\.](\d{4})$/.test(
                    value
                );
            break;
        default:
            isValid = true;
    }

    // console.log('Validation result:', isValid, 'for value:', value);
    return isValid;
}
