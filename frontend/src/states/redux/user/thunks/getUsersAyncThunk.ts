import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_User } from 'src/apis/chaincode/types';

export const getUsersAsyncThunk = createAsyncThunk(
  "/getUsersAsyncThunk",
  async function(payload: { limit: number; skip: number }) {
    return await ChainCodeAPI.User.getMultipleAsync(payload.limit, payload.skip) as Array<Chaincode_User>;
  }
);