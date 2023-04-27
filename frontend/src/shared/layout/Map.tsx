import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map: React.FC<{ y: number; x: number }> = (props) => {
  const mapRef = useRef<any>();

  useEffect(() => {
    const center = { lat: props.y, lng: props.x };

    const map = new window.google.maps.Map(
      mapRef.current, // imported in index.html
      {
        center: center,
        zoom: 15,
      }
    );

    new window.google.maps.Marker({ position: center, map: map });
  }, [props.y, props.x]);

  return <div ref={mapRef} className="map"></div>;
};

export default Map;
