// Import objects
import { Theme } from "src/objects/Theme";

export const NormalTheme = new Theme("normal");

const __ColorsSchemes = [
  "primary:15, 24, 42:213, 223, 243",
  "onPrimary:250, 250, 250:54, 59, 70",
  "background:249, 249, 249:38, 38, 38",
  "onBackground:38, 38, 38:249, 249, 249",
  "outline:196, 181, 253:78, 69, 111",
  "onOutline:38, 37, 45:237, 237, 237",
  "error:235, 64, 52:176, 36, 26",
  "onError:245, 245, 245:245, 245, 245",
  "success:49, 222, 55:27, 161, 32",
  "onSuccess:245, 245, 245:245, 245, 245",
  "warning:252, 204, 68:191, 146, 21",
  "onWarning:245, 245, 245:245, 245, 245",
  "info:62, 120, 194:12, 67, 138",
  "onInfo:245, 245, 245:245, 245, 245"
]

// Set theme
Theme.setTheme(NormalTheme, __ColorsSchemes);