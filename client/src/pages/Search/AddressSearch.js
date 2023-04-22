import { IconButton, InputAdornment, TextField } from "@mui/material";
import { usePlacesWidget } from "react-google-autocomplete";
import { HUNTER_COLLEGE_ADDRESS } from "./constants";
import ClearIcon from "@mui/icons-material/Clear";

export default function AddressSearch({ updateFields }) {
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

  return (
    <TextField
      inputRef={googlePlacesRef}
      variant="standard"
      sx={{ width: "60%", minWidth: "300px" }}
      label="Address"
      defaultValue={HUNTER_COLLEGE_ADDRESS}
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
      }}
    />
  );
}
