import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getRealEstatesAsyncThunk } from "./thunks/getRealEstatesAsyncThunk";
import { getRealEstateAsyncThunk } from "./thunks/getRealEstateAsyncThunk";
import { createRealEstateAsyncThunk } from "./thunks/createRealEstateAsyncThunk";
import { updateRealEstateAsyncThunk } from "./thunks/updateRealEstateAsyncThunk";

// Import types
import type {
  Chaincode_RealEstate_AppData,
  Chaincode_RealEstate_ResponsedData
} from "src/apis/chaincode/types";
import type { AppState } from "..";

type RealEstateState = {
  data: Array<Chaincode_RealEstate_ResponsedData>;
  current: Chaincode_RealEstate_AppData | null;
}

export const RealEstateSlice = createSlice({
  name: "real_estate",
  initialState: {
    data: [],
    current: null
  } as RealEstateState,
  reducers: {
    clearCurrentRealEstate(state) {
      state.current = null;
    },

    setRealEstates(state, action) {
      state.data = action.payload;
    }
  },
  extraReducers: function(builder) {
    builder.addCase(getRealEstatesAsyncThunk.fulfilled, function(state, action) {
      state.data = state.data.concat(action.payload);
    });

    builder.addCase(getRealEstateAsyncThunk.fulfilled, function(state, action) {
      console.log("Result: ", action.payload);
      state.current = action.payload;
    });

    builder.addCase(createRealEstateAsyncThunk.fulfilled, function(state, action) {
      state.data.unshift(action.payload);
    });

    builder.addCase(updateRealEstateAsyncThunk.fulfilled, function(state, action) {
      let needToUpdateRealEstate = state.data.find(user => user._id === action.payload._id);
      needToUpdateRealEstate = Object.assign(needToUpdateRealEstate as any, action.payload);
    });
  }
});

export const RealEstateActions = RealEstateSlice.actions;

export function realEstateSelector(state: AppState): RealEstateState {
  return state.real_estate;
}