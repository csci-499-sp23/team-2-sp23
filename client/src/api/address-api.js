import axios from "axios";

export default async function getAddress(latitude, longitude) {
  const addressMatch = await axios({
    method: "get",
    url: "https://maps.googleapis.com/maps/api/geocode/json",
    params: {
      latlng: `${latitude}, ${longitude}`,
      key: process.env.REACT_APP_GOOGLE_API_KEY,
    },
  }).then((response) => {
    return response.data.results[0].formatted_address;
  });

  return addressMatch;
}
