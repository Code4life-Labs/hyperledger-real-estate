/*
  IDEA
  This `Theme` will be used with tailwindcss, there are 2 steps we need to do:
    - Define theme and import to `tailwind.config.ts` for building.
    - Use this `Theme` to change theme in app.

  Depend on theme's concept of tailwind, we need to defined each color has themes and `DEFAULT` value
  of it, for example:
  ```
  colors: {
    primary: {
      "light": "#FFF", // Light theme
      "dark": "#2626262", // Dark theme
      "DEFAULT": "#F1F1F1" // Optional
    }
  }
  ```
*/

const __AllowedThemeSchemes = ["light", "dark"] as const;

export const __ThemePropertyNames = {
  primary: "primary",
  onPrimary: "on-primary",
  // secondary: string,
  // onSecondary: string,
  // tertiary: string,
  // onTertiary: string,
  outline: "outline",
  onOutline: "on-outline",
  // subOutline: string,
  // onSubOutline: string,
  background: "background",
  onBackground: "on-background",
  // subBackground: string,
  // onSubBackground: string,
  // success?: string,
  // onSuccess?: string,
  // error?: string,
  // onError?: string,
  // waring?: string,
  // onWarning?: string,
  // info?: string,
  // onInfo?: string
}

/**
 * Create an instance to manage theme in app. Be set up with tailwind in compile-time.
 */
export class Theme {
  name!: string;
  colors!: {[N in ThemePropertyNames]: string};
  themeSchemeCSSClasses!: Array<string>;
  initializedStyleContent!: string;

  static currentTheme: string = "";
  static initializedThemePropertyVariablesContent: string = ":root { }";
  static isThemePropertyVariablesInitialized: boolean = false;

  constructor(name: string) {
    this.name = name;
    (this.colors as any) = {};
    this.themeSchemeCSSClasses = [];
  }

  /**
   * Use this method to use theme
   * @param themeName 
   */
  enable(themeScheme: typeof __AllowedThemeSchemes[number]) {
    if(!document.getElementById(this.name)) {
      console.error(`The theme [${this.name}] isn't installed`);
      return;
    }

    const themeSchemeClassName = Theme.getHTMLSchemeClassName(this.name, themeScheme);

    if(document.documentElement.classList.contains(themeSchemeClassName)) return;
    if(document.documentElement.classList.contains(Theme.currentTheme))
      document.documentElement.classList.remove(Theme.currentTheme);

    document.documentElement.classList.add(themeSchemeClassName);
    Theme.currentTheme = themeSchemeClassName;
  }

  /**
   * Use this static method to create CSS class name for theme scheme with
   * format `<theme's name>-<theme scheme's name>`
   * @param theme 
   * @param themeScheme 
   */
  static getHTMLSchemeClassName(theme: Theme | string, themeScheme: string) {
    if(typeof theme === "string") return `${theme}-${themeScheme}`;
    return `${theme.name}-${themeScheme}`;
  }

  /**
   * Use this static method to create CSS class name for theme scheme with
   * format `.<theme's name>-<theme scheme's name>`
   * @param theme 
   * @param themeScheme 
   */
  static getSchemeClassName(theme: Theme | string, themeScheme: string) {
    if(typeof theme === "string") return `.${theme}-${themeScheme}`;
    return `.${theme.name}-${themeScheme}`;
  }

  /**
   * Use this static method to get a set of CSS Variables Template to set up in
   * `tailwind.config.ts`
   */
  static getTailwindColorsTheme() {
    const result: {[K: string]: {[N: string]: string}} = {};
    for(const key in __ThemePropertyNames) {
      const actualName = __ThemePropertyNames[key as keyof typeof __ThemePropertyNames];
      const cssVariableName = `--color-${actualName}`;

      // RGB will be used, because it's more flexible than HEX
      for(let i = 0; i <= 100; i += 10) {
        if(!result[actualName]) result[actualName] = {};
        if(i === 100) {
          result[actualName]["DEFAULT"] = `rgba(var(${cssVariableName}), ${i / 100})`;
          continue;
        }
        result[actualName][i] = `rgba(var(${cssVariableName}), ${i / 100})`;
      }
    }
    return result;
  }

  /**
   * Use this static method to set theme colors. It receives a array of string theme's property that has the
   * following format: `<name>:<value of color in theme 1>:...:<value of color in theme n>`, the order of
   * __value of color in theme__ depends on `themeNames`.
   * 
   * This will create a `<style>` and an `colors` object.
   * @param colorStrs 
   */
  static setTheme(theme: Theme, colorStrs: Array<string>) {
    // Generate content for <style>
    // and generate colors object for tailwind
    for(const str of colorStrs) {
      const [name, ...values] = str.split(":");
      if(!__ThemePropertyNames[name as keyof typeof __ThemePropertyNames]) continue;
      if(values.length === 0) continue;
      let i = 0;
      for(const themeScheme of __AllowedThemeSchemes) {
        if(!values[i]) continue;

        const actualName = __ThemePropertyNames[name as ThemePropertyNames] as ThemePropertyNames;

        if(!actualName) {
          console.error(`The name - ${name} that you assigned isn't a valid name`);
          continue;
        }
        if(!theme.colors[actualName]) (theme.colors[actualName] as any) = {};
        if(!theme.themeSchemeCSSClasses[i]) theme.themeSchemeCSSClasses[i] = `${Theme.getSchemeClassName(theme, themeScheme)} { }`;

        const cssVariableName = `--color-${actualName}`;

        // RGB will be used, because it's more flexible than HEX
        theme.colors[actualName] = `var(${cssVariableName})`;

        // Add content to <style>
        theme.themeSchemeCSSClasses[i] = theme.themeSchemeCSSClasses[i].slice(0, theme.themeSchemeCSSClasses[i].length - 1);
        theme.themeSchemeCSSClasses[i] = theme.themeSchemeCSSClasses[i] + cssVariableName + ": " + values[i] + "; }";

        if(!Theme.initializedThemePropertyVariablesContent) {
          Theme.initializedThemePropertyVariablesContent
            = Theme.initializedThemePropertyVariablesContent.slice(0, Theme.initializedThemePropertyVariablesContent.length - 1);
          Theme.initializedThemePropertyVariablesContent
            = Theme.initializedThemePropertyVariablesContent + cssVariableName + ": " + values[i] + "; }";
        }
        i++;
      }
      i = 0;
    }
  }

  static initializeCSSVariables() {
    if(Theme.isThemePropertyVariablesInitialized) return;

    const headElement = document.getElementsByTagName("head")[0];
    const themeStyleElement = document.createElement("style");
    themeStyleElement.id = "__theme__";
    themeStyleElement.append(Theme.initializedThemePropertyVariablesContent);
    headElement.appendChild(themeStyleElement);
  }

  static install(theme: Theme) {
    if(!document.getElementById(theme.name)) {
      const headElement = document.getElementsByTagName("head")[0];
      const themeStyleElement = document.createElement("style");
      themeStyleElement.id = theme.name;
      themeStyleElement.append(...theme.themeSchemeCSSClasses);
      headElement.appendChild(themeStyleElement);
    }
  }
}

export type ThemePropertyNames = keyof typeof __ThemePropertyNames;
export type ThemeData = {
  colors: {[N in ThemePropertyNames]: string};
  styleContent: Array<string>;
  initializedStyleContent: string;
}