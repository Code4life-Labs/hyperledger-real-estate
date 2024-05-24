import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_RealEstate_ResponsedData } from 'src/apis/chaincode/types';

export const createRealEstateAsyncThunk = createAsyncThunk(
  "/createRealEstateAsyncThunk",
  async function(data: Chaincode_RealEstate_ResponsedData) {
    return await ChainCodeAPI.RealEstate.postAsync(data);
  }
);