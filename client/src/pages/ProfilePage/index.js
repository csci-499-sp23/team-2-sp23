import React, { useEffect, useState } from "react";
import FallbackView from "./FallBackView";
import { parseQueryParams } from "../../utils/parseQueryParams";
import { useLocation } from "react-router-dom";
import { setLoading, setFinished } from "../../store/reducers/progress";
import { useSelector, useDispatch } from "react-redux";
import UserAPI from "../../api/user-api";
import ProfilePage from "./ProfilePage";

export default function Profile() {
  const progress = useSelector((state) => state.progress);
  const { search } = useLocation();
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  async function retreiveUserProfile(userId) {
    const userProfile = await UserAPI.userProfile(userId).catch(console.error);
    if (userProfile === null) return;
    setUser(userProfile);
  }

  useEffect(() => {
    const queryString = search.split("?")[1];
    const queryParams = parseQueryParams(queryString);
    const userId = queryParams.user_id;
    dispatch(setLoading(true));
    dispatch(setFinished(false));

    retreiveUserProfile(userId).finally(() => {
      dispatch(setFinished(true));
      setTimeout(() => {
        dispatch(setLoading(false));
      }, 400);
    });
  }, [search, dispatch]);
  return progress.finishedLoading &&
  (user ? (
    <ProfilePage user = {user} />
  ) : (
    <FallbackView />
  ));
}
