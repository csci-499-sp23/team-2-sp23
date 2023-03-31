import { Button } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

export default function RedirectButton({ image, url }) {
  const classes = {
    imageContainer: {
      height: "20px",
      objectFit: "cover",
      borderRadius: "2px",
    },
    buttonContainer: {
      height: "30px",
      display: "flex",
      justifyContent: "center",
      backgroundColor: "white",
      gap: "10px",
    },
  };
  return (
    <Button
      variant="outlined"
      style={classes.buttonContainer}
      onClick={() => {
        window.open(url, "_blank");
      }}
    >
      <img src={image} style={classes.imageContainer} alt="logo" />
      <LaunchIcon style={{ height: "18px", width: "18px" }} />
    </Button>
  );
}
