import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const authorizeUserAsyncThunk = createAsyncThunk(
  "/authorizeUserAsyncThunk",
  async function(payload: { username: string, password?: string }, thunkAPI) {
    const result = await ChainCodeAPI.Identity.postAsync(payload.username, payload.password!);
    if(result.error) return thunkAPI.rejectWithValue("Đăng nhập không thành công!");

    return result.data;
  }
);