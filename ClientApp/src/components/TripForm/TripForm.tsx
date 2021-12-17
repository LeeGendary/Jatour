import { Button, Container, Modal, Snackbar, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { forwardRef, SyntheticEvent, useState } from "react";
import CreateEditTripForm from "../Form/CreateEditTrip";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

const useStyles = makeStyles({
  Modal: {
    width: 550,
    margin: "auto",
  },
  container: {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "100%",
    backgroundColor: "white",
  },
  button: {
    textDecoration: "none",
    background: "linear-gradient(to right, #ff5f6d, #ffc371);",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px #ff5f6cdd",
    color: "white !important",
    height: 48,
    width: "100%",
    padding: "0 30px",
  },
});

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export default observer(function TripFormModal() {
  const { tripStore } = useStore();
  const [openSnackbar, setSnackbar] = useState(false);

  const handleOpenModal = () => {
    tripStore.openModalForm(tripStore.selectedTrip?.id);
  };
  const handleModalClose = () => {
    tripStore.closeModalForm();
  };
  //   SnackBar function
  const handleSnackBarClick = () => {
    setSnackbar(true);
    handleModalClose();
  };
  const handleSnackBarClose = (
    event?: SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbar(false);
  };

  const classes = useStyles();
  return (
    <>
      <Button
        sx={{ mb: 2 }}
        className={classes.button}
        onClick={handleOpenModal}
        size="medium"
      >
        Create Trip
      </Button>
      {/* Modal Form */}
      <Modal
        className={classes.Modal}
        open={tripStore.editMode}
        onClose={tripStore.closeModalForm}
      >
        <Container className={classes.container}>
          <Typography
            variant="h4"
            component="h4"
            gutterBottom
            sx={{ m: 2, textAlign: "center" }}
          >
            Add Trip <span role="img">😉</span>
          </Typography>
          <CreateEditTripForm handleSnackBarClick={handleSnackBarClick} />
        </Container>
      </Modal>
      {/* Snackbar */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleSnackBarClose}
      >
        <Alert
          onClose={handleSnackBarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          This is a success message!
        </Alert>
      </Snackbar>
    </>
  );
});
