import React, { useEffect, useRef, MutableRefObject } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

const style = {
  minHeight: "400px",
  maxWidth: "100%",
};
const center = { lat: 35.15214586165782, lng: -89.83190139211116 };
const position = {lat: 35.25339620205391, lng: -89.71305174978197 };
const apiKey = "AIzaSyCkl3_x1NNVCQfvdVpMH1B044P_7bNjJN8";

const render = (status: Status) => {
  return <h1>{status}</h1>;
};

const LewMap: React.FC = () => {
  const ref = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    const map = new window.google.maps.Map(ref.current, {
      center,
      zoom: 10,
    });
    new google.maps.Marker({ position, map });
  });

  return <div ref={ref} id="LewLightsMap" style={style} />;
}

const ShowMap: React.FC = () => {
  return (
    <Wrapper apiKey={apiKey} render={render}>
      <LewMap />
    </Wrapper>
  );
}

export default ShowMap;
