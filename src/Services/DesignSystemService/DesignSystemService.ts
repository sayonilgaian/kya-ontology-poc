type Theme = Record<string, string>; // e.g., { "p-color": "#fff", ... }
type DesignSystem = Record<string, Theme>; // e.g., { Light: Theme, Dark: Theme }

export class DesignSystemService {
  private _systems: Record<string, DesignSystem> = {};
  private _currentSystem: string | null = null;
  private _currentTheme: string | null = null;
  private _scope: HTMLElement = document.documentElement;

  // Register a design system with multiple themes
  register(systemName: string, themes: DesignSystem): void {
    this._systems[systemName] = themes;
     // Auto-apply first theme if none selected
    if (!this._currentSystem && !this._currentTheme) {
        this.currentSystem = systemName;
        this.currentTheme = Object.keys(themes)[0]; // e.g., "Light"
    }
  }

  // Getter & Setter for current design system
  get currentSystem(): string | null {
    return this._currentSystem;
  }

  set currentSystem(systemName: string | null) {
    if (systemName && !this._systems[systemName]) {
      console.warn(`System "${systemName}" does not exist`);
      return;
    }
    this._currentSystem = systemName;
  }

  // Getter & Setter for current theme
  get currentTheme(): string | null {
    return this._currentTheme;
  }

  set currentTheme(themeName: string | null) {
    if (!this._currentSystem || !themeName) {
      console.warn(`Cannot set theme without a current system`);
      return;
    }

    const system = this._systems[this._currentSystem];
    const theme = system[themeName];

    if (!theme) {
      console.warn(`Theme "${themeName}" not found in system "${this._currentSystem}"`);
      return;
    }

    this.clearCurrentVariables();

    for (const [key, value] of Object.entries(theme)) {
      this.setCSSVar(key, value);
    }

    this._currentTheme = themeName;
  }

  // Set a CSS variable on the DOM
  setCSSVar(name: string, value: string): void {
    if (!name.startsWith("--")) name = `--${name}`;
    this._scope.style.setProperty(name, value);
  }

  updateCssVar(name: string, value: string) {
    this._systems[this._currentSystem ?? ""][this.currentTheme ?? ""][name] = value
  }

  // Get the current value of a CSS variable
  getCSSVar(name: string): string {
    if (!name.startsWith("--")) name = `--${name}`;
    return getComputedStyle(this._scope).getPropertyValue(name).trim();
  }

  // Remove a CSS variable from the DOM
  removeCSSVar(name: string): void {
    if (!name.startsWith("--")) name = `--${name}`;
    this._scope.style.removeProperty(name);
  }

  // Clear current theme variables
  clearCurrentVariables(): void {
    if (!this._currentSystem || !this._currentTheme) return;

    const currentTheme = this._systems[this._currentSystem]?.[this._currentTheme];
    if (!currentTheme) return;

    for (const key of Object.keys(currentTheme)) {
      this.removeCSSVar(key);
    }
  }

  // List all registered design system names
  listSystems(): string[] {
    return Object.keys(this._systems);
  }

  // List all themes for a given system
  listThemes(systemName: string): string[] {
    return Object.keys(this._systems[systemName] || {});
  }

  applyThemeToElement(
    systemName: string,
    themeName: string,
    el: HTMLElement, // still required to resolve context, optional for now
    variableKey?: string | string[]
  ): void {
    const theme = this._systems?.[systemName]?.[themeName];

    if (!theme) {
      console.warn(`Theme not found: "${themeName}" in system "${systemName}"`);
      return;
    }

    const scope = document.documentElement;
    const prefix = `--custom-${systemName.toLowerCase()}-${themeName.toLowerCase()}-`;

    const applyVar = (key: string) => {
      if (key in theme) {
        scope.style.setProperty(`${prefix}${key}`, theme[key]);
      } else {
        console.warn(`Variable "${key}" not found in theme "${themeName}"`);
      }
    };

    if (Array.isArray(variableKey)) {
      variableKey.forEach(applyVar);
    } else if (typeof variableKey === "string") {
      applyVar(variableKey);
    } else {
      Object.entries(theme).forEach(([key, value]) => {
        scope.style.setProperty(`${prefix}${key}`, value);
      });
    }
  }

  getCurrentThemeVariables(): { variableName: string; variableValue: string }[] {
    if (!this._currentSystem || !this._currentTheme) {
      console.warn("No active system or theme set");
      return [];
    }

    const theme = this._systems[this._currentSystem]?.[this._currentTheme];
    if (!theme) return [];

    return Object.entries(theme).map(([variableName, variableValue]) => ({
      variableName,
      variableValue,
    }));
  }

}
