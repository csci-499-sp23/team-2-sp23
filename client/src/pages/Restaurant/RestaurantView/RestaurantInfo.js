import RedirectButton from "../../../components/RedirectButton";
import YelpLogo from "../../../assets/images/yelp-logo.png";
import GoogleMapsLogo from "../../../assets/images/google-maps-logo.png";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";

const classes = {
  container: {
    display: "flex",
    justifyContent: "space-between",
  },
  addressContainer: {
    color: "hsl(30, 80%, 40%)",
  },
  phoneNumberContainer: {
    color: "black",
  },
};

export default function RestaurantInfo({ restaurant }) {
  const { address, location, phone } = restaurant;
  const { address1, city, state, zip_code } = address;
  const [longitude, latitude] = location.coordinates;

  const phoneNumber = formatPhoneNumber(phone);

  return (
    <div style={classes.container}>
      <div>
        <div style={classes.addressContainer}>
          {address1} {city}, {state} {zip_code}
        </div>
        <div>
          <a style={classes.phoneNumberContainer} href={`tel: ${phoneNumber}`}>
            {phoneNumber}
          </a>
        </div>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <RedirectButton image={YelpLogo} url={restaurant.yelp_url} />
        <RedirectButton
          image={GoogleMapsLogo}
          url={`https://www.google.com/maps/search/${latitude},${longitude}`}
        />
      </div>
    </div>
  );
}
