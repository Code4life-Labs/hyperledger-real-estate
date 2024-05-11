import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getRealEstatesAsyncThunk = createAsyncThunk(
  "/getRealEstatesAsyncThunk",
  async function() {
    return ChainCodeAPI.ReadEstate.getMultipleAsync();
  }
);