import React, { useEffect } from "react";
import TripDashboard from "../Trip-Dashboard/TripDashboard";
// import { makeStyles } from "@mui/styles";
import LoadingPage from "../LoadingPage/Loding";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

//{Style
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
//}

export default observer(function Home() {
  const { tripStore } = useStore();

  useEffect(() => {
    tripStore.loadTrips();
  }, [tripStore]);

  if (tripStore.loadingInitial)
    return (
      <LoadingPage
        loading={tripStore.loadingInitial}
        content="Loading content.."
      />
    );
  return (
    <>
      {/* <Box className={classes.headerImage}></Box> */}
      <TripDashboard />
    </>
  );
});
