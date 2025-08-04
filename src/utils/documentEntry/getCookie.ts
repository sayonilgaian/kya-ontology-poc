export default function getCookie(key: string): string | null {
    const name = encodeURIComponent(key) + '=';
    const parts = document.cookie.split(';');
    for (let part of parts) {
        part = part.trim();
        if (part.startsWith(name)) {
            return decodeURIComponent(part.slice(name.length));
        }
    }
    return null;
}