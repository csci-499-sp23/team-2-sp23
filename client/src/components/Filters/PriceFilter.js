import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function usePriceFilter() {
  const DEFAULT_FILTER = {
    $: false,
    $$: false,
    $$$: false,
    $$$$: false,
  };

  const [priceFilter, setPriceFilter] = React.useState(DEFAULT_FILTER);
  const prices = Object.keys(priceFilter);
  const selectedPrices = Object.keys(priceFilter).filter(
    (price) => priceFilter[price]
  );

  function PriceFilterComponent() {
    return (
      <ToggleButtonGroup value={selectedPrices} aria-label="price" size="small">
        {prices.map((price) => (
          <ToggleButton
            key={price}
            value={price}
            color="primary"
            onClick={() => {
              const updatedFilter = {
                ...priceFilter,
                [price]: !priceFilter[price],
              };
              setPriceFilter(updatedFilter);
            }}
          >
            <span style={{ width: "30px" }}>{price}</span>
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    );
  }

  return { PriceFilterComponent, selectedPrices };
}
