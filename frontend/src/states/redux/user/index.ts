import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getUserAsyncThunk } from "./thunks/getUserAsyncThunk";

// Import types
import type { Chaincode_Admin } from "src/apis/chaincode/types";
import type { AppState } from "..";

type UserState = {
  data: Chaincode_Admin | null
}

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: null
  } as UserState,
  reducers: {

  },
  extraReducers: function(builder) {
    builder.addCase(getUserAsyncThunk.fulfilled, function(state, action) {
      state.data = action.payload;
    });
  }
});

export function userSelector(state: AppState): UserState {
  return state.user;
}