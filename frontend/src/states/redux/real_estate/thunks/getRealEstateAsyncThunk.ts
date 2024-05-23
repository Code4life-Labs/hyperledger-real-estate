import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type {
  Chaincode_RealEstate_AppData
} from "./types";

export const getRealEstateAsyncThunk = createAsyncThunk(
  "/getRealEstateAsyncThunk",
  async function(id: string) {
    console.log("Get RealEstate Async");
    const result = await ChainCodeAPI.RealEstate.getAsync(id);
    if(result.error) return thunkAPI.rejectWithValue("Không tìm thấy thông tin bất động sản");
    return result.data as Chaincode_RealEstate_AppData;
  }
);