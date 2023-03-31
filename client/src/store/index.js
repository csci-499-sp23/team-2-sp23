import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./reducers/progress";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
  },
});
