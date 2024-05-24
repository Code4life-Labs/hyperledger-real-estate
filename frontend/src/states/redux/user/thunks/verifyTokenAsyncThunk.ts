import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const verifyTokenAsyncThunk = createAsyncThunk(
  "/verifyTokenAsyncThunk",
  async function() {
    return await ChainCodeAPI.Identity.getAsync();
  }
);