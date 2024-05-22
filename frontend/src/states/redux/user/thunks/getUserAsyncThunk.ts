import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getUserAsyncThunk = createAsyncThunk(
  "/getUserAsyncThunk",
  async function(payload: string) {
    const user = await ChainCodeAPI.User.getAsync(payload, undefined);
    return user; 
  }
);