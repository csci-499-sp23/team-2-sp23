import { useState } from "react";
import FoodCategoryFilter from "../../components/Filters/FoodCategoryFilter";
import { CATEGORIES } from "./categories";
import { toggleObjectFromArray, sharesCommonElement } from "./utils";

const DEFAULT_FILTER = toggleObjectFromArray(CATEGORIES);

export default function useFoodCategoryFilter() {
  const [foodCategoryFilter, setFoodCategoryFilter] = useState(DEFAULT_FILTER);

  const selectedCategories = Object.keys(foodCategoryFilter).filter(
    (category) => foodCategoryFilter[category]
  );

  const matchesFoodCategory = (row) => {
    if (!selectedCategories.length) return true;
    return sharesCommonElement(
      row.restaurant.food_categories,
      selectedCategories
    );
  };

  const FoodCategoryFilterComponent = () => (
    <FoodCategoryFilter
      foodCategory={foodCategoryFilter}
      setFoodCategory={setFoodCategoryFilter}
    />
  );

  return { matchesFoodCategory, FoodCategoryFilterComponent };
}
