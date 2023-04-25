import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./reducers/progress";
import foodCategoriesReducer from "./reducers/foodCategories";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    foodCategories: foodCategoriesReducer,
  },
});
