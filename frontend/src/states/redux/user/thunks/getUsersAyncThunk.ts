import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getUsersAsyncThunk = createAsyncThunk(
  "/getUsersAsyncThunk",
  async function() {
    const users = await ChainCodeAPI.User.getMultipleAsync();
    return users; 
  }
);