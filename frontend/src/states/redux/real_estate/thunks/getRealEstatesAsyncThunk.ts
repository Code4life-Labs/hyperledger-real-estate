import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_RealEstate_ResponsedData } from 'src/apis/chaincode/types';

export const getRealEstatesAsyncThunk = createAsyncThunk(
  "/getRealEstatesAsyncThunk",
  async function(payload: { limit: number, skip: number }) {
    return await ChainCodeAPI.RealEstate.getMultipleAsync(payload.limit, payload.skip) as Array<Chaincode_RealEstate_ResponsedData>;
  }
);