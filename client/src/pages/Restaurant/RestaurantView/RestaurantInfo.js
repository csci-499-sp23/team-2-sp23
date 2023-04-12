import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";

const classes = {
  addressContainer: {
    fontSize: "0.9rem",
    color: "hsl(30, 80%, 40%)",
  },
  phoneNumberContainer: {
    fontSize: "0.9rem",
  },
};

export default function RestaurantInfo({ restaurant }) {
  const phoneNumber = formatPhoneNumber(restaurant.phone);
  const { address1, city, state, zip_code } = restaurant.address;

  return (
    <div>
      <div style={classes.addressContainer}>
        {address1} {city}, {state} {zip_code}
      </div>
      <div style={classes.phoneNumberContainer}>
        <a href={`tel: ${phoneNumber}`}>{phoneNumber}</a>
      </div>
    </div>
  );
}
