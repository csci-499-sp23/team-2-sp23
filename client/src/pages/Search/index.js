import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setFinished, setLoading } from "../../store/reducers/progress";
import RestaurantAPI from "../../api/restaurant-api";
import GridView from "./GridView";
import MapView from "./MapView";
import SearchHeader from "./SearchHeader";
import { useJsApiLoader } from "@react-google-maps/api";
import { DEFAULT_SEARCH_QUERY, SEARCH_LOCATION_TYPES } from "./constants";
import useMenuModal from "../../hooks/useMenuModal";

export default function Search() {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const [count, setCount] = useState(0);
  const [searchFields, setSearchFields] = useState({
    ...DEFAULT_SEARCH_QUERY,
    ...JSON.parse(localStorage.getItem("budget-eats-cache")),
  });
  const [page, setPage] = useState(0);
  const [viewMode, setViewMode] = useState(
    localStorage.getItem("view-mode") ?? "map"
  );
  const { openModal, setFoods, MenuModal } = useMenuModal();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    libraries: SEARCH_LOCATION_TYPES,
  });

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

  const theme = createTheme({
    palette: {
      primary: {
        main: "hsl(25,80%,50%)",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  const { longitude, latitude, meters, budget, sort_by, sort_dir } =
    searchFields;
  const pageNavigationProps = {
    total_count: count,
    page_number: page,
    count_limit: 20,
    updatePage: updatePage,
  };

  // Search on coordinate change
  useEffect(() => {
    const abortController = new AbortController();
    setPage(0);
    const query = { ...searchFields, page };
    retrieveRestaurants(query, abortController);

    localStorage.setItem("budget-eats-cache", JSON.stringify(query));

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [longitude, latitude, meters, budget, sort_by, sort_dir]);

  // Search on page change
  useEffect(() => {
    const abortController = new AbortController();
    const query = { ...searchFields, page };
    retrieveRestaurants(query, abortController);

    localStorage.setItem("budget-eats-cache", JSON.stringify(query));

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [page]);

  return (
    <ThemeProvider theme={theme}>
      <MenuModal />
      {isLoaded && (
        <>
          <SearchHeader
            updateFields={updateFields}
            searchFields={searchFields}
            viewMode={viewMode}
            setViewMode={setViewMode}
            pageNavigationProps={pageNavigationProps}
          />
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
      )}
    </ThemeProvider>
  );
}
