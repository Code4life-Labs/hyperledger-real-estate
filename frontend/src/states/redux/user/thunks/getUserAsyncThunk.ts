import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_User } from 'src/apis/chaincode/types';

export const getUserAsyncThunk = createAsyncThunk(
  "/getUserAsyncThunk",
  async function(payload: string) {
    return await ChainCodeAPI.User.getAsync(payload) as Chaincode_User;
  }
);