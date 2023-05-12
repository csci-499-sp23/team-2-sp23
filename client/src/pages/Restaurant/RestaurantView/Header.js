import { useEffect, useState } from "react";
import { getAverageColor } from "../../../utils/getAverageColor";
import { formatDate } from "../../../utils/formatDate";
import ReviewStars from "../../../components/ReviewStars";
import Bookmark from "../../../components/Bookmark";

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
    gap: "0.5rem",
    padding: "1rem",
    paddingBottom: "0.5rem",
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
  },
  restaurantName: {
    fontSize: "1.25rem",
  },
  smallText: {
    fontSize: "0.75rem",
  },
  lastUpdated: {
    fontSize: "0.9rem",
    color: "hsl(25,80%,80%)",
    marginRight: "auto",
  },
};

function Header({ restaurant }) {
  const {
    restaurant_id,
    rating,
    review_count,
    price_category,
    image_url,
    name,
    food_categories,
    updated_at,
    created_at,
  } = restaurant;
  const lastUpdated = updated_at ?? created_at;
  const [headerColor, setHeaderColor] = useState(null);

  async function renderHeaderColor(imageUrl) {
    const averageColor = await getAverageColor(imageUrl);
    setHeaderColor(averageColor);
  }

  useEffect(() => {
    renderHeaderColor(image_url);
    // eslint-disable-next-line
  }, [image_url]);

  return (
    <div style={{ ...classes.container, backgroundColor: headerColor }}>
      <Bookmark
        restaurantName={name}
        restaurantId={restaurant._id}
        style={{ fontSize: "2rem" }}
        iconStyle={{ top: "0.5rem", right: "0.5rem" }}
      />
      <div style={classes.bottomBlur} />
      <div style={classes.content}>
        <div style={classes.wrapper}>
          <img src={image_url} style={classes.profile} alt={name} />
          <div>
            <div style={classes.restaurantName}>{name}</div>
            <div style={{ display: "flex", gap: "0.25rem" }}>
              <ReviewStars
                rating={rating}
                restaurantId={restaurant_id}
                style={{
                  color: "hsl(25,80%,60%)",
                  height: "14px",
                  width: "14px",
                }}
              />
              <span style={classes.smallText}>({review_count})</span>
              {!!price_category && (
                <span style={classes.smallText}>• {price_category}</span>
              )}
            </div>
            <div style={{ ...classes.smallText, color: "#c9c9c9" }}>
              {food_categories.join(" • ")}
            </div>
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
