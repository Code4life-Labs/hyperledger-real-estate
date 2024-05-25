import { createAsyncThunk } from '@reduxjs/toolkit';

// Import APIs
// import { Docs_API } from 'src/apis';

// Import utils
// import { BrowserStorageUtils, LocalStorageKeys } from 'src/utils/browser_storage';
// Import types
// import type { DocumentOutlineData } from 'src/apis/docs';

/**
 * Use this async thunk to get ID for user.
 */
export const getOutlineDataAsyncThunk = createAsyncThunk(
  "/getOutlineDataAsyncThunk",
  async function() {
    return [];
  }
);