import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_RealEstate_ResponsedData } from 'src/apis/chaincode/types';

export const createRealEstateAsyncThunk = createAsyncThunk(
  "/createRealEstateAsyncThunk",
  async function(data: Chaincode_RealEstate_ResponsedData, thunkAPI) {
    const result = await ChainCodeAPI.RealEstate.postAsync(data);
    if(!result) return thunkAPI.rejectWithValue("Không thể thêm thông tin bất động sản");
    return result;
  }
);