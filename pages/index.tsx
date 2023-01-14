import type { GetStaticProps } from "next";
import { useState, useEffect } from 'react'
import { Secret, sign } from "jsonwebtoken";
import { CurrentSequenceData, SequenceData } from "../interfaces"
import OfflineStatus from "../components/OfflineStatus";
import PlayingNow from "../components/PlayingNow";
import PlayingNext from "../components/PlayingNext";
import Playlist from "../components/Playlist";
import ErrorFlash from "../components/ErrorFlash";
import ShowMap from "../components/ShowMap";
import Videos from "../components/Videos";

interface IndexProps {
  remoteFalconKey: string,
  googleMapsKey: string,
}

const Index = ({googleMapsKey, remoteFalconKey}: IndexProps) => {
  const [sequences, setSequences] = useState<SequenceData[]>([])
  const [currentSequence, setCurrentSequence] = useState<CurrentSequenceData | null>(null)
  const [nextSequence, setNextSequence ] = useState<CurrentSequenceData | null>(null);
  const [error, setError] = useState<string | null>(null);
  let logSetError = function(err: string) { console.error(err); setError(err); };

  let offlineDuration = getOfflineDuration();

  useEffect(() => {
    if (!offlineDuration) {
      fetchCurrentSequence(remoteFalconKey).then(setCurrentSequence).catch(logSetError);
      fetchNextSequence(remoteFalconKey).then(setNextSequence).catch(logSetError);
      fetchSequences(remoteFalconKey).then(setSequences).catch(logSetError);
    }
  }, [remoteFalconKey, offlineDuration]);

  return (
    <div className="text-gray-300 text-center">
      <div className="flex justify-center my-4">
        <div className="w-3/4 md:w-2/3">
          <video autoPlay loop muted className=''>
            <source
              src='lewlights-hero.mp4'
              type='video/mp4'
            />
          </video>
        </div>
      </div>
      <div id="about" className="my-8">
        <h2 className="underline my-4">About</h2>
        <p className="my-4">
          LewLights is a holiday light show by the Lewis family in Lakeland, TN.
          We would love to have you stop for a bit to watch and listen. 
        </p>
        <p>
          Please turn off your headlights and avoid blocking any driveways. 
          Tune in via <b>FM 90.5 </b> to enjoy from your vehicle.
          And remember: <span className="text-red-600">DO NOT PRESS THE BUTTON!</span> &#x1F609;
        </p>
      </div>
      <div id="status" className="my-8">
        <h2 className="underline my-4">Show Status</h2>
        { offlineDuration && <OfflineStatus duration={offlineDuration} /> }
        { error && <ErrorFlash /> }
        { currentSequence && <PlayingNow currentSequence={ currentSequence } /> }
        { nextSequence && <PlayingNext nextSequence={ nextSequence } /> }
        { sequences && <Playlist sequences={ sequences } /> }
        <p>The show typically runs from Sunset to 9pm CST, from Halloween to New Years Day.</p>
      </div>
      <div id="donate" className="my-8">
        <h2 className="underline my-4">Support our Show</h2>
        <p>
          In lieu of direct support, consider donating to the <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://supportlakelandschools.org/">Lakeland Education Foundation</a> by voting for &quot;LewLights&quot; in the <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://lakelandchristmaslights.bubbleapps.io/">Lakeland Festival of Lights</a>.
        </p>
        <div className="my-6">
          <a href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=5WBELQ5LFXXTQ" className="px-4 py-3 text-blue-100 no-underline bg-blue-500 rounded hover:bg-blue-600 hover:underline hover:text-blue-200">Vote for LewLights</a>
        </div>
      </div>
      <div id="map" className="my-8">
        <h2 className="underline my-4">Our Location and Map</h2>
        <ShowMap googleMapsApiKey={ googleMapsKey }/>
      </div>
      <div id="videos" className="my-8">
        <h2 className="underline my-4">Our Present and Past Videos</h2>
        <Videos />
      </div>
    </div>
    );
};

function getGoogleMapsKey(): string {
  return process.env.GOOGLEMAPS_API_KEY || 'example-google-maps-token';
}

function getRemoteFalconKey(): string {
  const accessToken = process.env.REMOTEFALCON_ACCESS_TOKEN || 'example-remote-falcon-token';
  const secretKey: Secret = process.env.REMOTEFALCON_SECRET_KEY || 'example-remote-falcon-secret';
  return sign({ accessToken }, secretKey);
}

async function fetchRemoteFalconData(jwt: string, path: string): Promise<any | null> {
  let res = await fetch(
    `https://remotefalcon.com/remotefalcon/api/external/subdomain/${path}`, {
      method: 'GET',
      headers: new Headers({
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      })
    }
  );
  switch (res.status) {
    case 200:
      return await res.json();
    case 204:
      return null;
    default:
      let body = await res.text()
      throw `Error retrieving show data: ${ body }`;
  }
}

async function fetchSequences(jwt: string): Promise<SequenceData[]> {
  return await fetchRemoteFalconData(jwt, "lewlights/sequences");
}

async function fetchCurrentSequence(jwt: string): Promise<CurrentSequenceData> {
  return await fetchRemoteFalconData(jwt, "lewlights/currentlyPlaying");
}

async function fetchNextSequence(jwt: string): Promise<CurrentSequenceData> {
  return await fetchRemoteFalconData(jwt, "lewlights/nextSequenceInQueue");
}

function getOfflineDuration(): string | null {
  let now = new Date(Date.now());
  let month = now.getMonth() + 1;
  let day = now.getDate();
  // February to September
  if (month > 1 && month < 10) {
    return 'season';
  }
  // October 1-27
  if (month == 10 && day < 28) {
    return 'season';
  }
  // January 5-31
  if (month == 1 && day > 4) {
    return 'season';
  }
  let currentHour = parseInt(now.toLocaleString('en-US', {hour: '2-digit',   hour12: false, timeZone: 'America/Chicago' }));
  // 10pm to 5pm
  if (currentHour < 17 || currentHour > 21) {
    return 'evening';
  }
  return null;
}

export const getServerSideProps: GetStaticProps = async (context) => {
  return { props: { googleMapsKey: getGoogleMapsKey(), remoteFalconKey: getRemoteFalconKey() } };
}

export default Index;
