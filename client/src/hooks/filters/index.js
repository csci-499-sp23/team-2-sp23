import React from "react";
import usePriceFilter from "./usePriceFilter";
import useFoodCategoryFilter from "./useFoodCategoryFilter";

export default function useFilters() {
  const { matchesPriceCategory, PriceFilterComponent } = usePriceFilter();
  const { matchesFoodCategory, FoodCategoryFilterComponent } =
    useFoodCategoryFilter();

  // collect filter conditions
  const totalFilters = [matchesPriceCategory, matchesFoodCategory];

  // display filter components
  const FilterComponent = () => (
    <>
      <PriceFilterComponent />
      <FoodCategoryFilterComponent />
    </>
  );

  return { totalFilters, FilterComponent };
}
