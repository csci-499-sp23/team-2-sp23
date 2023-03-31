import React from "react";
import Header from "./Header";
import RedirectButton from "../../../components/RedirectButton";
import YelpLogo from "../../../assets/images/yelp-logo.png";
import GoogleMapsLogo from "../../../assets/images/google-maps-logo.png";

export default function RestaurantView({ restaurant, foods }) {
  const [long, lat] = restaurant.location.coordinates;

  return (
    <div>
      <Header />
      {restaurant.name}
      {foods.length}
      <RedirectButton image={YelpLogo} url={restaurant.yelp_url} />
      <RedirectButton
        image={GoogleMapsLogo}
        url={`https://www.google.com/maps/search/${lat},${long}`}
      />
    </div>
  );
}
