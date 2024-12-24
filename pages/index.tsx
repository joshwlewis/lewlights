import type { GetStaticProps } from "next";
import { useCallback, useState, useEffect } from 'react'
import OfflineStatus from "../components/OfflineStatus";
import Jukebox from "../components/Jukebox";
import Toasts from "../components/Toasts";
import ErrorFlash from "../components/ErrorFlash";
import ShowMap from "../components/ShowMap";
import Videos from "../components/Videos";
import Loading from "../components/Loading";
import Donate from "../components/Donate";
import { OfflineReason, getOfflineReason } from "../lib/showtime";
import { ToastMessage, ToastLevel } from "../lib/toast_message"
import { queryRemoteFalcon, getRemoteFalconKey, Sequence } from "../lib/remote_falcon";

interface IndexProps {
  remoteFalconKey: string,
    googleMapsKey: string,
}

interface Sequences {
  [key: string]: Sequence
}

const Index = ({googleMapsKey, remoteFalconKey}: IndexProps) => {
  const [loading, setLoading] = useState<boolean>(true);
  const [online, setOnline] = useState<boolean>(false);
  const [offlineReason, setOfflineReason] = useState<OfflineReason>(null);
  const [sequences, setSequences] = useState<Sequences>({});
  const [nowPlaying, setNowPlaying] = useState<string | null>(null);
  const [nextPlaying, setNextPlaying] = useState<string | null>(null);
  const [nowSequence, setNowSequence] = useState<Sequence | null>(null);
  const [nextSequence, setNextSequence] = useState<Sequence | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [ticks, setTicks ] = useState<number>(0);

  const addToast = useCallback((message: string, level: ToastLevel = 'info') => {
    setToasts((toasts) => {
      const toast: ToastMessage = { message, level, expire: ticks + 4};
      return [...toasts, toast];
    });
  }, [setToasts, ticks]);

  // Keep something ticking every so often.
  useEffect(() => {
    const to = setTimeout(() => setTicks(ticks + 1), 1500);
    return () => clearTimeout(to);
  }, [ticks]);

  // Remove toasts once they expire
  useEffect(() => {
    setToasts((toasts) => {
      return toasts.filter((toast) => {
        return ticks < toast.expire;
      }).slice(0)
    });
  }, [setToasts, ticks]);

  let logSetError = function(err: string) { console.error(err); setError(err); };

  // Reload show data every tick
  useEffect(() => {
    const offlineReason = getOfflineReason();
    setOfflineReason(offlineReason);
    if (online || !offlineReason) {
      queryRemoteFalcon(remoteFalconKey)
        .then((show) => {
          setNowPlaying(show.playingNow);
          setNextPlaying(show.playingNext);
          for (const seq of show.sequences) {
            setSequences((seqs) => {
              return { ...seqs,  [seq.name]: seq };
            });
          }
        })
        .catch(logSetError)
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    };
  }, [remoteFalconKey, online, ticks]);

  useEffect(() => {
    let nowSeq: Sequence | null = null;
    let nextSeq: Sequence | null = null;
    Object.values(sequences).forEach((seq: Sequence) => {
      if (seq.name === nowPlaying || seq.displayName === nowPlaying) {
        nowSeq = seq;
      }
      if (seq.name === nextPlaying || seq.displayName === nextPlaying) {
        nextSeq = seq;
      }
    });
    // Null out next sequence if it's the same as the last (don't show twice).
    if (nowSeq && nextSeq == nowSeq) {
        nextSeq = null;
    }
    if (!nowSeq && nowPlaying) {
        nowSeq = { name: nowPlaying, displayName: null, artist: "???", imageUrl: null, visible: false }
    }
    setNowSequence(nowSeq);
    setNextSequence(nextSeq);
  }, [sequences, nowPlaying, nextPlaying])

  function jukebox() {
    if (!online && offlineReason) {
      return <OfflineStatus key={ "offline" } reason={offlineReason} />;
    }
    return <Jukebox sequences={ Object.values(sequences) } nowSequence={nowSequence} nextSequence={nextSequence} addToast={addToast} remoteFalconKey={remoteFalconKey} />;
  }

  return (
    <div className="text-gray-300 text-center">
      <Toasts toasts={ toasts } />
      <div id="home" className="flex justify-center my-4">
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
        <p className="my-4">
            LewLights is a holiday light show by the Lewis family on Mount McKenzie Road in Lakeland, TN.
            The show typically runs from sunset to 9pm Central, from Halloween to New Years Day.
            Tune in via <b>FM 90.5</b> to enjoy from your vehicle.
            And remember: <span className="text-red-600">DO NOT PRESS THE BUTTON!</span> &#x1F609;
        </p>
</div>
<div id="jukebox" className="my-8">
  <h2 onClick={() => setOnline(true) } className="font-bold text-xl my-4">Jukebox</h2>
    { loading  && <Loading /> }
    { error && <ErrorFlash /> }
    { jukebox() }
  </div>
  <div id="donate" className="my-8">
    <h2 className="font-bold text-xl my-4">Support</h2>
    <Donate />
  </div>
  <div id="map" className="my-8">
    <h2 className="font-bold text-xl my-4">Location</h2>
    <ShowMap googleMapsApiKey={ googleMapsKey }/>
  </div>
  <div id="videos" className="my-8">
    <h2 className="font-bold text-xl my-4">Videos</h2>
    <Videos />
  </div>
</div>
    );
};

function getGoogleMapsKey(): string {
  return process.env.GOOGLEMAPS_API_KEY || 'example-google-maps-token';
}

export const getStaticProps: GetStaticProps = async (_context) => {
    return {
        props: {
            googleMapsKey: getGoogleMapsKey(),
            remoteFalconKey: getRemoteFalconKey()
        },
        // Cache static data for 4 hours.
        revalidate: 14400,
    };
}

export default Index;
