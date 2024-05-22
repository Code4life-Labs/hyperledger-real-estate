import { createSlice } from "@reduxjs/toolkit";

// Import modal items' util
import { openSnackbar } from "src/components/modal_items/utils";

// Import thunks
import { getUserAsyncThunk } from "./thunks/getUserAsyncThunk";
import { getUsersAsyncThunk } from "./thunks/getUsersAyncThunk";
import { authorizeUserAsyncThunk } from "./thunks/authorizeUserAsyncThunk";

// Import types
import type { Chaincode_User } from "src/apis/chaincode/types";
import type { AppState } from "..";

type UserState = {
  data: Chaincode_User | null;
  current: Chaincode_User | null;
  list: Array<Chaincode_User>;
  role: string | null;
  isAuthorized: boolean;
  isAuthorizing: boolean;
}

export const UserSlice = createSlice({
  name: "user",
  initialState: {
    data: null,
    current: null,
    list: [],
    role: null,
    isAuthorized: false,
    isAuthorizing: false
  } as UserState,
  reducers: {
    reset(state) {
      state.data = null;
      state.role = null;
      state.isAuthorized = false;
      state.isAuthorizing = false;
    },

    clearCurrentUser(state) {
      state.current = null;
    }
  },
  extraReducers: function(builder) {
    builder.addCase(authorizeUserAsyncThunk.fulfilled, function(state, action) {      
      state.data = action.payload;
      state.role = action.payload.role;
      state.isAuthorized = true;
      state.isAuthorizing = false;

      openSnackbar({
        headerColor: "success",
        content: "Đăng nhập thành công"
      });
    });

    builder.addCase(authorizeUserAsyncThunk.pending, function(state, action) {
      state.isAuthorizing = true;
    });

    builder.addCase(authorizeUserAsyncThunk.rejected, function(state, action) {      
      state.role = null;
      state.isAuthorized = false;
      state.isAuthorizing = false;

      openSnackbar({
        headerColor: "error",
        content: action.payload as string
      });
    });

    builder.addCase(getUserAsyncThunk.fulfilled, function(state, action) {
      state.current = action.payload;
    });

    builder.addCase(getUsersAsyncThunk.fulfilled, function(state, action) {
      if(state.list.length === 0) state.list = action.payload;
      else state.list = state.list.concat(action.payload);
    });
  }
});

export const UserActions = UserSlice.actions;

export function userSelector(state: AppState): UserState {
  return state.user;
}