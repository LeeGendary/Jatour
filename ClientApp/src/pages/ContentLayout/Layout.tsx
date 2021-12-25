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
    borderRadius: "10px",
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
    <Grid container spacing={2} sx={{ mt: 10, justifyContent: "center" }}>
      {/* Left Bar */}
      <Grid item sm={2} md={2} sx={{ backgroundColor: "white", m: 2 }}>
        <Paper sx={{ m: 2, p: 2 }} elevation={3}>
          <Typography variant="h5">Members</Typography>
          <AvatarGroup max={4}>
            <Avatar
              alt="Remy Sharp"
              src="https://mui.com/static/images/avatar/1.jpg"
              key="Remy Sharp"
            />
            <Avatar
              alt="Travis Howard"
              src="https://mui.com/static/images/avatar/2.jpg"
              key="Travis Howard"
            />
            <Avatar
              alt="Cindy Baker"
              src="https://mui.com/static/images/avatar/3.jpg"
              key="Cindy Baker"
            />
            <Avatar
              alt="Agnes Walker"
              src="https://mui.com/static/images/avatar/4.jpg"
              key="Agnes Walker"
            />
            <Avatar
              alt="Trevor Henderson"
              src="https://mui.com/static/images/avatar/5.jpg"
              key="Trevor Henderson"
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
                  key={items.label}
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
      <Grid item xs={12} sm={9} md={9}>
        <TripDashboard />
      </Grid>
    </Grid>
  );
}
