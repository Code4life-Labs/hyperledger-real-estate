import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const verifyTokenAsyncThunk = createAsyncThunk(
  "/verifyTokenAsyncThunk",
  async function(_, thunkAPI) {
    const result = await ChainCodeAPI.Identity.getAsync();
    if(result.error) return thunkAPI.rejectWithValue("Xác thực token không thành công!");

    return result;
  }
);