import { createSlice } from "@reduxjs/toolkit";

// Import modal items' util
import { openSnackbar } from "src/components/modal_items/utils";

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

    clearRealEstates(state) {
      state.data = [];
    },

    setRealEstates(state, action) {
      state.data = action.payload;
    },
  },
  extraReducers: function(builder) {
    builder.addCase(getRealEstatesAsyncThunk.fulfilled, function(state, action) {
      if(action.payload && Array.isArray(action.payload))
        state.data = state.data.concat(action.payload);
    });

    builder.addCase(getRealEstateAsyncThunk.fulfilled, function(state, action) {
      console.log("Result: ", action.payload);
      state.current = action.payload;
    });

    builder.addCase(createRealEstateAsyncThunk.fulfilled, function(state) {
      state.data = [];

      openSnackbar({
        headerColor: "success",
        content: "Thêm thông tin bất động sản mới thành công"
      });
    });

    builder.addCase(updateRealEstateAsyncThunk.fulfilled, function(state) {
      state.data = [];

      openSnackbar({
        headerColor: "success",
        content: "Chỉnh sủa thông tin bất động sản thành công"
      });
    });

    builder.addCase(createRealEstateAsyncThunk.rejected, function(_, action) {
      openSnackbar({
        headerColor: "error",
        content: action.payload as string
      });
    });

    builder.addCase(updateRealEstateAsyncThunk.rejected, function(_, action) {
      openSnackbar({
        headerColor: "error",
        content: action.payload as string
      });
    });
  }
});

export const RealEstateActions = RealEstateSlice.actions;

export function realEstateSelector(state: AppState): RealEstateState {
  return state.real_estate;
}