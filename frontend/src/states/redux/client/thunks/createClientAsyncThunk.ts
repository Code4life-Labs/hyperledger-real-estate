import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_Client } from 'src/apis/chaincode/types';

export const createClientAsyncThunk = createAsyncThunk(
  "/createClientAsyncThunk",
  async function(data: Chaincode_Client) {
    return await ChainCodeAPI.Client.postAsync(data);
  }
);