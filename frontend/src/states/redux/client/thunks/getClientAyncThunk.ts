import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getClientAsyncThunk = createAsyncThunk(
  "/getClientAsyncThunk",
  async function(id: string) {
    return ChainCodeAPI.Client.getAsync(id);
  }
);