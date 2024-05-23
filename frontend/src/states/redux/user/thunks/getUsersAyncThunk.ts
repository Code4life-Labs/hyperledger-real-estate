import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getUsersAsyncThunk = createAsyncThunk(
  "/getUsersAsyncThunk",
  async function(_, thunkAPI) {
    const result = await ChainCodeAPI.User.getMultipleAsync();
    if(result.error) return thunkAPI.rejectWithValue("Không thể lấy dữ liệu người dùng");
    return result.data; 
  }
);