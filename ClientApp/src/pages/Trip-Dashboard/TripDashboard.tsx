import { Container } from "@mui/material";
import { Grid } from "@mui/material";
import React from "react";
import { Trip } from "../../Models/trip";
import TripCard from "../../components/tripCard/tripCard";
import LeftBar from "../LeftBar/LeftBar";

interface Props {
  trips: Trip[];
  createOrEdit: (trip: Trip) => void;
}

export default function TripDashboard({ trips, createOrEdit }: Props) {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} md={2}>
        <LeftBar createOrEdit={createOrEdit} />
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
          {trips.map((tripItem) => (
            <TripCard key={tripItem.id} trip={tripItem} />
          ))}
        </Container>
      </Grid>
    </Grid>
  );
}
