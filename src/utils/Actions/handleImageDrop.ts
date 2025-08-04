import { BaseUIElement } from '../../Lib/BaseComponent/baseComponent';

export function handleImageDrop(this: BaseUIElement, e: DragEvent) {
    e.preventDefault();
    e.stopPropagation();

    const items = Array.from(e.dataTransfer?.items ?? []);
    for (const item of items) {
        if (item.kind === 'file') {
            const file = item.getAsFile();
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = () => {
                    const dataUrl = reader.result as string;
                    console.log('Dropped image:', file.name);
                    console.log('Data URL:', dataUrl);

                    // Example: Set as attribute or state if needed
                    // this.setAttribute('image-src', dataUrl);
                };
                reader.readAsDataURL(file);
                return; // only take the first valid image
            }
        }
    }

    console.warn('No valid image found in dropped items.');
}
