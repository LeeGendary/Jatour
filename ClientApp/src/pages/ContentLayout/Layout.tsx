import DateAdapter from "@mui/lab/AdapterDateFns";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import {
  Avatar,
  AvatarGroup,
  FormControl,
  FormControlLabel,
  Grid,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import TripDashboard from "../Trip-Dashboard/TripDashboard";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  calendar: {
    background: "white",
    boxShadow: "0 3px 10px rgb(0 0 0 / 0.2)",
    // border: "1px solid rgb(229, 232, 236)",
    borderRadius: "10px",
    overflow: "hidden",
    marginBottom: 10,
  },
});
const sortOptions = [
  { value: "name", label: "Alphabetical" },
  { value: "rating", label: "Rating - High to low" },
  { value: "cost", label: "Cost - High to low " },
];
export default function Layout() {
  const classes = useStyles();
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <Grid container spacing={1}>
      {/* Left Bar */}
      <Grid item xs={12} sm={4} md={2}>
        <Paper sx={{ m: 2, p: 2 }} elevation={3}>
          <Typography variant="h5">Members</Typography>
          <AvatarGroup max={4}>
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
            />
            <Avatar
              alt="Travis Howard"
              src="https://mui.com/static/images/avatar/2.jpg"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://mui.com/static/images/avatar/3.jpg"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://mui.com/static/images/avatar/4.jpg"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://mui.com/static/images/avatar/5.jpg"
            />
          </AvatarGroup>
        </Paper>
        <Paper sx={{ m: 2, p: 2 }} elevation={3}>
          <FormControl component="fieldset">
            <RadioGroup>
              {sortOptions.map((items) => (
                <FormControlLabel
                  value={items.value}
                  control={<Radio />}
                  label={items.label}
                />
              ))}
            </RadioGroup>
          </FormControl>
        </Paper>
        <LocalizationProvider dateAdapter={DateAdapter}>
          <CalendarPicker
            date={date}
            onChange={(newDate) => setDate(newDate)}
            className={classes.calendar}
          />
        </LocalizationProvider>
      </Grid>
      {/* Content */}
      <Grid item xs={12} sm={8} md={10}>
        <TripDashboard />
      </Grid>
    </Grid>
  );
}
