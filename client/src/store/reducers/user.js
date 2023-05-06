import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  logged_in: false,
  _id: null,
  auth0_id: null,
  username: null,
  profile_picture_url: null,
  saved_restaurants: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      const user = action.payload;
      state.logged_in = true;
      state._id = user._id;
      state.auth0_id = user.auth0_id;
      state.username = user.username;
      state.profile_picture_url = user.profile_picture_url;
      state.saved_restaurants = user.saved_restaurants;
    },
    logout: (state, action) => {
      state.logged_in = false;
      state.auth0_id = null;
      state.username = null;
      state.profile_picture_url = null;
      state.saved_restaurants = [];
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
