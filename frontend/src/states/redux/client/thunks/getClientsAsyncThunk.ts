import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getClientsAsyncThunk = createAsyncThunk(
  "/getClientsAsyncThunk",
  async function() {
    return ChainCodeAPI.Client.getMultipleAsync();
  }
);