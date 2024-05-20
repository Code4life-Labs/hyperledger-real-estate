import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
import { ChainCodeAPI } from "src/apis";

export const getRealEstateAsyncThunk = createAsyncThunk(
  "/getRealEstateAsyncThunk",
  async function(id: string) {
    return ChainCodeAPI.RealEstate.getAsync(id);
  }
);