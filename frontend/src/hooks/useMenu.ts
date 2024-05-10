import { useDispatch, useSelector } from "react-redux";

import {
   menuSelector
} from "src/states/redux/menu";

// Import types
import type { AppDispatch } from "src/states/redux";

export const {
  useMenu,
  useMenuState,
  useMenuActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      /**
       * __This function doesn't work yet__
       * 
       * Use this dispatcher to get menu outline.
       */
      getMenuOutlineAsync() {
        // dispatch(getDocumentOutlineAsyncThunk());
      }
    }
  }

  return {
    /**
     * Use this hook to get state of `menu` and dispatchers to manipulate
     * state
     * @returns
     */
    useMenu() {
      const menu = useSelector(menuSelector);
      const dispatch = useDispatch();

      return {
        menu,
        menuDispatcher: createDispatchers(dispatch)
      }
    },

    /**
     * Use this hook to get state of `menu`
     * @returns
     */
    useMenuState() {
      const menu = useSelector(menuSelector);

      return menu;
    },

    /**
     * Use this hook to get dispatchers to manipulate state
     * @returns
     */
    useMenuActions() {
      const dispatch = useDispatch();

      return createDispatchers(dispatch);
    }
  }
})();