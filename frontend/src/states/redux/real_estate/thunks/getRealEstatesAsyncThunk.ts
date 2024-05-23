import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type {
  Chaincode_RealEstate_AppData
} from "./types";

export const getRealEstatesAsyncThunk = createAsyncThunk(
  "/getRealEstatesAsyncThunk",
  async function(payload: { limit: number, skip: number }) {
    const result = await ChainCodeAPI.RealEstate.getMultipleAsync(payload.limit, payload.skip);
    if(result.error) return thunkAPI.rejectWithValue("Không tìm thấy thông tin bất động sản");
    return result.data as Array<Chaincode_RealEstate_AppData>;
  }
);