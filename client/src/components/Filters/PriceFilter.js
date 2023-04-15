import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function PriceFilterToggler() {
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

  return (
    <ToggleButtonGroup value={selectedPrices} aria-label="price" size="small">
      {prices.map((price) => (
        <ToggleButton
          key={price}
          value={price}
          onClick={() => {
            const updatedFilter = {
              ...priceFilter,
              [price]: !priceFilter[price],
            };
            setPriceFilter(updatedFilter);
          }}
        >
          {price}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
