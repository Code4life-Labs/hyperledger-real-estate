import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getAdminsAsyncThunk = createAsyncThunk(
  "/getAdminsAsyncThunk",
  async function() {
    return ChainCodeAPI.Admin.getMultipleAsync();
  }
);