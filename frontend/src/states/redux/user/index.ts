import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getUserAsyncThunk } from "./thunks/getUserAsyncThunk";

// Import types
import type { Chaincode_Admin } from "src/apis/chaincode/types";
import type { AppState } from "..";

type UserState = {
  data: Chaincode_Admin | null;
  isAuthenticated: boolean;
}

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    isAuthenticated: false
  } as UserState,
  reducers: {

  },
  extraReducers: function(builder) {
    builder.addCase(getUserAsyncThunk.fulfilled, function(state, action) {
      state.data = action.payload;
      state.isAuthenticated = true;
    });

    builder.addCase(getUserAsyncThunk.rejected, function(state, action) {
      state.isAuthenticated = false;
    });
  }
});

export function userSelector(state: AppState): UserState {
  return state.user;
}