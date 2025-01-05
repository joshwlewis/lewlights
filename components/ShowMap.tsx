import React, { useEffect, useRef, useMemo, MutableRefObject } from "react";
import { Status, Wrapper } from "@googlemaps/react-wrapper";

const style = {
  minHeight: "400px",
  maxWidth: "100%",
};
const center = { lat: 35.15214586165782, lng: -89.83190139211116 };
const position = {lat: 35.25343461415069, lng: -89.71307042010265 };

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
  }, [ref]);

    return <>
    <a className="underline text-blue-500 hover:text-blue-400 visited:text-purple-600"
        target="_blank" rel="noreferrer"
        href= { `https://www.google.com/maps/search/?api=1&query=${position.lat}%2C${position.lng}&query_place_id=ChIJk3lQSEp1f4gR-10_YH4unHU` }>
            10480 Mount McKenzie Rd, Lakeland TN
        </a>
        <div ref={ref} id="LewLightsMap" style={style} />
    </>
}

interface ShowMapProps {
  googleMapsApiKey: string
}

const ShowMap= ({ googleMapsApiKey }: ShowMapProps) => {
  return (
    <Wrapper apiKey={googleMapsApiKey} render={render}>
      <LewMap />
    </Wrapper>
  );
}

export default ShowMap;
