import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

export default function PriceFilter({ priceFilter, setPriceFilter }) {
  if (!priceFilter) return;

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
