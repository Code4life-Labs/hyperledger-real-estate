import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getRealEstatesAsyncThunk } from "./thunks/getRealEstatesAsyncThunk";
import { getRealEstateAsyncThunk } from "./thunks/getRealEstateAsyncThunk";

// Import types
import type { Chaincode_RealEstate } from "src/apis/chaincode/types";
import type { AppState } from "..";

type RealEstateState = {
  data: Array<Chaincode_RealEstate>;
  current: Chaincode_RealEstate | null;
}

export const RealEstateSlice = createSlice({
  name: "real_estate",
  initialState: {
    data: [],
    current: null
  } as RealEstateState,
  reducers: {

  },
  extraReducers: function(builder) {
    builder.addCase(getRealEstatesAsyncThunk.fulfilled, function(state, action) {
      state.data = state.data.concat(action.payload);
    });

    builder.addCase(getRealEstateAsyncThunk.fulfilled, function(state, action) {
      state.current = action.payload;
    });
  }
});

export function realEstateSelector(state: AppState): RealEstateState {
  return state.real_estate;
}