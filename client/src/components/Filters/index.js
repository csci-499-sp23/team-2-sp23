import React from "react";
import usePriceFilter from "./PriceFilter";

export default function Filters() {
  // extract component and selected items
  const { PriceFilterComponent, selectedPrices } = usePriceFilter();

  const matchesPriceCategory = (row) => {
    if (!selectedPrices.length) return row;
    return selectedPrices.includes(row.restaurant.price_category);
  };

  // collect filter functions
  const restaurantFilters = [matchesPriceCategory];

  function FilterComponent() {
    return (
      <>
        <PriceFilterComponent />
      </>
    );
  }

  return { FilterComponent, restaurantFilters };
}
