/*global google*/
import { useEffect, useState } from "react";

export default function useDirectionService() {
  const [navigationPath, setPath] = useState(null);
  const [navigationSteps, setSteps] = useState(null);

  function retrieveDirections(response) {
    setSteps(response.routes[0].legs);

    setPath(response);
  }

  const restaurantLocation = (restaurant) => {
    const { coordinates } = restaurant.location;
    const [longitude, latitude] = coordinates;

    return {
      location: { lng: longitude, lat: latitude },
      // stopover: true,
    };
  };

  const DirectionsService = new google.maps.DirectionsService();

  const resultCallback = (result, status) => {
    if (status === google.maps.DirectionsStatus.OK) {
      retrieveDirections(result);
    } else {
      console.error(`error fetching directions ${result}`);
    }
  };

  function navigate(location, restaurants) {
    DirectionsService.route(
      {
        origin: new google.maps.LatLng(location.latitude, location.longitude),
        destination: new google.maps.LatLng(
          location.latitude,
          location.longitude
        ),
        travelMode: google.maps.TravelMode.WALKING,
        waypoints: restaurants.map((restaurant) =>
          restaurantLocation(restaurant)
        ),
      },
      resultCallback
    );
  }

  return { navigationPath, navigationSteps, navigate };
}
