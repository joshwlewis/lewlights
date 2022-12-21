import type { GetStaticProps } from "next";
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
  offline: String | null,
  sequences: SequenceData[],
  currentSequence: CurrentSequenceData | null,
  nextSequence: CurrentSequenceData | null,
  errors: String[],
}

const Index = ({offline, currentSequence, nextSequence, sequences, errors}: IndexProps) => {
  let offlineStatus = offline ? <OfflineStatus status={offline} /> : null;
  let playingNow = currentSequence ? <PlayingNow currentSequence={currentSequence} /> : null;
  let playingNext = nextSequence ? <PlayingNext nextSequence={nextSequence} /> : null;
  let playlist = sequences ? <Playlist sequences={sequences} />: null;
  let errorFlash = errors.some((err) => err) ? <ErrorFlash />: null;
  return (
    <div className="text-gray-300 text-center">
      <div id="about" className="my-8">
        <div className="flex justify-center my-4">
          <div className="w-3/4 md:w-2/3 lg:w-1/2">
            <video autoPlay loop muted className=''>
              <source
                src='lewlights-hero.mp4'
                type='video/mp4'
              />
            </video>
          </div>
        </div>
        <h2 className="underline">About</h2>
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
        <h2 className="underline">Show Status</h2>
        { offlineStatus }
        { errorFlash }
        { playingNow }
        { playingNext }
        { playlist }
        <p>The show typically runs from Sunset to 9pm CST, from Halloween to New Years Day.</p>
      </div>
      <div id="donate">
        <h2 className="underline">Support our Show</h2>
        <p>
          In liue of direct donations, consider supporting the Lakeland Education Foundation by voting (with donations) for &quot;LewLights&quot; in the <a className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600" href="https://lakelandchristmaslights.bubbleapps.io/">Lakeland Festival of Lights</a>.
        </p>
      </div>
      <div id="map">
        <h2 className="underline">Our Location and Map</h2>
        <ShowMap />
      </div>
      <div id="videos">
        <h2 className="underline">Our Present and Past Videos</h2>
        <Videos />
      </div>
    </div>
    );
};

async function fetchRemoteFalconData(jwt: String, path: String): Promise<{ error?: String, data?: any }> {
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
  let json: any;
  switch (res.status) {
    case 200:
      json = await res.json();
      return { data: json };
    case 204:
      return {};
    case 400:
    case 401:
      json = await res.json();
      return { error: json.message as String };
    case 429:
      json = await res.json();
      return { error: json as String };
    default:
      console.log("Unknown error:", res);
      return { error: "Unknown error" };
  }
}

async function fetchSequences(jwt: String): Promise<{ error?: String, data?: SequenceData[] }> {
  return await fetchRemoteFalconData(jwt, "lewlights/sequences");
}

async function fetchCurrentSequence(jwt: String): Promise<{ error?: String, data?: CurrentSequenceData }> {
  return await fetchRemoteFalconData(jwt, "lewlights/currentlyPlaying");
}

async function fetchNextSequence(jwt: String): Promise<{ error?: String, data?: CurrentSequenceData }> {
  return await fetchRemoteFalconData(jwt, "lewlights/nextSequenceInQueue");
}

function getOfflineStatus(): String | null {
  let now = new Date(Date.now());
  let month = now.getMonth();
  let day = now.getDay();
  if (month > 1 && month < 10) {
    return 'Season';
  }
  if (month == 10 && day < 28) {
    return 'Season';
  }
  if (month == 1 && day > 4) {
    return 'Season';
  }
  let currentHour = parseInt(now.toLocaleString('en-US', {hour: '2-digit',   hour12: false, timeZone: 'America/Chicago' }));
  console.log("currenthour:", currentHour);
  if (currentHour < 17 || currentHour > 21) {
    return 'Evening';
  }
  return null;
}

export const getServerSideProps: GetStaticProps = async (context) => {
  console.log("getServerSideProps", context);
  const offline = getOfflineStatus();
  let props: IndexProps;
  if (offline) {
    props = { offline, errors: [], sequences: [], currentSequence: null, nextSequence: null }
  } else {
    const accessToken = process.env.REMOTEFALCON_ACCESS_TOKEN || 'example-token';
    const secretKey: Secret = process.env.REMOTEFALCON_SECRET_KEY || 'example-secret';
    const jwt = sign({ accessToken }, secretKey);
    try {
      const [sequencesRes, currentSequenceRes, nextSequenceRes ] = await Promise.all(
        [
          fetchSequences(jwt),
          fetchCurrentSequence(jwt),
          fetchNextSequence(jwt),
        ]
      );
      let errors = [sequencesRes.error, currentSequenceRes.error, nextSequenceRes.error].filter((e) => e) as string[];
      props = {
        offline: null,
        errors,
        sequences: sequencesRes.data || [],
        currentSequence: currentSequenceRes.data || null,
        nextSequence: nextSequenceRes.data || null,
      };
    } catch (err) {
      props = { offline, errors: [err as string], currentSequence: null, nextSequence: null, sequences: [] };
    }
  }
  console.dir(props);
  return { props };
}

export default Index;
