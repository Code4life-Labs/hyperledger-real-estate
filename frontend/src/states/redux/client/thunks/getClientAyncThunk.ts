import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_Client } from 'src/apis/chaincode/types';

export const getClientAsyncThunk = createAsyncThunk(
  "/getClientAsyncThunk",
  async function(id: string) {
    return await ChainCodeAPI.Client.getAsync(id) as Chaincode_Client;
  }
);