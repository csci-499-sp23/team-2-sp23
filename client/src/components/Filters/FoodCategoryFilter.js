import { Autocomplete, TextField } from "@mui/material";
import { useSelector } from "react-redux";

export default function FoodCategoryFilter({
  foodCategories,
  setFoodCategories,
}) {
  const { foodCategories: foodCategoryOptions } = useSelector(
    (state) => state.foodCategories
  );

  return (
    <Autocomplete
      multiple
      options={foodCategoryOptions}
      getOptionLabel={(option) => option}
      value={foodCategories}
      size="small"
      sx={{ minWidth: "250px" }}
      onChange={(event, selectedCategories) => {
        setFoodCategories(selectedCategories ?? []);
      }}
      renderInput={(params) => (
        <TextField {...params} variant="standard" label="Food Categories" />
      )}
    />
  );
}
