import PriceFilter from "../../../components/Filters/PriceFilter";
import FoodCategoryFilter from "../../../components/Filters/FoodCategoryFilter";

function RestaurantFilters({
  priceFilter,
  setPriceFilter,
  foodCategories,
  setFoodCategories,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-end",
        columnGap: "1rem",
        rowGap: "0.25rem",
        width: "100%",
        flexWrap: "wrap",
      }}
    >
      <PriceFilter priceFilter={priceFilter} setPriceFilter={setPriceFilter} />
      <FoodCategoryFilter
        foodCategories={foodCategories}
        setFoodCategories={setFoodCategories}
      />
    </div>
  );
}

export default RestaurantFilters;
