import { openTMI } from "tunangn-react-modal";

export const __SideMenuNames = {
  ContentSide: "content_side_menu",
  NavSide: "nav_side_menu"
}

export function openContentSideMenu() {
  return openTMI(__SideMenuNames.ContentSide);
}

export function openNavSideMenu() {
  return openTMI(__SideMenuNames.NavSide);
}