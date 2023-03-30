import { Button } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

// import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function RedirectButton({ image, url }) {
  const classes = {
    imageContainer: {
      width: "48px",
      objectFit: "cover",
    },
    buttonContainer: {
      height: "30px",
      display: "flex",
      justifyContent: "space-between",
      backgroundColor: "white",
      gap: "1rem",
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
      <img src={image} style={classes.imageContainer} />
      <LaunchIcon style={{height: "17px", width: "17px"}} />
    </Button>
  );
}

// 150px width
// 30px height
// BorderRadius 0.25 rem
// outline 2px gray
// Background color white