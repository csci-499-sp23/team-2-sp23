import { useEffect, useState } from "react";
import { FastAverageColor } from "fast-average-color";

const classes = {
  container: {
    height: "144px",
    // ignore parent padding
    marginInline: "-1rem",
    marginTop: "-1rem",
    position: "relative",
    overflow: "hidden",
  },
  banner: {
    position: "absolute",
    width: "100%",
    objectFit: "cover",
    height: "100%",
  },
  bottomBlur: {
    width: "100%",
    height: "100%",
    background:
      "linear-gradient(0deg, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.025))",
  },
  content: {
    position: "absolute",
    bottom: 0,
    marginTop: "auto",
    display: "flex",
    alignItems: "flex-end",
    gap: "1rem",
    paddingInline: "1rem",
    paddingBottom: "1rem",
    color: "white",
  },
  profile: {
    width: "84px",
    height: "84px",
    objectFit: "cover",
    borderRadius: "1rem",
    border: "2px solid white",
  },
  restaurantName: {
    fontSize: "1.25rem",
  },
  categories: {
    fontSize: "0.75rem",
    color: "#c9c9c9",
  },
};

function Header({ imageUrl, name, foodCategories }) {
  const [headerColor, setHeaderColor] = useState(null);
  const colorRender = new FastAverageColor();

  // calculates the average color of an image
  // sets headerColor when completed, otherwise uses white
  async function getAverageColor(imageUrl) {
    await colorRender
      .getColorAsync(imageUrl)
      .then((color) => setHeaderColor(color.hex))
      .catch(() => setHeaderColor("white"));
  }

  useEffect(() => {
    getAverageColor(imageUrl);
    // eslint-disable-next-line
  }, [imageUrl]);

  return (
    <div style={{ ...classes.container, backgroundColor: headerColor }}>
      <div style={classes.bottomBlur} />
      <div style={classes.content}>
        <img src={imageUrl} style={classes.profile} alt={name} />
        <div style={{ marginBottom: "0.25rem" }}>
          <div style={classes.restaurantName}>{name}</div>
          <div style={classes.categories}>{foodCategories.join(" • ")}</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
