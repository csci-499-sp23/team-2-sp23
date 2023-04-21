import { useState } from "react";
import PriceFilter from "../../components/Filters/PriceFilter";

const DEFAULT_FILTER = {
  $: false,
  $$: false,
  $$$: false,
  $$$$: false,
};

export default function usePriceFilter() {
  const [priceFilter, setPriceFilter] = useState(DEFAULT_FILTER);
  const selectedPrices = Object.keys(priceFilter).filter(
    (price) => priceFilter[price]
  );

  const matchesPriceCategory = (row) => {
    if (!selectedPrices.length) return true;
    return selectedPrices.includes(row.restaurant.price_category);
  };

  const PriceFilterComponent = () => (
    <PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
  );

  return { matchesPriceCategory, PriceFilterComponent };
}
