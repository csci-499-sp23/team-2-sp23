import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  foodCategoryOptions: [], // array of categories with frequency pair
  foodCategoryFrequency: {}, // object mapping category to frequency O(1) lookup
};

export const foodCategoriesSlice = createSlice({
  name: "foodCategories",
  initialState,
  reducers: {
    setFoodCategory: (state, action) => {
      state.foodCategoryOptions = action.payload;
    },
    setFoodCategoryFrequency: (state, action) => {
      state.foodCategoryFrequency = action.payload;
    },
  },
});

export const { setFoodCategory, setFoodCategoryFrequency } =
  foodCategoriesSlice.actions;
export default foodCategoriesSlice.reducer;
