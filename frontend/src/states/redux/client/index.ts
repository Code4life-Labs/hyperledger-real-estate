import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getClientsAsyncThunk } from "./thunks/getClientsAsyncThunk";

// Import types
import type { Chaincode_Client } from "src/apis/chaincode/types";
import type { AppState } from "..";

type ClientState = {
  data: Array<Chaincode_Client>
}

export const ClientSlice = createSlice({
  name: "client",
  initialState: {
    data: []
  } as ClientState,
  reducers: {

  },
  extraReducers: function(builder) {
    builder.addCase(getClientsAsyncThunk.fulfilled, function(state, action) {
      state.data = state.data.concat(action.payload);
    });
  }
});

export function clientSelector(state: AppState): ClientState {
  return state.client;
}