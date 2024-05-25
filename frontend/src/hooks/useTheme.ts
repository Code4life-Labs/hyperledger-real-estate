import { useDispatch, useSelector } from "react-redux";

// Import actions
import { ThemeActions } from "src/states/redux/theme";

// Import selectors
import { themeSelector } from "src/states/redux/theme";

// Import types
import type { AppDispatch } from "src/states/redux";

export const {
  useTheme,
  useThemeActions,
  useThemeState
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      changeScheme(scheme: string) {
        dispatch(ThemeActions.enableScheme(scheme));
      },

      changeTheme(themeName: string) {
        dispatch(ThemeActions.enableTheme(themeName));
      }
    }
  }

  return {
    useTheme() {
      let theme = useSelector(themeSelector);
      let themeDispatchers = createDispatchers(useDispatch());
      return { theme, themeDispatchers };
    },

    useThemeActions() {
      return createDispatchers(useDispatch());
    },

    useThemeState() {
      return useSelector(themeSelector);
    }
  }
})();