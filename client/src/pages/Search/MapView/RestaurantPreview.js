import React from "react";
import ReviewStars from "../../../components/ReviewStars";
import { IconButton } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";

const classes = {
  previewContainer: {
    height: "120px",
    width: "100%",
    position: "relative",
    padding: "0.25rem",
    boxSizing: "border-box",
    backgroundColor: "rgb(224,224,224)",
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid gray",
    borderOffset: "-1px",
  },
  imageContainer: {
    height: "100%",
    width: "120px",
    borderRadius: "2px",
    objectFit: "cover",
    objectPosition: "center center",
  },
  detailsContainer: {
    marginLeft: "0.25rem",
    display: "flex",
    flexDirection: "column",
    fontSize: "0.8rem",
  },
  nameContainer: {
    fontSize: "1.25rem",
    textDecoration: "underline",
    color: "black",
    width: "fit-content",
  },
  categoriesContainer: {
    marginTop: "auto",
    color: "rgb(105,105,105)",
    overflow: "hidden",
  },
  reviewContainer: {
    fontSize: "0.75rem",
    display: "flex",
    color: "rgb(80,80,80)",
  },
  exitContainer: {
    position: "absolute",
    top: 0,
    right: 0,
  },
};

// Resource: https://stackoverflow.com/questions/8358084/regular-expression-to-reformat-a-us-phone-number-in-javascript
function formatPhoneNumber(phoneNumberString) {
  const cleaned = phoneNumberString.replace(/\D/g, "");
  const match = cleaned.match(/^(1|)?(\d{3})(\d{3})(\d{4})$/);
  if (match) {
    const intlCode = match[1] ? "+1 " : "";
    return [intlCode, "(", match[2], ") ", match[3], "-", match[4]].join("");
  }

  return null;
}

function RestaurantPreview({ restaurant, hideRestaurant }) {
  const restaurantPage = "/restaurant?yelp_id=" + restaurant.yelp_id;
  const phoneNumber = formatPhoneNumber(restaurant.phone);
  const { address1, state, zip_code } = restaurant.address;
  const restaurantAddress = `${address1 ?? ""} ${state}, ${zip_code}`;

  return (
    <div style={classes.previewContainer}>
      <div style={{ display: "flex" }}>
        <img
          style={classes.imageContainer}
          src={restaurant.image_url}
          alt={restaurant.image_url}
        />
        <div style={classes.detailsContainer}>
          <Link style={classes.nameContainer} to={restaurantPage}>
            {restaurant.name}
          </Link>
          <div style={{ color: "hsl(30,80%,40%)" }}>{restaurantAddress}</div>
          <div style={classes.reviewContainer}>
            <ReviewStars
              rating={restaurant.rating}
              restaurantId={restaurant.yelp_id}
              style={{ width: "1rem", height: "1rem" }}
            />
            ({restaurant.review_count})
          </div>
          <div style={{ color: "rgb(80,80,80)" }}>{phoneNumber}</div>
          <div style={classes.categoriesContainer}>
            {restaurant.food_categories.join(" • ")}
          </div>
        </div>
      </div>
      <div>
        <IconButton
          style={classes.exitContainer}
          onClick={() => hideRestaurant()}
        >
          <CancelIcon />
        </IconButton>
      </div>
    </div>
  );
}

export default RestaurantPreview;
