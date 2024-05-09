// Import objects
import { Theme } from "src/objects/Theme";

export const NormalTheme = new Theme("normal");

const __ColorsSchemes = [
  "primary:15, 24, 42:213, 223, 243",
  "onPrimary:250, 250, 250:54, 59, 70",
  "background:249, 249, 249:38, 38, 38",
  "onBackground:38, 38, 38:249, 249, 249",
  "outline:196, 181, 253:78, 69, 111",
  "onOutline:38, 37, 45:237, 237, 237"
]

// Set theme
Theme.setTheme(NormalTheme, __ColorsSchemes);