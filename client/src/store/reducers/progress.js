import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  finishedLoading: false,
};

export const progressSlice = createSlice({
  name: "progress",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setFinished: (state, action) => {
      state.finishedLoading = action.payload;
    },
  },
});

export const { setLoading, setFinished } = progressSlice.actions;
export default progressSlice.reducer;
