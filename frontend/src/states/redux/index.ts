import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Import slices
import { MenuSlice } from "./menu";
import { RealEstateSlice } from "./real_estate";
import { AdminSlice } from "./admin";
import { ClientSlice } from "./client";

// Central Reducer
const reducers = combineReducers({
  [MenuSlice.name]: MenuSlice.reducer,
  [RealEstateSlice.name]: RealEstateSlice.reducer,
  [AdminSlice.name]: AdminSlice.reducer,
  [ClientSlice.name]: ClientSlice.reducer
});

/**
 * Redux will be use as state manager in this app. It must be installed in `App.tsx` and
 * its actions and selectors must have a __hook wrapping outside__.
 */
export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false })
});

export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch