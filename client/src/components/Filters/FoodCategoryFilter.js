import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function FoodCategoryFilter({ foodCategory, setFoodCategory }) {
  const [checked, setChecked] = useState(true);
  if (!foodCategory) return;

  const foods = Object.keys(foodCategory);

  const handleChange = () => {
    setChecked((prev) => !prev);
  };

  function toggleFoodSelected(food) {
    const updatedFood = {
      ...foodCategory,
      [food]: !foodCategory[food],
    };
    setFoodCategory(updatedFood);
  }

  return (
    <div>
      <FormControlLabel
        control={
          <Switch checked={checked} onChange={handleChange} color="primary" />
        }
        label="Filter food categories"
      />
      <Collapse in={checked}>
        <Box sx={{ maxHeight: "250px", overflowY: "auto" }}>
          {foods.map((food) => (
            <Chip
              key={food}
              sx={{
                m: 0.25,
                border: 1,
                borderColor: "primary.chip",
                bgcolor: foodCategory[food] ? "primary.chip" : "white",
                "&:hover": {
                  backgroundColor: foodCategory[food]
                    ? "primary.chip"
                    : "primary.bland",
                },
              }}
              label={
                <Box
                  sx={{ color: foodCategory[food] ? "white" : "primary.chip" }}
                >
                  {food}
                </Box>
              }
              onClick={() => toggleFoodSelected(food)}
            />
          ))}
        </Box>
      </Collapse>
    </div>
  );
}
