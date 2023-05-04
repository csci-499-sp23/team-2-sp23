import { Autocomplete, TextField } from "@mui/material";

export default function FoodCategoryFilter({
  foodCategories,
  setFoodCategories,
}) {
  // TODO: replace with loaded categories from server
  const foods = ["Halal", "Chinese", "Mexican", "Amongus", "Pizza"];

  return (
    <Autocomplete
      multiple
      options={foods}
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
