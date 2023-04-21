import React from "react";
import usePriceFilter from "./usePriceFilter";

export default function useFilters() {
  const { matchesPriceCategory, PriceFilterComponent } = usePriceFilter();

  // collect filter conditions
  const totalFilters = [matchesPriceCategory];

  // display filter components
  const FilterComponent = () => (
    <>
      <PriceFilterComponent />
    </>
  );

  return { totalFilters, FilterComponent };
}
