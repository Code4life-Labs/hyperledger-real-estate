import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getRealEstatesAsyncThunk } from "./thunks/getRealEstatesAsyncThunk";

// Import types
import type { RealEstateData } from "src/apis/chaincode/realEstate";
import type { AppState } from "..";

type RealEstatesState = {
  data: Array<RealEstateData>
}

export const RealEstatesSlice = createSlice({
  name: "real_estates",
  initialState: {
    data: []
  } as RealEstatesState,
  reducers: {

  },
  extraReducers: function(builder) {
    builder.addCase(getRealEstatesAsyncThunk.fulfilled, function(state, action) {
      state.data = state.data.concat(action.payload);
    });
  }
});

export function realEstatesSelector(state: AppState):  RealEstatesState {
  return state.real_estates;
}