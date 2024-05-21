import { openTMI } from "tunangn-react-modal";

// Import types
import type { SnackbarData } from "./Snackbar";

export const __ModalItemNames = {
  ContentSide: "content_side_menu",
  NavSide: "nav_side_menu",
  Snackbar: "my_snackbar"
}

export function openContentSideMenu() {
  return openTMI(__ModalItemNames.ContentSide);
}

export function openNavSideMenu() {
  return openTMI(__ModalItemNames.NavSide);
}

export function openSnackbar(data: SnackbarData) {
  return openTMI(__ModalItemNames.Snackbar, data);
}