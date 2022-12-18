import type { GetStaticProps } from "next";
import { Secret, sign } from "jsonwebtoken";
import { CurrentSequenceData, SequenceData } from "../interfaces"
import PlayingNow from "../components/PlayingNow";
import PlayingNext from "../components/PlayingNext";
import Playlist from "../components/Playlist";
import ErrorFlash from "../components/ErrorFlash";
import ShowMap from "../components/ShowMap";
import Videos from "../components/Videos";


interface IndexProps {
  sequences: SequenceData[],
  currentSequence?: CurrentSequenceData,
  nextSequence?: CurrentSequenceData,
  errors: String[],
}

const Index = ({currentSequence, nextSequence, sequences, errors}: IndexProps) => {
  let playingNow = currentSequence ? <PlayingNow currentSequence={currentSequence} /> : null;
  let playingNext = nextSequence ? <PlayingNext nextSequence={nextSequence} /> : null;
  let playlist = sequences ? <Playlist sequences={sequences} />: null;
  let errorFlash = errors ? <ErrorFlash />: null;
  return (
    <div className="text-gray-300 text-center">
      <div id="about">
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
        <p>LewLights is a Holiday light show by the Lewis family in Lakeland, TN.</p>
        <p>Feel free to drop by and watch for a while.</p>
        <p>Listen along in your vehicle by tuning to FM 90.5</p>
        <p>Remember: DO NOT PRESS THE BUTTON!</p>
      </div>
      <div id="status" className="text-gray-200">
        <h2>Show Status</h2>
        { errorFlash }
        { playingNow }
        { playingNext }
        { playlist }
      </div>
      <div id="donate">
      </div>
      <div id="map">
        <h2>Our Location and Map</h2>
        <ShowMap />
      </div>
      <div id="videos">
        <h2>Our Present and Past Videos</h2>
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

export const getServerSideProps: GetStaticProps = async (context) => {
  console.log("getServerSideProps", context);
  const accessToken = process.env.REMOTEFALCON_ACCESS_TOKEN || 'example-token';
  const secretKey: Secret = process.env.REMOTEFALCON_SECRET_KEY || 'example-secret';
  const jwt = sign({ accessToken }, secretKey);

  let props;
  try {
    const [sequencesRes, currentSequenceRes, nextSequenceRes ] = await Promise.all(
      [
        fetchSequences(jwt),
        fetchCurrentSequence(jwt),
        fetchNextSequence(jwt),
      ]
    );
    let errors = [sequencesRes.error, currentSequenceRes.error, nextSequenceRes.error].filter((e) => e);
    props = {
      errors,
      sequences: sequencesRes.data || null,
      currentSequence: currentSequenceRes.data || null,
      nextSequence: nextSequenceRes.data || null,
    };
  } catch (err) {
    props = { errors: [err] };
  }
  console.dir(props);
  return { props };
}

export default Index;
