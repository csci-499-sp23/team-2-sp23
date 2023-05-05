import {
  Autocomplete,
  Box,
  TextField,
  createFilterOptions,
} from "@mui/material";
import { useSelector } from "react-redux";

export default function FoodCategoryFilter({
  foodCategories,
  setFoodCategories,
}) {
  const foodCategoryRedux = useSelector((state) => state.foodCategories);
  const { foodCategoryOptions, foodCategoryFrequency } = foodCategoryRedux;

  const options = foodCategoryOptions.map((option) => option.category);

  const filterOptions = createFilterOptions({
    limit: 20,
  });

  return (
    <Autocomplete
      multiple
      filterOptions={filterOptions}
      options={options}
      getOptionDisabled={(option) => option}
      getOptionLabel={(option) => option}
      renderOption={(props, option) => (
        <Box component="li" {...props}>
          {option} ({foodCategoryFrequency[option]})
        </Box>
      )}
      value={foodCategories}
      size="small"
      sx={{ minWidth: "250px" }}
      onChange={(event, selectedCategories) => {
        setFoodCategories(selectedCategories ?? []);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          variant="standard"
          label="Search for Food Categories"
        />
      )}
    />
  );
}
