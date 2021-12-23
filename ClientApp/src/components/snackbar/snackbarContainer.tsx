import { Snackbar } from "@mui/material";
import React, { forwardRef, SyntheticEvent } from "react";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default observer(function SnackBarContainer() {
  const {
    snackbarStore: { closeSnackBar, snackbar },
  } = useStore();
  //   SnackBar function
  const handleSnackBarClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    closeSnackBar();
  };
  return (
    <>
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbar.body}
        </Alert>
      </Snackbar>
    </>
  );
});
