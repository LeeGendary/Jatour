import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

// const accessToken = ;

export default function MapContainer() {
  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoia2FsaWJhaCIsImEiOiJja3hpZHQ2cjgzY2VuMzJyeWhhYzRsOTBjIn0.teU3fYuLxtTwg_q_FGZiww"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
}
