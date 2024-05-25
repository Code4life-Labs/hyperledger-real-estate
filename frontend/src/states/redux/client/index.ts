import { createSlice } from "@reduxjs/toolkit";

// Import modal items' util
import { openSnackbar } from "src/components/modal_items/utils";

// Import thunks
import { getClientAsyncThunk } from "./thunks/getClientAyncThunk";
import { getClientsAsyncThunk } from "./thunks/getClientsAsyncThunk";
import { createClientAsyncThunk } from "./thunks/createClientAsyncThunk";
import { updateClientAsyncThunk } from "./thunks/updateClientAsyncThunk";

// Import types
import type { Chaincode_Client } from "src/apis/chaincode/types";
import type { AppState } from "..";

type ClientState = {
  data: Array<Chaincode_Client>;
  current: Chaincode_Client | null;
}

export const ClientSlice = createSlice({
  name: "client",
  initialState: {
    data: [],
    current: null
  } as ClientState,
  reducers: {
    clearCurrentClient(state) {
      state.current = null;
    },

    clearClients(state) {
      state.data = [];
    },

    setClients(state, action) {
      state.data = action.payload;
    }
  },
  extraReducers: function(builder) {
    builder.addCase(getClientsAsyncThunk.fulfilled, function(state, action) {
      state.data = state.data.concat(action.payload);
    });

    builder.addCase(getClientAsyncThunk.fulfilled, function(state, action) {
      state.current = action.payload;
    });

    builder.addCase(createClientAsyncThunk.fulfilled, function(state) {
      state.data = [];

      openSnackbar({
        headerColor: "success",
        content: "Đăng ký khách hàng mới thành công"
      });
    });

    builder.addCase(updateClientAsyncThunk.fulfilled, function(state) {
      state.data = [];

      openSnackbar({
        headerColor: "success",
        content: "Chỉnh sửa thông tin khách hàng mới thành công"
      });
    });

    builder.addCase(createClientAsyncThunk.rejected, function(_, action) {
      openSnackbar({
        headerColor: "error",
        content: action.payload as string
      });
    });

    builder.addCase(updateClientAsyncThunk.rejected, function(_, action) {
      openSnackbar({
        headerColor: "error",
        content: action.payload as string
      });
    });
  }
});

export const ClientActions = ClientSlice.actions;

export function clientSelector(state: AppState): ClientState {
  return state.client;
}