import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_Client } from 'src/apis/chaincode/types';

export const createClientAsyncThunk = createAsyncThunk(
  "/createClientAsyncThunk",
  async function(data: Chaincode_Client, thunkAPI) {
    const result = await ChainCodeAPI.Client.postAsync(data);
    if(!result) return thunkAPI.rejectWithValue("Không thể thêm thông tin khách hàng (chủ sở hữu)");
    return result;
  }
);