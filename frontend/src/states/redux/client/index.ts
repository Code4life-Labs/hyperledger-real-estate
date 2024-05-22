import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getClientAsyncThunk } from "./thunks/getClientAyncThunk";
import { getClientsAsyncThunk } from "./thunks/getClientsAsyncThunk";

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
    }
  },
  extraReducers: function(builder) {
    builder.addCase(getClientsAsyncThunk.fulfilled, function(state, action) {
      state.data = state.data.concat(action.payload);
    });

    builder.addCase(getClientAsyncThunk.fulfilled, function(state, action) {
      state.current = action.payload;
    });
  }
});

export const ClientActions = ClientSlice.actions;

export function clientSelector(state: AppState): ClientState {
  return state.client;
}