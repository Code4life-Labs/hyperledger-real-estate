import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_Client } from 'src/apis/chaincode/types';

export const updateClientAsyncThunk = createAsyncThunk(
  "/updateClientAsyncThunk",
  async function(data: Partial<Chaincode_Client>) {
    return await ChainCodeAPI.Client.patchAsync(data);
  }
);