import React, { useEffect, useRef, MutableRefObject } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

const style = {
  minHeight: "400px",
  maxWidth: "100%"
};
const center = {lat: 35.14, lng: -89.85};
const position = { lat: 35.25350, lng: -89.71314 };
const apiKey = "AIzaSyCkl3_x1NNVCQfvdVpMH1B044P_7bNjJN8";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const LewMap: React.FC = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom: 4,
    });
    new google.maps.Marker({ position, map });
  });

  return <div ref={ref} id="LewLightsMap" />;
}

const ShowMap: React.FC = () => {
  return (
    <div style={style}>
      <Wrapper apiKey={apiKey} render={render}>
        <LewMap />
      </Wrapper>
    </div>
  );
}

export default ShowMap;
