import { Box, Button, InputAdornment, TextField } from "@mui/material";
import { makeStyles } from "@mui/styles";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import { Trip } from "../../Models/trip";
const useStyles = makeStyles({
  form: {
    padding: 30,
  },
  formItem: {
    marginBottom: 25,
    marginRight: 20,
  },
});
interface Props {
  handleSnackBarClick: () => void;
}
export default observer(function CreateEditTripForm({
  handleSnackBarClick,
}: Props) {
  const { tripStore } = useStore();
  const classes = useStyles();

  const { selectedTrip, closeModalForm, createTrip, updateTrip } = tripStore;

  const initialState = selectedTrip ?? {
    id: "",
    title: "",
    author: "",
    shortDescription: "",
    description: "",
    startDate: null,
    endDate: null,
    picCoverUrl: "",
    rating: null,
    location: "",
    cost: "",
    duration: "",
  };

  const [trip, setTrip] = useState(initialState);

  function handleInputChange(
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setTrip({ ...trip, [name]: value });
  }

  function handelSubmit(event: FormEvent) {
    event.preventDefault();
    trip.id ? updateTrip(trip as Trip) : createTrip(trip as Trip);
    handleSnackBarClick();
  }

  return (
    <>
      <form onSubmit={handelSubmit} className={classes.form} autoComplete="off">
        {/* title */}
        <div className={classes.formItem}>
          <TextField
            id="title"
            label="Title"
            value={trip.title}
            name="title"
            onChange={handleInputChange}
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
              value={trip.startDate}
              name="startDate"
              onChange={handleInputChange}
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
              value={trip.endDate}
              name="endDate"
              onChange={handleInputChange}
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
            value={trip.picCoverUrl}
            name="picCoverUrl"
            onChange={handleInputChange}
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
              value={trip.cost}
              name="cost"
              onChange={handleInputChange}
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
              value={trip.duration}
              name="duration"
              onChange={handleInputChange}
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
              value={trip.rating}
              name="rating"
              onChange={handleInputChange}
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
            value={trip.location}
            name="location"
            onChange={handleInputChange}
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
            value={trip.description}
            name="description"
            onChange={handleInputChange}
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
            color="primary"
            type="submit"
            sx={{ mr: 5 }}
          >
            Create
          </Button>
          <Button variant="outlined" onClick={closeModalForm} color="secondary">
            Cancel
          </Button>
        </div>
      </form>
    </>
  );
});
