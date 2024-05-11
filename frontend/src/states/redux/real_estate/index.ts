import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getRealEstatesAsyncThunk } from "./thunks/getRealEstatesAsyncThunk";

// Import types
import type { Chaincode_RealEstate } from "src/apis/chaincode/types";
import type { AppState } from "..";

type RealEstateState = {
  data: Array<Chaincode_RealEstate>
}

export const RealEstateSlice = createSlice({
  name: "real_estate",
  initialState: {
    data: []
  } as RealEstateState,
  reducers: {

  },
  extraReducers: function(builder) {
    builder.addCase(getRealEstatesAsyncThunk.fulfilled, function(state, action) {
      state.data = state.data.concat(action.payload);
    });
  }
});

export function realEstateSelector(state: AppState): RealEstateState {
  return state.real_estate;
}