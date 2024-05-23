import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getRealEstatesAsyncThunk } from "./thunks/getRealEstatesAsyncThunk";
import { getRealEstateAsyncThunk } from "./thunks/getRealEstateAsyncThunk";

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
  }
});

export const RealEstateActions = RealEstateSlice.actions;

export function realEstateSelector(state: AppState): RealEstateState {
  return state.real_estate;
}