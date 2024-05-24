import { useDispatch, useSelector } from "react-redux";

// Import actions
import { RealEstateActions } from "src/states/redux/real_estate";

// Import selectors
import { realEstateSelector } from "src/states/redux/real_estate";

// Import thunks
import { getRealEstateAsyncThunk } from "src/states/redux/real_estate/thunks/getRealEstateAsyncThunk";
import { getRealEstatesAsyncThunk } from "src/states/redux/real_estate/thunks/getRealEstatesAsyncThunk";
import { createRealEstateAsyncThunk } from "src/states/redux/real_estate/thunks/createRealEstateAsyncThunk";
import { updateRealEstateAsyncThunk } from "src/states/redux/real_estate/thunks/updateRealEstateAsyncThunk";

// Import types
import type { AppDispatch } from "src/states/redux";
import type { Chaincode_RealEstate_ResponsedData } from "src/apis/chaincode/types";

export const {
  useRealEstate,
  useRealEstateState,
  useRealEstateActions
} = (function() {
  const createDispatchers = function(dispatch: AppDispatch) {
    return {
      getRealEstatesAsync(limit: number, skip: number) {
        dispatch(getRealEstatesAsyncThunk({ limit, skip }));
      },

      getRealEstateAsync(id: string) {
        dispatch(getRealEstateAsyncThunk(id));
      },

      clearCurrentRealEstate() {
        dispatch(RealEstateActions.clearCurrentRealEstate());
      },

      setRealEstates(data: Array<Chaincode_RealEstate_ResponsedData>) {
        dispatch(RealEstateActions.setRealEstates(data));
      },

      createRealEstateAsyncThunk(data: Chaincode_RealEstate_ResponsedData) {
        dispatch(createRealEstateAsyncThunk(data));
      },

      updateRealEstateAsyncThunk(data: Partial<Chaincode_RealEstate_ResponsedData>) {
        dispatch(updateRealEstateAsyncThunk(data));
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