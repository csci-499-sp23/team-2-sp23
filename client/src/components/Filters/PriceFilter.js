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
  const selectedPrices = prices.filter((price) => priceFilter[price]);

  return (
    <ToggleButtonGroup
      value={selectedPrices}
      style={{ backgroundColor: "hsl(35, 10%, 98%)" }}
      aria-label="price"
      size="small"
    >
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
          <span style={{ width: "32px" }}>{price}</span>
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
