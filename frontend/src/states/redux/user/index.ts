import { createSlice } from "@reduxjs/toolkit";

// Import modal items' util
import { openSnackbar } from "src/components/modal_items/utils";

// Import thunks
import { getUserAsyncThunk } from "./thunks/getUserAsyncThunk";

// Import types
import type { Chaincode_User } from "src/apis/chaincode/types";
import type { AppState } from "..";

type UserState = {
  data: Chaincode_User | null;
  role: string | null;
  isAuthenticated: boolean;
  isGettingData: boolean;
}

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    role: null,
    isAuthenticated: false,
    isGettingData: false
  } as UserState,
  reducers: {
    reset(state) {
      state.data = null;
      state.role = null;
      state.isAuthenticated = false;
      state.isGettingData = false;
    }
  },
  extraReducers: function(builder) {
    builder.addCase(getUserAsyncThunk.fulfilled, function(state, action) {      
      state.data = action.payload;
      state.role = action.payload.role;
      state.isAuthenticated = true;
      state.isGettingData = false;

      openSnackbar({
        headerColor: "success",
        content: "Đăng nhập thành công"
      });
    });

    builder.addCase(getUserAsyncThunk.pending, function(state, action) {
      state.isGettingData = true;
    });

    builder.addCase(getUserAsyncThunk.rejected, function(state, action) {      
      state.role = null;
      state.isAuthenticated = false;
      state.isGettingData = false;

      openSnackbar({
        headerColor: "error",
        content: action.payload as string
      });
    });
  }
});

export const UserActions = UserSlice.actions;

export function userSelector(state: AppState): UserState {
  return state.user;
}