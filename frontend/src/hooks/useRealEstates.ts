import { useDispatch, useSelector } from "react-redux";

// Import selectors
import { realEstatesSelector } from "src/states/redux/real_estates";

// Import thunks
import { getRealEstatesAsyncThunk } from "src/states/redux/real_estates/thunks/getRealEstatesAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";

export const {
  useRealEstates,
  useRealEstatesState,
  useRealEstatesActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      /**
       * __This function doesn't work yet__
       * 
       * Use this dispatcher to get menu outline.
       */
      getRealEstatesAsync() {
        dispatch(getRealEstatesAsyncThunk());
      }
    }
  }

  return {
    /**
     * Use this hook to get state of `menu` and dispatchers to manipulate
     * state
     * @returns
     */
    useRealEstates() {
      const realEstates = useSelector(realEstatesSelector);
      const dispatch = useDispatch();

      return {
        realEstates,
        realEstatesDispatcher: createDispatchers(dispatch)
      }
    },

    /**
     * Use this hook to get state of `menu`
     * @returns
     */
    useRealEstatesState() {
      const realEstates = useSelector(realEstatesSelector);

      return realEstates;
    },

    /**
     * Use this hook to get dispatchers to manipulate state
     * @returns
     */
    useRealEstatesActions() {
      const dispatch = useDispatch();

      return createDispatchers(dispatch);
    }
  }
})();