import React, { useEffect, useState } from "react";
import axios from "axios";
import { Trip } from "../../Models/trip";
import TripDashboard from "../Trip-Dashboard/TripDashboard";
import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
//Style
const useStyles = makeStyles({
  headerImage: {
    display: "flex",
    position: "relative",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundImage:
      'url("https://demos.creative-tim.com/material-kit-pro-react/static/media/bg4.88963029.jpg")',
    height: "50vh",
    overflow: "hidden",
    transform: "translate3d(0px, 18.6667px, 0px)",
  },
});

export default function Home() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const classes = useStyles();
  useEffect(() => {
    axios.get<Trip[]>("api/Trips").then((res) => {
      const data = res.data;
      setTrips(data);
    });
  }, []);

  return (
    <>
      {/* <Box className={classes.headerImage}></Box> */}
      <TripDashboard trips={trips} />
    </>
  );
}
