import { useEffect, useState } from "react";
import { getAverageColor } from "../../../utils/getAverageColor";
import { formatDate } from "../../../utils/formatDate";

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
    boxSizing: "border-box",
    position: "absolute",
    bottom: 0,
    width: "100%",
    marginTop: "auto",

    display: "flex",
    justifyContent: "space-between",
    flexWrap: "wrap",
    rowGap: "0.5rem",
    padding: "1rem",
    color: "white",
  },
  wrapper: {
    display: "flex",
    alignItems: "flex-end",
    gap: "1rem",
  },
  profile: {
    width: "84px",
    height: "84px",
    objectFit: "cover",
    borderRadius: "1rem",
    border: "2px solid white",
    marginBottom: "-0.25rem",
  },
  restaurantName: {
    fontSize: "1.25rem",
  },
  categories: {
    fontSize: "0.75rem",
    color: "#c9c9c9",
  },
  lastUpdated: {
    fontSize: "0.75rem",
    color: "hsl(25,80%,80%)",
    marginRight: "auto",
  },
};

function Header({ imageUrl, name, foodCategories, lastUpdated }) {
  const [headerColor, setHeaderColor] = useState("white");

  async function renderHeaderColor(imageUrl) {
    const averageColor = await getAverageColor(imageUrl);
    setHeaderColor(averageColor);
  }

  useEffect(() => {
    renderHeaderColor(imageUrl);
    // eslint-disable-next-line
  }, [imageUrl]);

  return (
    <div style={{ ...classes.container, backgroundColor: headerColor }}>
      <div style={classes.bottomBlur} />
      <div style={classes.content}>
        <div style={classes.wrapper}>
          <img src={imageUrl} style={classes.profile} alt={name} />
          <div>
            <div style={classes.restaurantName}>{name}</div>
            <div style={classes.categories}>{foodCategories.join(" • ")}</div>
          </div>
        </div>
        <div style={classes.wrapper}>
          <span style={classes.lastUpdated}>
            Last updated: {formatDate(lastUpdated)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
