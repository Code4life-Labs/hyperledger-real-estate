import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_User } from 'src/apis/chaincode/types';

export const updateUserAsyncThunk = createAsyncThunk(
  "/updateUserAsyncThunk",
  async function(data: Partial<Chaincode_User>) {
    return await ChainCodeAPI.User.patchAsync(data);
  }
);