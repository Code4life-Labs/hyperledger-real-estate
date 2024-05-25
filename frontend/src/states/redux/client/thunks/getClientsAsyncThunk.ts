import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_Client } from 'src/apis/chaincode/types';

export const getClientsAsyncThunk = createAsyncThunk(
  "/getClientsAsyncThunk",
  async function(payload: { limit: number, skip: number }) {
    return await ChainCodeAPI.Client.getMultipleAsync(payload.limit, payload.skip) as Array<Chaincode_Client>;
  }
);