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
  sequences?: SequenceData[],
  currentSequence?: CurrentSequenceData,
  nextSequence?: CurrentSequenceData,
  error?: String,
}

const Index = ({currentSequence, nextSequence, sequences, error}: IndexProps) => {
  let playingNow = currentSequence ? <PlayingNow currentSequence={currentSequence} /> : null;
  let playingNext = nextSequence ? <PlayingNext nextSequence={nextSequence} /> : null;
  let playlist = sequences ? <Playlist sequences={sequences} />: null;
  let errorFlash = error ? <ErrorFlash error={error} />: null;
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

async function fetchRemoteFalconJson(jwt: String, path: String): Promise<unknown> {
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
  console.dir(context);
  const accessToken = process.env.REMOTEFALCON_ACCESS_TOKEN || 'example-token';
  const secretKey: Secret = process.env.REMOTEFALCON_SECRET_KEY || 'example-secret';
  const jwt = sign({ accessToken }, secretKey);
  try {
    const [sequences, currentSequence, nextSequence ] = await Promise.all(
      [
        fetchRemoteFalconJson(jwt, 'lewlights/sequences'),
        fetchRemoteFalconJson(jwt, 'lewlights/currentlyPlaying'),
        fetchRemoteFalconJson(jwt, 'lewlights/nextSequenceInQueue'),
      ]
    );
    let props = {
      sequences: sequences as SequenceData[],
      currentSequence: currentSequence as CurrentSequenceData,
      nextSequence: nextSequence as CurrentSequenceData,
    };
    console.dir(props);
    return { props };
  } catch(err: any) {
    return { props: { error: err.message } }
  }
}

export default Index;
