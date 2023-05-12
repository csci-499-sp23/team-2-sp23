import { configureStore } from "@reduxjs/toolkit";
import progressReducer from "./reducers/progress";
import foodCategoriesReducer from "./reducers/foodCategories";
import userReducer from "./reducers/user";
import snackbarReducer from "./reducers/snackbar";

export const store = configureStore({
  reducer: {
    progress: progressReducer,
    foodCategories: foodCategoriesReducer,
    user: userReducer,
    snackbar: snackbarReducer,
  },
});
