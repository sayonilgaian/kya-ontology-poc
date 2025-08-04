import { BaseUIElement } from "../../Lib/BaseComponent/baseComponent";

export function importLocalImage(this: BaseUIElement, uploadUrl: string) {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*"; // Restrict to image types only
    input.style.display = "none";

    input.addEventListener("change", async () => {
        const file = input.files?.[0];
        if (file && file.type.startsWith("image/")) {
            const formData = new FormData();
            formData.append("file", file); // use 'file' or whatever your API expects
            const response = await fetch(uploadUrl, {
              method: 'POST',
              body: formData,
              headers: {
                ...this.apiService?.getHeaders()
              }
            });
            const result = await response.json();
            console.log("IMPORT", result);
            return result;
        } else {
            console.warn("Only image files are allowed.");
        }
    });

    document.body.appendChild(input); // append to DOM
    input.click(); // trigger click
    input.remove(); // cleanup
}
