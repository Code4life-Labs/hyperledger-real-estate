import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_User } from 'src/apis/chaincode/types';

export const updateUserAsyncThunk = createAsyncThunk(
  "/updateUserAsyncThunk",
  async function(data: Partial<Chaincode_User>, thunkAPI) {
    const result = await ChainCodeAPI.User.patchAsync(data);
    if(!result) return thunkAPI.rejectWithValue("Không thể cập nhật thông tin người dùng");
    return result;
  }
);