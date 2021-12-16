import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Trip } from "../../Models/trip";
import TripDashboard from "../Trip-Dashboard/TripDashboard";
import { makeStyles } from "@mui/styles";
import agent from "../../api/agent";
import LoadingPage from "../LoadingPage/Loding";
//Style
// const useStyles = makeStyles({
//   headerImage: {
//     display: "flex",
//     position: "relative",
//     alignItems: "center",
//     backgroundSize: "cover",
//     backgroundImage:
//       'url("https://demos.creative-tim.com/material-kit-pro-react/static/media/bg4.88963029.jpg")',
//     height: "50vh",
//     overflow: "hidden",
//     transform: "translate3d(0px, 18.6667px, 0px)",
//   },
// });

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  useEffect(() => {
    agent.Trips.list().then((response) => {
      setTrips(response);
      setLoading(false);
    });
  }, []);

  function handleCreateOrEditTrip(trip: Trip) {
    setSubmitting(true);
    if (trip.id) {
      agent.Trips.update(trip).then(() => {
        setTrips([...trips.filter((x) => x.id !== trip.id), trip]);
        setEditMode(false);
        // setSubmitting(false);
      });
    } else {
      trip.id = uuidv4();
      agent.Trips.create(trip).then(() => {
        setTrips([...trips, trip]);
        setEditMode(false);
        // setSubmitting(false);
      });
    }
  }

  function handleDeleteTrip(id: string) {
    setTrips([...trips.filter((x) => x.id !== id)]);
  }

  if (loading)
    return <LoadingPage loading={loading} content="Loading content.." />;
  return (
    <>
      {/* <Box className={classes.headerImage}></Box> */}
      <TripDashboard trips={trips} createOrEdit={handleCreateOrEditTrip} />
    </>
  );
}
