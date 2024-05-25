import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import { Chaincode_RealEstate_AppData } from 'src/apis/chaincode/types';

export const getRealEstateAsyncThunk = createAsyncThunk(
  "/getRealEstateAsyncThunk",
  async function(id: string) {
    return await ChainCodeAPI.RealEstate.getAsync(id) as Chaincode_RealEstate_AppData;
  }
);