import { Sequence } from '../lib/remote_falcon';

interface Props {
    sequence: Sequence
}

const PlayingNow = ({ sequence }: Props) => {
  return (
    <>
      <h3 className="text-l">
          Now Playing
      </h3>
      <h2 className="text-xl text-gradient">
        { sequence.displayName || sequence.name }
      </h2>
      <h3 className="text-l text-gradient-reverse">
        { sequence.artist }
      </h3>
    </>
  );
}

export default PlayingNow;
