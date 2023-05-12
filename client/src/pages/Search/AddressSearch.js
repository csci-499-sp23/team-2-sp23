import { IconButton, InputAdornment, TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";
import ClearIcon from "@mui/icons-material/Clear";
import Geocode from "react-geocode";
import getUserCoordinates from "../../utils/getUserCoordinates";
import { useEffect } from "react";
import MyLocationIcon from "@mui/icons-material/MyLocation";

export default function AddressSearch({ updateFields }) {
  Geocode.setApiKey(process.env.REACT_APP_GOOGLE_API_KEY);
  Geocode.setLanguage("en");
  Geocode.setRegion("us");

  const { ref: googlePlacesRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
      if (!place.geometry) return;

      const { location } = place.geometry;
      const longitude = location.lng();
      const latitude = location.lat();

      updateFields({ longitude, latitude });
    },
    options: {
      types: ["geocode", "establishment"],
      componentRestrictions: { country: "usa" },
    },
  });

  async function updateToUserCoordinates() {
    const coordinates = await getUserCoordinates().catch(() => null);
    if (!coordinates) {
      console.log("failed to retrieve coordinates");
      return;
    }
    const { latitude, longitude } = coordinates;

    updateFields({ longitude, latitude });
    const addressQuery = await Geocode.fromLatLng(latitude, longitude);

    const bestMatch = addressQuery.results[0].formatted_address;
    googlePlacesRef.current.value = bestMatch;
  }

  useEffect(() => {
    if (!googlePlacesRef.current) return;
    localStorage.setItem("address-search", googlePlacesRef.current.value);
  }, [googlePlacesRef.current?.value]);

  return (
    <TextField
      inputRef={googlePlacesRef}
      variant="standard"
      sx={{ width: "60%", minWidth: "300px" }}
      label="Address"
      defaultValue={localStorage.getItem("address-search")}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end" padding={0}>
            <IconButton
              onClick={() => {
                googlePlacesRef.current.value = "";
              }}
              sx={{ p: 0.25 }}
            >
              <ClearIcon />
            </IconButton>
          </InputAdornment>
        ),
        startAdornment: (
          <IconButton onClick={() => updateToUserCoordinates()}>
            <MyLocationIcon />
          </IconButton>
        ),
      }}
    />
  );
}
