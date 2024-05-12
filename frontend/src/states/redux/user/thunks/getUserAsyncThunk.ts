import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getUserAsyncThunk = createAsyncThunk(
  "/getUserAsyncThunk",
  async function(id: string) {
    return ChainCodeAPI.Admin.getAsync(id);
  }
);