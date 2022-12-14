import type { GetStaticProps, NextPage } from "next";
import { useState, useEffect } from "react";
import { Secret, sign } from "jsonwebtoken";
import Map from "../components/map";

const Index: NextPage = (props) => {
  return (
    <>
      <div id="home">
        <div className="flex justify-center my-8">
          <div className="w-3/4 md:w-2/3 lg:w-1/2">
            <video autoPlay loop muted className=''>
              <source
                src='lewlights-hero.mp4'
                type='video/mp4'
              />
            </video>
          </div>
        </div>
      </div>
      <div id="status">
        <div className="text-gray-200">
          <h2 className="text-xl mb-2">
            Currently Playing <b>{ props.currentSequence.currentSequence }</b>.
          </h2>
          <h2 className="text-lg">
            Current Playlist
          </h2>
          <ul>
            { props.sequences.filter((sequence) => sequence.sequenceVisible).map((sequence) => {
              return (
                <li>{ sequence.sequenceName }</li>
              )
            })}
          </ul>
        </div>
        <div className="text-gray-200 my-6">
          <h4 className="text-xl mb-2">
            Have a great year!
          </h4>
        </div>
      </div>
      <div id="map">
        <Map />
      </div>
    </>
    );
};

async function fetchRemoteFalconJson(jwt: String, path: String): Promise<JSON> {
  const res = await fetch(
    `https://remotefalcon.com/remotefalcon/api/external/subdomain/${path}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }
  );
  return await res.json();
}

export const getServerSideProps: GetStaticProps = async (context) => {
  console.log("getting server side props");
  console.dir(context);
  const accessToken = process.env.REMOTEFALCON_ACCESS_TOKEN || 'example-token';
  const secretKey: Secret = process.env.REMOTEFALCON_SECRET_KEY || 'example-secret';
  const jwt = sign({ accessToken }, secretKey);
  const [sequences, currentSequence, nextSequence ] = await Promise.all(
    [
      fetchRemoteFalconJson(jwt, 'lewlights/sequences'),
      fetchRemoteFalconJson(jwt, 'lewlights/currentlyPlaying'),
      fetchRemoteFalconJson(jwt, 'lewlights/nextSequenceInQueue'),
    ]
  );
  let props = { sequences, currentSequence, nextSequence };
  console.dir(props);
  return { props };
}

export default Index;
