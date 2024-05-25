import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_Client } from 'src/apis/chaincode/types';

export const updateClientAsyncThunk = createAsyncThunk(
  "/updateClientAsyncThunk",
  async function(data: Partial<Chaincode_Client>, thunkAPI) {
    const result = await ChainCodeAPI.Client.patchAsync(data);
    if(!result) return thunkAPI.rejectWithValue("Không thể cập nhật thông tin khách hàng (chủ sở hữu)");
    return result;
  }
);