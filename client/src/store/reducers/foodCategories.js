import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodCategories: [],
};

export const foodCategoriesSlice = createSlice({
  name: "foodCategories",
  initialState,
  reducers: {
    setFoodCategory: (state, action) => {
      state.foodCategories = action.payload;
    },
  },
});

export const { setFoodCategory } = foodCategoriesSlice.actions;
export default foodCategoriesSlice.reducer;
