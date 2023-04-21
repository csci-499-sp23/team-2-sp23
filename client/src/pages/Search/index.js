import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setFinished, setLoading } from "../../store/reducers/progress";
import RestaurantAPI from "../../api/restaurant-api";
import GridView from "./GridView";
import MapView from "./MapView";
import SearchHeader from "./SearchHeader";
import { useJsApiLoader } from "@react-google-maps/api";
import AddressSearch from "./AddressSearch";
import { DEFAULT_SEARCH_QUERY, SEARCH_LOCATION_TYPES } from "./constants";
import useMenuModal from "../../hooks/useMenuModal";
import Filters from "../../components/Filters";
import { applyFilters } from "../../components/Filters/applyFilters";

export default function Search() {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const [searchFields, setSearchFields] = useState({
    ...DEFAULT_SEARCH_QUERY,
    ...JSON.parse(localStorage.getItem("budget-eats-cache")),
  });
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

  async function retrieveRestaurants(
    { longitude, latitude, meters, budget },
    controller
  ) {
    const query = {
      longitude,
      latitude,
      meters,
      budget,
    };

    dispatch(setLoading(true));
    dispatch(setFinished(false));

    const retrievedRestaurants =
      await RestaurantAPI.getNearbyRestaurantsInBudget(query, controller);

    dispatch(setFinished(true));

    updateFields({ latitude, longitude, meters, budget });
    setRestaurants(retrievedRestaurants.rows);

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

  const { longitude, latitude, meters, budget } = searchFields;

  useEffect(() => {
    const abortController = new AbortController();
    retrieveRestaurants(searchFields, abortController);

    localStorage.setItem("budget-eats-cache", JSON.stringify(searchFields));

    return () => {
      abortController.abort();
    };
    // eslint-disable-next-line
  }, [longitude, latitude, meters, budget]);

  const { FilterComponent, restaurantFilters } = Filters();
  const filteredRestaurants = applyFilters(restaurants, restaurantFilters);

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
          />
          <AddressSearch updateFields={updateFields} />
          <FilterComponent />
          {viewMode === "grid" && (
            <GridView
              rows={filteredRestaurants}
              setModalFoods={setFoods}
              openModal={openModal}
            />
          )}
          {viewMode === "map" && (
            <MapView
              latitude={searchFields.latitude}
              longitude={searchFields.longitude}
              rows={filteredRestaurants}
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
