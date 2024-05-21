import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getUserAsyncThunk = createAsyncThunk(
  "/getUserAsyncThunk",
  async function(payload: { username: string, password: string }, thunkAPI) {
    const user = await ChainCodeAPI.User.getAsync(payload.username, payload.password);
    if(!user) return thunkAPI.rejectWithValue("Đăng nhập không thành công!");
    return user; 
  }
);