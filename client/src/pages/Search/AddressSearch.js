import { TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";

export default function AddressSearch({ updateFields }) {
  const { ref: googlePlacesRef } = usePlacesWidget({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    onPlaceSelected: (place) => {
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

  return (
    <TextField
      inputRef={googlePlacesRef}
      variant="standard"
      sx={{
        width: "100%",
        marginBottom: "0.25rem",
      }}
    />
  );
}
