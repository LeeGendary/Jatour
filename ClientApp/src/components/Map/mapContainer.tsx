import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import ReactMapGL from "react-map-gl";

// mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_ACCESS_TOKEN || " ";

export default function MapContainer() {
  // const mapContainer = useRef(null);
  // const map = useRef(null);
  // const [lng, setLng] = useState(-70.9);
  // const [lat, setLat] = useState(42.35);
  // const [zoom, setZoom] = useState(9);
  // const mapContainerRef = useRef(null);

  const [viewport, setViewport] = useState({
    width: "100%",
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  // useEffect(() => {
  //   if (map.current) return; // initialize map only once
  //   map.current = new mapboxgl.Map({
  //     container: mapContainer.current,
  //     style: "mapbox://styles/mapbox/streets-v11",
  //     center: [lng, lat],
  //     zoom: zoom,
  //   });
  // }, []);

  return (
    // <div>
    //   <div ref={mapContainer} className="map-container" />
    // </div>

    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken="pk.eyJ1Ijoia2FsaWJhaCIsImEiOiJja3hpZHQ2cjgzY2VuMzJyeWhhYzRsOTBjIn0.teU3fYuLxtTwg_q_FGZiww"
      mapStyle="mapbox://styles/mapbox/streets-v11"
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
}
