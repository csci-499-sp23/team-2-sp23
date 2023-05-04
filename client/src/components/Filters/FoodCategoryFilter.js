import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Fade from "@mui/material/Fade";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function FoodCategories() {
  const [checked, setChecked] = useState(false);

  const DEFAULT_FOODS = {
    Halal: false,
    Chinese: false,
    Mexican: false,
    Amongus: false,
    Imposter: false,
  };

  const [foodCategory, setFoodCategory] = useState(DEFAULT_FOODS);
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
      <Fade in={checked}>
        <Box>
          {foods.map((food, key) => (
            <Chip
              sx={{
                m: 0.25,
                border: 1,
                borderColor: "primary.chip",
                bgcolor: foodCategory[food] ? "primary.chip" : "transparent",
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
      </Fade>
    </div>
  );
}
