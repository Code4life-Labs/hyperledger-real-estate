import { configureStore, combineReducers } from "@reduxjs/toolkit";

// Import slices
import { MenuSlice } from "./menu";
import { RealEstatesSlice } from "./real_estates";

// Central Reducer.
const reducers = combineReducers({
  [MenuSlice.name]: MenuSlice.reducer,
  [RealEstatesSlice.name]: RealEstatesSlice.reducer
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