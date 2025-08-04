import { BaseUIElement } from "../../../Lib/BaseComponent/baseComponent";

export function fileUpload(this: BaseUIElement, acceptedTypes: string = "*", fileVariable: string) {
    const hiddenInput = document.createElement("input");
    hiddenInput.type = "file";
    hiddenInput.accept = acceptedTypes;
    hiddenInput.style.position = "absolute";
    hiddenInput.style.left = "-9999px"; // Hide off-screen
    hiddenInput.tabIndex = -1;

    // Append to shadowRoot or fallback to host
    (this.shadowRoot ?? this).appendChild(hiddenInput);

    // ✅ Show file picker when this element is clicked
    this.addEventListener("click", () => {
        hiddenInput.click(); // MUST be called synchronously
    });

    // ✅ Handle file selection
    hiddenInput.addEventListener("change", async () => {
        const file = hiddenInput.files?.[0];
        if (!file) return;

        // Save the file to actionData
        this.actionData[fileVariable] = file;

        // Optional: process file (e.g., preview, upload, etc.)
        await this.actionCb?.();
    });
}
