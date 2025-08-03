import { configureStore } from "@reduxjs/toolkit";
import moviesReducer from "./slices/moviesSlice";
import settingsReducer from "./slices/settingsSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      movies: moviesReducer,
      settings: settingsReducer,
    },
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
