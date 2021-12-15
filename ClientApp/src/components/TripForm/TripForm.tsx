import {
  Box,
  Button,
  Container,
  InputAdornment,
  Modal,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import React, { forwardRef, SyntheticEvent, useState } from "react";

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
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white !important",
    height: 48,
    width: "100%",
    padding: "0 30px",
  },
  form: {
    padding: 30,
  },
  formItem: {
    marginBottom: 25,
    marginRight: 20,
  },
});

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function TripFormModal() {
  const [open, setOpen] = useState(false);
  //   const [startDate, setStartDate] = useState<Date | null>(null);
  const [openSnackbar, setSnackbar] = useState(false);
  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  //   SnackBar function
  const handleSnackBarClick = () => {
    setSnackbar(true);
    handleClose();
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
        onClick={() => setOpen(true)}
        size="medium"
      >
        Create Trip
      </Button>
      {/* Modal Form */}
      <Modal className={classes.Modal} open={open} onClose={handleClose}>
        <Container className={classes.container}>
          <Typography
            variant="h4"
            component="h4"
            gutterBottom
            sx={{ m: 2, textAlign: "center" }}
          >
            Add Trip 😉
          </Typography>
          <form className={classes.form} autoComplete="off">
            {/* title */}
            <div className={classes.formItem}>
              <TextField
                id="title"
                label="Title"
                size="small"
                variant="outlined"
                fullWidth
              />
            </div>
            <Box sx={{ display: "flex" }}>
              {/* startDate: Date; */}
              <div className={classes.formItem}>
                <TextField
                  label="Start-Date"
                  type="date"
                  size="small"
                  variant="outlined"
                  placeholder="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
              {/* endDate: Date; */}
              <div className={classes.formItem}>
                <TextField
                  label="End-Date"
                  type="date"
                  size="small"
                  variant="outlined"
                  placeholder="2017-05-24"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </div>
            </Box>
            {/* picCoverUrl: string */}
            <div className={classes.formItem}>
              <TextField
                id="picCover"
                label="Cover Picture"
                size="small"
                variant="outlined"
                fullWidth
              />
            </div>

            <Box sx={{ display: "flex" }}>
              {/* cost: number */}
              <div className={classes.formItem}>
                <TextField
                  id="amount"
                  size="small"
                  variant="outlined"
                  placeholder="Cost.."
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              </div>
              {/* Duration */}
              <div className={classes.formItem}>
                <TextField
                  id="duration"
                  label="Duration"
                  size="small"
                  variant="outlined"
                />
              </div>
              {/* rating */}
              <div className={classes.formItem}>
                <TextField
                  id="rating"
                  label="Rating"
                  size="small"
                  variant="outlined"
                />
              </div>
            </Box>
            {/* Location */}
            <div className={classes.formItem}>
              <TextField
                id="location"
                label="Location"
                size="small"
                variant="outlined"
                fullWidth
              />
            </div>
            {/* shortDescription: string; */}
            {/* description: string; */}
            <div className={classes.formItem}>
              <TextField
                id="outlined-multiline-static"
                label="Description"
                variant="outlined"
                multiline
                rows={4}
                placeholder="Tell your experience..."
                fullWidth
              />
            </div>

            {/* Button */}
            <div className={classes.formItem}>
              <Button
                variant="outlined"
                onClick={handleSnackBarClick}
                color="primary"
                sx={{ mr: 5 }}
              >
                Create
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
              >
                Cancel
              </Button>
            </div>
          </form>
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
}
