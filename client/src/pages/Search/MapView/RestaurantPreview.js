import React from "react";
import ReviewStars from "../../../components/ReviewStars";
import { IconButton, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import { Link } from "react-router-dom";
import FastfoodIcon from "@mui/icons-material/Fastfood";
import defaultRestaurantImg from "../../../assets/images/default-restaurant-img.png";

const classes = {
  previewContainer: {
    height: "120px",
    width: "100%",
    position: "relative",
    padding: "0.25rem",
    boxSizing: "border-box",
    backgroundColor: "rgb(240,240,240)",
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
  foodCount: {
    display: "flex",
    alignItems: "center",
    gap: "0.25rem",
    minHeight: 0,
    minWidth: 0,
    padding: 0,
    paddingInline: "0.5rem",
    marginRight: "0.5rem",
    position: "absolute",
    right: 0,
    top: "50%",
    transform: "translate(0,-50%)",
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

function RestaurantPreview({
  restaurant,
  hideRestaurant,
  setModalFoods,
  openModal,
  foods,
}) {
  const restaurantPage = "/restaurant?yelp_id=" + restaurant.yelp_id;
  const phoneNumber = formatPhoneNumber(restaurant.phone);
  const { address1, state, zip_code } = restaurant.address;
  const restaurantAddress = `${address1 ?? ""} ${state}, ${zip_code}`;

  return (
    <div style={classes.previewContainer}>
      <div style={{ display: "flex" }}>
        <img
          style={classes.imageContainer}
          src={restaurant.image_url || defaultRestaurantImg}
          alt={"restaurant"}
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
        <Button
          style={classes.foodCount}
          variant="outlined"
          onClick={() => {
            setModalFoods(foods);
            openModal();
          }}
        >
          <span style={{ fontWeight: 400 }}>{foods.length}</span>
          <FastfoodIcon
            style={{ color: "hsl(30,90%,50%)", fontSize: "1rem" }}
          />
        </Button>
      </div>
    </div>
  );
}

export default RestaurantPreview;
