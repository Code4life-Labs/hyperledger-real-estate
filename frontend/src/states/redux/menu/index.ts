import { createSlice } from "@reduxjs/toolkit";

// Import thunks

// Import assets
import MenuOutlineData from "src/assets/management_menu.json";

// Import types
import type { OutlineData } from "src/types/general";
import type { AppState } from "..";

type MenuState = {
  outline: Array<OutlineData>
}

export const MenuSlice = createSlice({
  name: "menu",
  initialState: {
    outline: MenuOutlineData.data
  } as MenuState,
  reducers: {}
});

export function menuSelector(state: AppState):  MenuState {
  return state.menu;
}