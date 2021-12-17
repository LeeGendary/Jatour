import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import TripCard from "../../components/tripCard/tripCard";
import LeftBar from "../LeftBar/LeftBar";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

export default observer(function TripDashboard() {
  const { tripStore } = useStore();
  const { tripsByDate } = tripStore;
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={2}>
        <LeftBar />
      </Grid>
      <Grid item xs={8} md={10}>
        <Container
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: "repeat(3, 1fr)",
            pt: 4,
          }}
        >
          {tripsByDate.map((tripItem) => (
            <TripCard key={tripItem.id} trip={tripItem} />
          ))}
        </Container>
      </Grid>
    </Grid>
  );
});
