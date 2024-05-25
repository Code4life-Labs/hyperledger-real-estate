import { createSlice } from "@reduxjs/toolkit";

// Import themes
import { NormalTheme } from "src/themes/normal";
import { AdminTheme } from "src/themes/admin";

// Import types
import type { AppState } from "..";

type ThemeState = {
  currentTheme: string;
  currentScheme: string;
}

function _enableTheme(themeName: string, scheme: string) {
  switch(themeName) {
    case AdminTheme.name: {
      AdminTheme.enable(scheme as any);
      break;
    }

    case NormalTheme.name:
    default: {
      NormalTheme.enable(scheme as any);
      break;
    }
  }
}

export const ThemeSlice = createSlice({
  name: "theme",
  initialState: {
    currentScheme: "light",
    currentTheme: NormalTheme.name
  } as ThemeState,
  reducers: {
    enableScheme(state, action) {
      state.currentScheme = action.payload;

      // Enable theme
      _enableTheme(state.currentTheme, state.currentScheme);
    },

    enableTheme(state, action) {
      state.currentTheme = action.payload;

      // Enable theme
      _enableTheme(state.currentTheme, state.currentScheme);
    }
  }
});

export const ThemeActions = ThemeSlice.actions;

export function themeSelector(state: AppState) {
  return state.theme;
}