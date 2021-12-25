import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import { useParams } from "react-router";
import { useStore } from "../../stores/store";
import MapContainer from "../../components/Map/mapContainer";
import { useHistory } from "react-router-dom";
import TripListAttendee from "../../components/TripListAttendee/TripListAttendee";
import { LoadingButton } from "@mui/lab";

//Style
const useStyles = makeStyles({
  headerImage: {
    width: "100vw",
    height: "60vh",
    backgroundSize: "cover",
    backgroundPosition: "center",
    overflow: "hidden",
    objectFit: "cover",
    transform: "translate3d(0px, 18.6667px, 0px)",
    // clipPath: "polygon( 0 0, 100% 0, 100% calc(100% - 5vw ), 0 100% )",
  },
});

export default observer(function TripDetails() {
  const history = useHistory();
  const { tripStore } = useStore();
  const { updateAttendance, loading, selectedTrip: trip, loadTrip } = tripStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (id) loadTrip(id);
  }, [id, loadTrip]);

  const classes = useStyles();
  return (
    <Grid container direction="row">
      <Grid
        item
        className={classes.headerImage}
        sx={{ backgroundImage: `url("${trip?.picCoverUrl}")` }}
      ></Grid>

      <Grid item container justifyContent="center" sx={{ mt: -8, zIndex: 30 }}>
        <Grid item xs={12} sm={10} md={10}>
          <Paper elevation={4} sx={{ padding: 10 }}>
            <Typography
              variant="h3"
              sx={{
                fontSize: "2.25rem",
                fontWeight: 700,
                textTransform: "uppercase",
                backgroundImage:
                  "linear-gradient( to bottom right, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85) )",
                color: "transparent",
                lineHeight: 1.3,
                backgroundClip: "text",
                textAlign: "center",
              }}
            >
              {trip?.title}
            </Typography>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                lineHeight: 1.3,
                backgroundImage:
                  "linear-gradient( to bottom right, rgba(125, 213, 111, 0.85), rgba(40, 180, 135, 0.85) )",
                color: "transparent",
                backgroundClip: "text",
                textAlign: "center",
              }}
            >
              Hosted by {trip?.host?.displayName}
            </Typography>

            <Typography gutterBottom variant="body1">
              {trip?.description}
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat
              nulla pariatur. Duis aute irure dolor in reprehenderit in
              voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui
              officia deserunt mollit anim id est laborum!
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: 4,
              }}
            >
              <Button variant="outlined" onClick={() => history.push("/home")}>
                Go back to homepage
              </Button>
              {trip?.isHost ? (
                <Button
                  variant="contained"
                  color="warning"
                  onClick={() => history.push(`/manage/${trip.id}`)}
                >
                  Manage Trip
                </Button>
              ) : (
                <LoadingButton
                  loading={loading}
                  variant="contained"
                  onClick={updateAttendance}
                  size="large"
                  color={trip?.isGoing ? "error" : "success"}
                >
                  {trip?.isGoing ? "Cancel attendance" : "Join Trip"}
                </LoadingButton>
              )}
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Grid item container sx={{ m: 10 }}>
        <Grid item sm={8}>
          <Paper elevation={3}>
            <MapContainer />
          </Paper>
        </Grid>
        <Grid item sm={4} sx={{ padding: 10 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: "2.25rem",
              fontWeight: 700,
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(to right, #7dd56f, #28b487)",
              color: "transparent",
              lineHeight: 1.3,
              backgroundClip: "text",
            }}
          >
            Quick Facts
          </Typography>
          <Typography variant="body1">{trip?.description}</Typography>
          <Typography
            variant="h3"
            sx={{
              fontSize: "2.25rem",
              fontWeight: 700,
              textTransform: "uppercase",
              backgroundImage: "linear-gradient(to right, #7dd56f, #28b487)",
              color: "transparent",
              lineHeight: 1.3,
              backgroundClip: "text",
            }}
          >
            Attendees
          </Typography>
          <Box sx={{ mt: 2 }}>
            <TripListAttendee attendees={trip?.attendees!} />
          </Box>
        </Grid>
      </Grid>
    </Grid>
  );
});
