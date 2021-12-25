import { Grid } from "@mui/material";
import React, { useEffect } from "react";
import TripCard from "../../components/tripCard/tripCard";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";
import LoadingPage from "../LoadingPage/Loding";

export default observer(function TripDashboard() {
  const { tripStore } = useStore();
  const { tripsByDate } = tripStore;
  useEffect(() => {
    tripStore.loadTrips();
  }, [tripStore]);

  if (tripStore.loadingInitial)
    return (
      <LoadingPage loading={tripStore.loading} content="Loading Trips.." />
    );
  return (
    <Grid
      container
      spacing={2}
      sx={{
        gridTemplateColumns: "repeat(auto-fit, minmax(550, 1fr))",
      }}
      // xs={12}
      // sm={12}
      // md={6}
      // lg={4}
    >
      {tripsByDate.map((tripItem) => (
        <Grid item key={tripItem.id}>
          <TripCard key={tripItem.id} trip={tripItem} />
        </Grid>
      ))}
    </Grid>
  );
});
