import { Box, Container, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
// import { Trip } from "../../Models/trip";
import { useStore } from "../../stores/store";

//Style
const useStyles = makeStyles({
  headerImage: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    width: "100%",
    height: "50vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    objectFit: "cover",
    transform: "translate3d(0px, 18.6667px, 0px)",
  },
});

export default observer(function TripDetails() {
  const { tripStore } = useStore();
  const { selectedTrip: trip, loadTrip } = tripStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadTrip(id);
  }, [id, loadTrip]);

  const classes = useStyles();
  return (
    <>
      <Container>
        <Box
          className={classes.headerImage}
          sx={{ backgroundImage: `url("${trip?.picCoverUrl}")` }}
        ></Box>
        <Typography variant="h1">{trip?.title}</Typography>
        <Typography>{trip?.description}</Typography>
      </Container>
    </>
  );
});
