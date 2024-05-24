import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import types
import type { Chaincode_User } from 'src/apis/chaincode/types';

export const createUserAsyncThunk = createAsyncThunk(
  "/createUserAsyncThunk",
  async function(data: Chaincode_User) {
    return await ChainCodeAPI.User.postAsync(data);
  }
);