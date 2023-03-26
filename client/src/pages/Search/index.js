import GridView from "./GridView";
import MapView from "./MapView";
import RestaurantAPI from "../../api/restaurant-api";
import { useEffect, useState } from "react";
import SearchHeader from "./SearchHeader";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const DEFAULT_SEARCH = {
  longitude: -73.96455592421076,
  latitude: 40.767851967738736,
  meters: 300,
  budget: 10,
};

export default function Search({ coordinates }) {
  const [restaurants, setRestaurants] = useState([]);
  const [latitude, setLatitude] = useState(DEFAULT_SEARCH.latitude);
  const [longitude, setLongitude] = useState(DEFAULT_SEARCH.longitude);
  const [viewMode, setViewMode] = useState("map");

  async function retrieveRestaurants({ longitude, latitude, meters, budget }) {
    const query = {
      longitude,
      latitude,
      meters,
      budget,
    };
    const retrievedRestaurants =
      await RestaurantAPI.getNearbyRestaurantsInBudget(query);

    console.log(retrievedRestaurants);

    setLatitude(latitude);
    setLongitude(longitude);
    setRestaurants(retrievedRestaurants.rows);
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: "hsl(20,80%,50%)",
      },
    },
    typography: {
      button: {
        textTransform: "none",
      },
    },
  });

  useEffect(() => {
    if (!coordinates.longitude) return;

    retrieveRestaurants(DEFAULT_SEARCH);
  }, [coordinates]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <SearchHeader
          retrieveRestaurants={retrieveRestaurants}
          initialSearch={DEFAULT_SEARCH}
          viewMode={viewMode}
          setViewMode={setViewMode}
        />
        {viewMode === "grid" && <GridView rows={restaurants} />}
        {viewMode === "map" && (
          <MapView
            latitude={latitude}
            longitude={longitude}
            rows={restaurants}
          />
        )}
      </ThemeProvider>
    </div>
  );
}
