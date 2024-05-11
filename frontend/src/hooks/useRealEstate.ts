import { useDispatch, useSelector } from "react-redux";

// Import selectors
import { realEstateSelector } from "src/states/redux/real_estate";

// Import thunks
import { getRealEstatesAsyncThunk } from "src/states/redux/real_estate/thunks/getRealEstatesAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";

export const {
  useRealEstate,
  useRealEstateState,
  useRealEstateActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      getRealEstatesAsync() {
        dispatch(getRealEstatesAsyncThunk());
      }
    }
  }

  return {
    useRealEstate() {
      const realEstate = useSelector(realEstateSelector);
      const dispatch = useDispatch();

      return {
        realEstate,
        realEstateDispatchers: createDispatchers(dispatch)
      }
    },

    useRealEstateState() {
      const realEstate = useSelector(realEstateSelector);

      return realEstate;
    },

    useRealEstateActions() {
      const dispatch = useDispatch();

      return createDispatchers(dispatch);
    }
  }
})();