import DateAdapter from "@mui/lab/AdapterDateFns";
import { CalendarPicker, LocalizationProvider } from "@mui/lab";
import { Container, Grid, Paper } from "@mui/material";
import React, { useState } from "react";
import TripDashboard from "../Trip-Dashboard/TripDashboard";

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
      </Grid>
      {/* Content */}
      <Grid item xs={10} sm={10} md={8}>
        <TripDashboard />
      </Grid>
    </Grid>
  );
}
