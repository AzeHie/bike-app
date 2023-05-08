import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map: React.FC<{ y: number; x: number }> = (props) => {
  const mapRef = useRef<any>();

  useEffect(() => {
    const center = { lat: props.y, lng: props.x };

    const map = new window.google.maps.Map( // imported in index.html
      mapRef.current, 
      {
        center: center,
        zoom: 15,
      }
    );

    new window.google.maps.Marker({ position: center, map: map });
  }, [props.y, props.x]);

  return <div ref={mapRef} className="map" data-testid="map"></div>;
};

export default Map;
