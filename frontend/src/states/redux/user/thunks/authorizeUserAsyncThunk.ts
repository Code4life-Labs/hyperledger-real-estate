import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

// Import type
import type { Chaincode_User } from 'src/apis/chaincode/types';

export const authorizeUserAsyncThunk = createAsyncThunk(
  "/authorizeUserAsyncThunk",
  async function(payload: { username: string, password: string }) {
    return await ChainCodeAPI.Identity.postAsync(payload.username, payload.password) as { user: Chaincode_User, token: string };
  }
);