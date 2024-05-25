import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_RealEstate_ResponsedData } from 'src/apis/chaincode/types';

export const updateRealEstateAsyncThunk = createAsyncThunk(
  "/updateRealEstateAsyncThunk",
  async function(data: Partial<Chaincode_RealEstate_ResponsedData>, thunkAPI) {
    const result = await ChainCodeAPI.RealEstate.patchAsync(data);
    if(!result) return thunkAPI.rejectWithValue("Không thể cập nhật thông tin bất động sản");
    return result;
  }
);