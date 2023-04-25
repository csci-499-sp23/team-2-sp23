import { useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Collapse from "@mui/material/Collapse";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

export default function FoodCategoryFilter({ foodCategory, setFoodCategory }) {
  const [checked, setChecked] = useState(true);
  if (!foodCategory) return;

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

  const selectedCategories = Object.keys(foodCategory).filter(
    (category) => foodCategory[category]
  );
  const unSelectedCategories = Object.keys(foodCategory).filter(
    (category) => !foodCategory[category]
  );

  const FoodChip = ({ food }) => (
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
        <Box sx={{ color: foodCategory[food] ? "white" : "primary.chip" }}>
          {food}
        </Box>
      }
      onClick={() => toggleFoodSelected(food)}
    />
  );

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
          {selectedCategories.map((food) => (
            <FoodChip food={food} key={food} />
          ))}
          {unSelectedCategories.map((food) => (
            <FoodChip food={food} key={food} />
          ))}
        </Box>
      </Collapse>
    </div>
  );
}
