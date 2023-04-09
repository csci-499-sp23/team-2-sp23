import Header from "./Header";
import RedirectButton from "../../../components/RedirectButton";
import YelpLogo from "../../../assets/images/yelp-logo.png";
import GoogleMapsLogo from "../../../assets/images/google-maps-logo.png";
import FoodList from "../FoodList";

export default function RestaurantView({ restaurant, foods }) {
  const [longitude, latitude] = restaurant.location.coordinates;

  return (
    <div>
      <Header restaurant={restaurant} />
      <RedirectButton image={YelpLogo} url={restaurant.yelp_url} />
      <RedirectButton
        image={GoogleMapsLogo}
        url={`https://www.google.com/maps/search/${latitude},${longitude}`}
      />
      <FoodList foods={foods} />
    </div>
  );
}