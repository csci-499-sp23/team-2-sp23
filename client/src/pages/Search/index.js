import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setFinished, setLoading } from "../../store/reducers/progress";
import RestaurantAPI from "../../api/restaurant-api";
import GridView from "./GridView";
import MapView from "./MapView";
import SearchHeader from "./SearchHeader";
import { DEFAULT_PRICE_FILTER, DEFAULT_SEARCH_QUERY } from "./constants";
import useMenuModal from "../../hooks/useMenuModal";
import {
  setFoodCategory,
  setFoodCategoryFrequency,
} from "../../store/reducers/foodCategories";
import Recommendations from "./Recommendations";
import PageNavigation from "./SearchHeader/PageNavigation";
import ViewToggler from "./SearchHeader/ViewToggler";

const classes = {
  resultHeader: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "0.5rem",
    margin: "0.5rem",
  },
};

export default function Search() {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const [count, setCount] = useState(0);
  const [searchFields, setSearchFields] = useState({
    ...DEFAULT_SEARCH_QUERY,
    ...JSON.parse(localStorage.getItem("query")),
  });
  const [priceFilter, setPriceFilter] = useState({
    ...DEFAULT_PRICE_FILTER,
    ...JSON.parse(localStorage.getItem("price_categories")),
  });
  const [foodCategories, setFoodCategories] = useState(
    JSON.parse(localStorage.getItem("food_categories")) ?? []
  );

  const selectedPrices = Object.keys(priceFilter).filter(
    (price) => priceFilter[price]
  );
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("view-mode") ?? "map"
  );
  const { openModal, setFoods, MenuModal } = useMenuModal();

  function updateFields(updatedFields) {
    setSearchFields((previousFields) => ({
      ...previousFields,
      ...updatedFields,
    }));
  }

  function updatePage(nextPage) {
    const MINIMUM_PAGE = 0;
    const MAXIMUM_PAGE = Math.ceil(count / 20) - 1;
    // Ensure page value is a valid page
    nextPage = Math.min(MAXIMUM_PAGE, nextPage);
    nextPage = Math.max(MINIMUM_PAGE, nextPage);
    setPage(nextPage ?? 0);
  }

  async function retrieveFoodCategories(query, controller) {
    const retrievedFoodCategories =
      await RestaurantAPI.getNearbyCategoriesInBudget(query, controller).catch(
        () => []
      );

    const foodCategoryFrequency = retrievedFoodCategories.reduce(
      (total, option) => {
        total[option.category] = option.frequency;
        return total;
      },
      {}
    );

    dispatch(setFoodCategory(retrievedFoodCategories));
    dispatch(setFoodCategoryFrequency(foodCategoryFrequency));
  }

  async function retrieveRecommendations(query, controller) {
    const retrievedRecommendedRestaurants =
      await RestaurantAPI.getNearbyRecommendedRestaurantsInBudget(
        query,
        controller
      ).catch(() => []);

    setRecommendedRestaurants(retrievedRecommendedRestaurants.rows);
  }
  async function retrieveRestaurants(query, controller) {
    dispatch(setLoading(true));
    dispatch(setFinished(false));

    const retrievedRestaurants =
      await RestaurantAPI.getNearbyRestaurantsInBudget(query, controller);

    dispatch(setFinished(true));

    updateFields({ latitude, longitude, meters, budget });
    setRestaurants(retrievedRestaurants.rows);
    setCount(retrievedRestaurants.count);

    setTimeout(() => {
      dispatch(setLoading(false));
    }, 600);
  }

  function saveStateToLocalStorage() {
    localStorage.setItem("query", JSON.stringify(query));
    localStorage.setItem("price_categories", JSON.stringify(priceFilter));
    localStorage.setItem("food_categories", JSON.stringify(foodCategories));
  }

  const { longitude, latitude, meters, budget, sort_by, sort_dir } =
    searchFields;
  const pageNavigationProps = {
    total_count: count,
    page_number: page,
    count_limit: 20,
    updatePage: updatePage,
  };

  const query = {
    ...searchFields,
    page,
    price_categories: selectedPrices,
    food_categories: foodCategories,
  };

  const mainQueryDependencies = [longitude, latitude, meters, budget];
  const sortingDependencies = [sort_by, sort_dir];
  const filterDependencies = [priceFilter, foodCategories];

  // Retrieve food categories on query change
  useEffect(() => {
    const abortController = new AbortController();
    retrieveFoodCategories(query, abortController);
    retrieveRecommendations(query, abortController);

    saveStateToLocalStorage(query, abortController);

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [...mainQueryDependencies]);

  // Retrieve restaurants on query or filter change
  useEffect(() => {
    const abortController = new AbortController();
    setPage(0);
    retrieveRestaurants(query, abortController);
    saveStateToLocalStorage();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [...mainQueryDependencies, ...sortingDependencies, ...filterDependencies]);

  // Retrieve restaurants on page change
  useEffect(() => {
    const abortController = new AbortController();
    retrieveRestaurants(query, abortController);
    saveStateToLocalStorage();

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [page]);

  return (
    <>
      <MenuModal />
      <SearchHeader
        updateFields={updateFields}
        searchFields={searchFields}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
        foodCategories={foodCategories}
        setFoodCategories={setFoodCategories}
        viewMode={viewMode}
        setViewMode={setViewMode}
        pageNavigationProps={pageNavigationProps}
      />
      <div style={classes.resultHeader}>
        <Recommendations
          rows={recommendedRestaurants}
          setModalFoods={setFoods}
          openModal={openModal}
        />
        <ViewToggler viewMode={viewMode} setViewMode={setViewMode} />
        <PageNavigation {...pageNavigationProps} />
      </div>
      {viewMode === "grid" && (
        <GridView
          rows={restaurants}
          setModalFoods={setFoods}
          openModal={openModal}
        />
      )}
      {viewMode === "map" && (
        <MapView
          latitude={searchFields.latitude}
          longitude={searchFields.longitude}
          searchRadius={searchFields.meters}
          rows={restaurants}
          updateFields={updateFields}
          setModalFoods={setFoods}
          openModal={openModal}
        />
      )}
    </>
  );
}
