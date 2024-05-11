import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getAdminsAsyncThunk } from "./thunks/getAdminsAsyncThunk";

// Import types
import type { Chaincode_Admin } from "src/apis/chaincode/types";
import type { AppState } from "..";

type AdminState = {
  data: Array<Chaincode_Admin>
}

export const AdminSlice = createSlice({
  name: "admin",
  initialState: {
    data: []
  } as AdminState,
  reducers: {

  },
  extraReducers: function(builder) {
    builder.addCase(getAdminsAsyncThunk.fulfilled, function(state, action) {
      state.data = state.data.concat(action.payload);
    });
  }
});

export function adminSelector(state: AppState): AdminState {
  return state.admin;
}