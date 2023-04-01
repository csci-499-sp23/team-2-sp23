import Header from "./Header";
import RedirectButton from "../../../components/RedirectButton";
import YelpLogo from "../../../assets/images/yelp-logo.png";
import GoogleMapsLogo from "../../../assets/images/google-maps-logo.png";

export default function RestaurantView({ restaurant, foods }) {
  const [longitude, latitude] = restaurant.location.coordinates;

  return (
    <div>
      <Header
        imageUrl={restaurant.image_url}
        name={restaurant.name}
        foodCategories={restaurant.food_categories}
        lastUpdated={restaurant.updated_at ?? restaurant.created_at}
      />
      <RedirectButton image={YelpLogo} url={restaurant.yelp_url} />
      <RedirectButton
        image={GoogleMapsLogo}
        url={`https://www.google.com/maps/search/${latitude},${longitude}`}
      />
    </div>
  );
}
