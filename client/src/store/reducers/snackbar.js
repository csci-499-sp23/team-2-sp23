import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  show: false,
  severity: "info",
  message: "",
};

export const snackbarSlice = createSlice({
  name: "snackbar",
  initialState,
  reducers: {
    alertSnackbar: (state, action) => {
      const { severity, message } = action.payload;
      state.show = true;
      state.severity = severity;
      state.message = message;
    },
    hideSnackbar: (state, action) => {
      state.show = false;
    },
  },
});

export const { alertSnackbar, hideSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
