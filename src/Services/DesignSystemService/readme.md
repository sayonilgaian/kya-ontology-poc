# 🎨 DesignSystemService

A lightweight and extensible **TypeScript service** for managing multiple **design systems** and **themes**, applying them globally or generating CSS custom properties (`--variables`) with a flexible naming convention.

---

## 🚀 Features

- Register multiple design systems, each with multiple themes.
- Apply a full theme to the global scope (`document.documentElement`).
- Auto-generate CSS variables with custom prefixes (`--custom-core-dark-p-color`).
- Query, update, or remove individual CSS variables.
- List available systems and themes.

---

## 📦 Installation

Just copy the `DesignSystemService.ts` file into your project.

No dependencies required.

---

## 🔧 Type Definitions

```ts
type Theme = Record<string, string>; // e.g., { "p-color": "#fff", ... }
type DesignSystem = Record<string, Theme>; // e.g., { Light: Theme, Dark: Theme }
```

---

## 🧱 Class Overview

```ts
const themeService = new DesignSystemService();
```

---

## 🛠 API Reference

### `register(systemName: string, themes: DesignSystem): void`

Registers a design system with multiple named themes.

```ts
themeService.register("Core", {
  Light: {
    "p-color": "#ffffff",
    "bg-color": "#f9fafb"
  },
  Dark: {
    "p-color": "#000000",
    "bg-color": "#1a1a1a"
  }
});
```

---

### `currentSystem: string | null`

Gets or sets the currently active design system.

```ts
themeService.currentSystem = "Core";
```

---

### `currentTheme: string | null`

Gets or sets the active theme from the current system. When set, it applies the theme's CSS variables globally.

```ts
themeService.currentTheme = "Dark"; // Applies "Core > Dark"
```

---

### `setCSSVar(name: string, value: string): void`

Sets a CSS variable on the global scope (`document.documentElement`).

```ts
themeService.setCSSVar("p-color", "#e91e63"); // --p-color: #e91e63;
```

---

### `getCSSVar(name: string): string`

Reads the computed value of a CSS variable.

```ts
const color = themeService.getCSSVar("p-color"); // → "#e91e63"
```

---

### `removeCSSVar(name: string): void`

Removes a CSS variable from the DOM.

```ts
themeService.removeCSSVar("p-color"); // Removes --p-color
```

---

### `clearCurrentVariables(): void`

Removes all the currently applied variables from the active theme.

---

### `listSystems(): string[]`

Returns an array of registered design system names.

```ts
themeService.listSystems(); // → ["Core"]
```

---

### `listThemes(systemName: string): string[]`

Returns an array of theme names for a given design system.

```ts
themeService.listThemes("Core"); // → ["Light", "Dark"]
```

---

### `applyThemeToElement(systemName: string, themeName: string, el: HTMLElement, variableKey?: string | string[]): void`

Applies variables from a specific system + theme to the **global scope**, optionally filtering only specific keys.

The generated variables follow the format:
```
--custom-<system>-<theme>-<key>
```

#### 🔹 Apply all variables globally:

```ts
themeService.applyThemeToElement("Core", "Dark", someElement);
```

Generates:
```css
--custom-core-dark-p-color: #000000;
--custom-core-dark-bg-color: #1a1a1a;
```

#### 🔹 Apply specific variables only:

```ts
themeService.applyThemeToElement("Core", "Dark", someElement, ["p-color"]);
```

Generates:
```css
--custom-core-dark-p-color: #000000;
```

---

## 🧠 Best Practices

- Use `--custom-<designSystem>-<theme>-<var>` CSS variable naming when referencing scoped tokens.
- Set `currentSystem` and `currentTheme` early in app initialization.
- When creating components dynamically, use `applyThemeToElement()` to generate global tokens before referencing.

---

## 🧪 Example: CSS Token Usage

```css
.my-button {
  color: var(--custom-core-dark-p-color);
  background-color: var(--custom-core-dark-bg-color);
}
```

---

## 📄 License

MIT – free to use, modify, and distribute.

