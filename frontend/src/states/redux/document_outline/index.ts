import { createSlice } from "@reduxjs/toolkit";

// Import thunks
import { getDocumentOutlineAsyncThunk } from "./thunks/getDocumentOutlineAsyncThunk";

// Import types
import type { DocumentOutlineData } from "src/apis/docs";
import type { AppState } from "..";

type DocumentOutlineState = {
  data: Array<DocumentOutlineData>
}

/**
 * State of player. This slice store only the main player, another player will
 * be store in game, sync with game.
 */
export const DocumentOutlineSlice = createSlice({
  name: "document_outline",
  initialState: {
    data: []
  } as DocumentOutlineState,
  reducers: {},
  
  extraReducers: function(builder) {
    builder.addCase(getDocumentOutlineAsyncThunk.fulfilled, function(state, action) {
      state.data = action.payload;
    });
  }
});

export function documentOutlineSelector(state: AppState): DocumentOutlineState {
  return state.document_outline;
}