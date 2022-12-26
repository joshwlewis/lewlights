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
  remoteFalconKey: string,
  googleMapsKey: string,
  offlineDuration: string | null,
  sequences: SequenceData[],
  currentSequence: CurrentSequenceData | null,
  nextSequence: CurrentSequenceData | null,
  errors: string[],
}

const Index = ({googleMapsKey, offlineDuration, currentSequence, nextSequence, sequences, errors}: IndexProps) => {
  let offlineStatus = offlineDuration ? <OfflineStatus duration={ offlineDuration } /> : null;
  let playingNow = currentSequence ? <PlayingNow currentSequence={currentSequence} /> : null;
  let playingNext = nextSequence ? <PlayingNext nextSequence={nextSequence} /> : null;
  let playlist = sequences ? <Playlist sequences={sequences} />: null;
  let errorFlash = errors.some((err) => err) ? <ErrorFlash />: null;
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
        { offlineStatus }
        { errorFlash }
        { playingNow }
        { playingNext }
        { playlist }
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

function getGoogleMapsKey(): String {
  return process.env.GOOGLEMAPS_API_KEY || 'example-google-maps-token';
}

function getRemoteFalconKey(): String {
  const accessToken = process.env.REMOTEFALCON_ACCESS_TOKEN || 'example-remote-falcon-token';
  const secretKey: Secret = process.env.REMOTEFALCON_SECRET_KEY || 'example-remote-falcon-secret';
  return sign({ accessToken }, secretKey);
}

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
  console.log("res:", res);
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

function getOfflineDuration(): String | null {
  let now = new Date(Date.now());
  let month = now.getMonth();
  let day = now.getDay();
  if (month > 1 && month < 10) {
    return 'season';
  }
  if (month == 10 && day < 28) {
    return 'season';
  }
  if (month == 1 && day > 4) {
    return 'season';
  }
  let currentHour = parseInt(now.toLocaleString('en-US', {hour: '2-digit',   hour12: false, timeZone: 'America/Chicago' }));
  console.log("currenthour:", currentHour);
  if (currentHour < 17 || currentHour > 21) {
    return 'evening';
  }
  return null;
}

export const getServerSideProps: GetStaticProps = async (context) => {
  console.log("getServerSideProps", context);
  const offlineDuration = getOfflineDuration();
  let props: IndexProps = { googleMapsKey: getGoogleMapsKey(), remoteFalconKey: getRemoteFalconKey(), offlineDuration, errors: [], sequences: [], currentSequence: null, nextSequence: null };
  if (!offlineDuration) {
    const jwt = getRemoteFalconKey();
    try {
      const [sequencesRes, currentSequenceRes, nextSequenceRes ] = await Promise.all(
        [
          fetchSequences(props.remoteFalconKey),
          fetchCurrentSequence(props.remoteFalconKey),
          fetchNextSequence(props.remoteFalconKey),
        ]
      );
      let errors = [sequencesRes.error, currentSequenceRes.error, nextSequenceRes.error].filter((e) => e) as string[];
      props = { ...props, 
        errors,
        sequences: sequencesRes.data || [],
        currentSequence: currentSequenceRes.data || null,
        nextSequence: nextSequenceRes.data || null,
      };
    } catch (err) {
      console.log("Error", err);
      props = { ...props, errors: [JSON.stringify(err)] };
    }
  }
  console.dir(props);
  return { props };
}

export default Index;
