import React from "react";
import type { NextPage } from "next";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

const style = {
  minHeight: "400px",
  maxWidth: "100%"
}

const center = {lat: 35.14, lng: -89.85};
const pos = { lat: 35.25350, lng: -89.71314 };
const apiKey = "AIzaSyCkl3_x1NNVCQfvdVpMH1B044P_7bNjJN8";

const Map: NextPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'map-script',
    googleMapsApiKey: apiKey,
  })

  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds();
    bounds.extend(center);
    bounds.extend(pos);
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, []);

  return isLoaded ? (
    <div className="min-h-40">
      <GoogleMap
        mapContainerStyle={style}
        center={center}
        zoom={10}
        onLoad={onLoad}
        onUnmount={onUnmount}>

        <Marker 
          position={pos}
          label="lewlights"/>
      </GoogleMap>
    </div>
  ) : <>loading...</>
};

export default Map;
