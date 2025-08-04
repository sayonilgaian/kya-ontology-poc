import { BaseUIElement } from "../../../Lib/BaseComponent/baseComponent";

export function colorPicker(this: BaseUIElement, color = "#000000", colorVariable: string) {
    this.style.position = "relative";

    const hiddenInput = document.createElement("input");
    hiddenInput.type = "color";
    hiddenInput.value = color;
    hiddenInput.style.position = "absolute";
    hiddenInput.style.opacity = "0";
    hiddenInput.style.pointerEvents = "auto";
    hiddenInput.style.width = "30px";
    hiddenInput.style.height = "30px";
    hiddenInput.style.zIndex = "9999";

    this.shadowRoot?.appendChild(hiddenInput);

    const updatePosition = () => {
        hiddenInput.style.left = `0`;
        hiddenInput.style.top = `${this.offsetHeight}px`;
    };

    updatePosition();

    this.addEventListener("click", () => {
        updatePosition();
        hiddenInput.click();
    });

    hiddenInput.addEventListener("input", async () => {
        this.actionData[colorVariable] = hiddenInput.value;
        await this.actionCb?.();
    });
}
