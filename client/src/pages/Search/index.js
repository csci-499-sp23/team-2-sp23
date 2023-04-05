import { useEffect, useState } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { setFinished, setLoading } from "../../store/reducers/progress";
import RestaurantAPI from "../../api/restaurant-api";
import GridView from "./GridView";
import MapView from "./MapView";
import SearchHeader from "./SearchHeader";
import { useJsApiLoader } from "@react-google-maps/api";

const DEFAULT_SEARCH = {
  longitude: -73.96455592421076,
  latitude: 40.767851967738736,
  meters: 300,
  budget: 10,
};

export default function Search() {
  const dispatch = useDispatch();
  const [restaurants, setRestaurants] = useState([]);
  const [searchFields, setSearchFields] = useState({
    latitude: DEFAULT_SEARCH.latitude,
    longitude: DEFAULT_SEARCH.longitude,
    meters: DEFAULT_SEARCH.meters,
    budget: DEFAULT_SEARCH.budget,
  });
  const [viewMode, setViewMode] = useState("map");

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "",
  });

  function updateFields(updatedFields) {
    setSearchFields({ ...searchFields, ...updatedFields });
  }

  async function retrieveRestaurants({ longitude, latitude, meters, budget }) {
    const query = {
      longitude,
      latitude,
      meters,
      budget,
    };

    dispatch(setLoading(true));
    dispatch(setFinished(false));

    const retrievedRestaurants =
      await RestaurantAPI.getNearbyRestaurantsInBudget(query);

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
    const searchQuery = { ...searchFields };
    retrieveRestaurants(searchQuery);
    // eslint-disable-next-line
  }, [longitude, latitude, meters, budget]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <SearchHeader
          updateFields={updateFields}
          searchFields={searchFields}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {viewMode === "grid" && <GridView rows={restaurants} />}
        {viewMode === "map" && isLoaded && (
          <MapView
            latitude={searchFields.latitude}
            longitude={searchFields.longitude}
            rows={restaurants}
            updateFields={updateFields}
          />
        )}
      </ThemeProvider>
    </div>
  );
}
