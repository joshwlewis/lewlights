import type { GetStaticProps } from "next";
import { useState, useEffect } from 'react'
import OfflineStatus from "../components/OfflineStatus";
import PlayingNow from "../components/PlayingNow";
import NothingPlaying from "../components/NothingPlaying";
import PlayingNext from "../components/PlayingNext";
import Playlist from "../components/Playlist";
import ErrorFlash from "../components/ErrorFlash";
import ShowMap from "../components/ShowMap";
import Videos from "../components/Videos";
import Loading from "../components/Loading";
import { queryRemoteFalcon, getRemoteFalconKey, Sequence, Show } from "../lib/remote_falcon";

interface IndexProps {
  remoteFalconKey: string,
  googleMapsKey: string,
}

const Index = ({googleMapsKey, remoteFalconKey}: IndexProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [offlineMessage, setOfflineMessage] = useState<string | null>(null);
  const [show, setShow] = useState<Show | null>(null);
  const [currentSequence, setCurrentSequence] = useState<Sequence | null>(null);
  const [nextSequence, setNextSequence] = useState<Sequence | null>(null);
  const [error, setError] = useState<string | null>(null);
  let logSetError = function(err: string) { console.error(err); setError(err); };

  useEffect(() => {
    const getShowState = () => {
        const offlineMessage = getOfflineMessage();
        setOfflineMessage(offlineMessage);
        if (offlineMessage) {
            setShow(null);
            setCurrentSequence(null);
            setNextSequence(null);
        } else {
            queryRemoteFalcon(remoteFalconKey).then((show) => {
                for (const seq of show.sequences) {
                    if (seq.name === show.playingNow || seq.displayName === show.playingNow) {
                        setCurrentSequence(seq);
                    }
                    if (seq.name === show.playingNext || seq.displayName === show.playingNext) {
                        if (currentSequence && currentSequence.name === seq.name) {
                            setNextSequence(null);
                        } else {
                            setNextSequence(seq);
                        }
                    }
                }
                return setShow(show);
            }).catch(logSetError);
        }
        setLoading(false);
    };
    getShowState();
    let interval = setInterval(getShowState, 1500);
    return () => clearInterval(interval);
  }, [currentSequence, remoteFalconKey]);

  function showStatus() {
      if (offlineMessage) {
          return <OfflineStatus message={offlineMessage} />;
      }
      let comps = [];
      if (currentSequence) {
        comps.push(<PlayingNow sequence={currentSequence} />);
      } else {
        comps.push(<NothingPlaying />);
      }
      if (nextSequence && (!currentSequence || nextSequence.name !== currentSequence.name)) {
          comps.push(<PlayingNext sequence={nextSequence} />);
      }
      if (show && show.sequences.length >0) {
          comps.push(<Playlist remoteFalconKey={remoteFalconKey} sequences={show.sequences} />);
      }
      return comps;
  }
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
        { loading  && <Loading /> }
        { error && <ErrorFlash /> }
        { showStatus() }
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

function getOfflineMessage(): string | null {
  let now = new Date(Date.now());
  let month = now.getMonth() + 1;
  let day = now.getDate();
  // February to September
  if (month > 1 && month < 10) {
    return "The show is offline until holiday season. See you then!";
  }
  // October 1-21
  if (month == 10 && day < 22) {
    return "We're offline until Halloween week. See you soon!";
  }
  // January 5-31
  if (month == 1 && day > 4) {
    return "The show is over for this season. See you next season!";
  }
  let currentHour = parseInt(now.toLocaleString('en-US', {hour: '2-digit',   hour12: false, timeZone: 'America/Chicago' }));
  if (currentHour >= 4 && currentHour < 17) {
      return "The show is offline during the day. Check back when it gets dark!";
  }
  if (currentHour < 4 || currentHour > 21) {
    return "The show's over for tonight. Come see us another night!";
  }
  return null;
}

export const getServerSideProps: GetStaticProps = async (context) => {
  return { props: { googleMapsKey: getGoogleMapsKey(), remoteFalconKey: getRemoteFalconKey() } };
}

export default Index;
