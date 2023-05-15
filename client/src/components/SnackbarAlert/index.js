import { Alert, Snackbar } from "@mui/material";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideSnackbar } from "../../store/reducers/snackbar";

export default function SnackbarAlert() {
  const dispatch = useDispatch();
  const snackbarStatus = useSelector((state) => state.snackbar);
  const TIMEOUT_MS = 1500;

  function closeSnackbar(event, reason) {
    if (reason === "clickaway") return;

    dispatch(hideSnackbar());
  }

  return (
    <Snackbar
      open={snackbarStatus.show}
      autoHideDuration={TIMEOUT_MS}
      onClose={closeSnackbar}
    >
      <Alert
        severity={snackbarStatus.severity}
        onClose={closeSnackbar}
        sx={{ border: "2px solid gray" }}
      >
        {snackbarStatus.message}
      </Alert>
    </Snackbar>
  );
}
