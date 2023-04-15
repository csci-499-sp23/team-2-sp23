import RedirectButton from "../../../components/RedirectButton";
import YelpLogo from "../../../assets/images/yelp-logo.png";
import GoogleMapsLogo from "../../../assets/images/google-maps-logo.png";
import TransactionItem from "../../../components/TransactionItem";
import PhoneIcon from "@mui/icons-material/Phone";
import { formatPhoneNumber } from "../../../utils/formatPhoneNumber";
import "./restaurant-info.css";

const classes = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    columnGap: "1rem",
    rowGap: "0.5rem",
    flexWrap: "wrap",
  },
  addressContainer: {
    color: "hsl(30, 80%, 40%)",
  },
  phoneContainer: {
    display: "flex",
    alignItems: "center",
  },
  buttonContainer: {
    display: "flex",
    gap: "1rem",
  },
  transactionItemContainer: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    columnGap: "0.5rem",
  },
  transactionItem: {
    display: "flex",
    alignItems: "center",
  },
};

export default function RestaurantInfo({ restaurant }) {
  const { address, location, phone, transactions } = restaurant;
  const { address1, city, state, zip_code } = address;
  const [longitude, latitude] = location.coordinates;

  const phoneNumber = formatPhoneNumber(phone);

  return (
    <div style={classes.container}>
      <div className="info-container">
        <div className="contact-container">
          <div style={classes.addressContainer}>
            {address1} {city}, {state} {zip_code}
          </div>
          <div style={classes.phoneContainer}>
            <PhoneIcon style={{ color: "#13a10b" }} />
            <a style={{ color: "#13a10b" }} href={`tel: ${phoneNumber}`}>
              {phoneNumber}
            </a>
          </div>
        </div>
        <div style={classes.buttonContainer}>
          <RedirectButton image={YelpLogo} url={restaurant.yelp_url} />
          <RedirectButton
            image={GoogleMapsLogo}
            url={`https://www.google.com/maps/search/${latitude},${longitude}`}
          />
        </div>
      </div>
      <div style={classes.transactionItemContainer}>
        {transactions.sort().map((transaction) => (
          <span style={classes.transactionItem} key={transaction}>
            <TransactionItem
              transaction={transaction}
              style={{ color: "hsl(25, 85%, 57.5%)" }}
            />
          </span>
        ))}
      </div>
    </div>
  );
}
