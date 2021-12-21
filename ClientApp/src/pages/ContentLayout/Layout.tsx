import DateAdapter from "@mui/lab/AdapterDateFns";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import { Avatar, AvatarGroup, Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import TripDashboard from "../Trip-Dashboard/TripDashboard";
import { deepOrange, deepPurple } from "@mui/material/colors";

export default function Layout() {
  const [date, setDate] = useState<Date | null>(new Date());
  return (
    <Grid container spacing={3}>
      {/* Left Bar */}
      <Grid item xs={2} md={4}>
        <Container>
          <Paper square={false} elevation={3}>
            <LocalizationProvider dateAdapter={DateAdapter}>
              <CalendarPicker
                date={date}
                onChange={(newDate) => setDate(newDate)}
              />
            </LocalizationProvider>
          </Paper>
        </Container>
        {/* <AvatarGroup max={5}>
          <Avatar alt="Remy Sharp" src="https://bit.ly/3GK7f8a" />
          <Avatar sx={{ bgcolor: deepOrange[500] }}>N</Avatar>
          <Avatar alt="Alba Sharp" src="https://bit.ly/30tqgMt" />
          <Avatar alt="Chris Sharp" src="https://bit.ly/3m3jg0A" />
          <Avatar sx={{ bgcolor: deepPurple[500] }}>OP</Avatar>
          <Avatar alt="John Sharp" src="https://bit.ly/30tqgMt" />
          <Avatar>H</Avatar>
          <Avatar></Avatar>
        </AvatarGroup> */}
      </Grid>
      {/* Content */}
      <Grid item xs={10} sm={10} md={8}>
        <TripDashboard />
      </Grid>
    </Grid>
  );
}

{
  /* ===========================
 <Typography variant="h6" gutterBottom>
        Members
      </Typography>
       */
}
{
  /*  */
}
