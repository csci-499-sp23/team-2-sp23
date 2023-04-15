import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { parseQueryParams } from "../../utils/parseQueryParams";
import RestaurantAPI from "../../api/restaurant-api";
import RestaurantView from "./RestaurantView";
import FallbackView from "./FallBackView";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setFinished } from "../../store/reducers/progress";

function Restaurant() {
  const dispatch = useDispatch();
  const progress = useSelector((state) => state.progress);
  const { search } = useLocation();
  const [restaurant, setRestaurant] = useState(null);
  const [foods, setFoods] = useState(null);

  async function retrieveRestaurant(yelpId) {
    const response = await RestaurantAPI.getRestaurantByYelpId(yelpId).catch(
      console.error
    );
    if (!response) return;

    setRestaurant(response.restaurant);
    setFoods(response.foods);
  }

  useEffect(() => {
    const queryString = search.split("?")[1];
    const queryParams = parseQueryParams(queryString);
    const yelpId = queryParams.yelp_id;
    dispatch(setLoading(true));
    dispatch(setFinished(false));

    retrieveRestaurant(yelpId).finally(() => {
      dispatch(setFinished(true));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 400);
    });
  }, [search, dispatch]);

  return (
    progress.finishedLoading &&
    (restaurant ? (
      <RestaurantView restaurant={restaurant} foods={foods} />
    ) : (
      <FallbackView />
    ))
  );
}

export default Restaurant;
