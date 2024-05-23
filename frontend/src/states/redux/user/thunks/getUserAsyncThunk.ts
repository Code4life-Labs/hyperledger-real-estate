import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getUserAsyncThunk = createAsyncThunk(
  "/getUserAsyncThunk",
  async function(payload: string, thunkAPI) {
    const result = await ChainCodeAPI.User.getAsync(payload);
    if(result.error) return thunkAPI.rejectWithValue("Không thể lấy dữ liệu của người dùng");
    return result.data; 
  }
);