import GridView from "./GridView";
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

    const DEFAULT_SEARCH = {
      longitude: -73.96455592421076,
      latitude: 40.767851967738736,
      meters: 300,
      budget: 100,
    };

    retrieveRestaurants(DEFAULT_SEARCH);
  }, [coordinates]);

  return (
    <div>
      <ThemeProvider theme={theme}>
        <SearchHeader
          retrieveRestaurants={retrieveRestaurants}
          initialSearch={DEFAULT_SEARCH}
        />
        <GridView rows={restaurants} />
      </ThemeProvider>
    </div>
  );
}
