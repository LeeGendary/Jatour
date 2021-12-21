import React, { useEffect } from "react";
import TripDashboard from "../Trip-Dashboard/TripDashboard";
// import { makeStyles } from "@mui/styles";
import LoadingPage from "../LoadingPage/Loding";
import { useStore } from "../../stores/store";
import { observer } from "mobx-react-lite";

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
  return <></>;
});
