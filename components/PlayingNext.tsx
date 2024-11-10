import { Sequence } from '../lib/remote_falcon';

interface Props {
  sequence: Sequence
}

const PlayingNow = ({ sequence }: Props) => {
  return (
    <>
      <h3 className="text-l">Next Up</h3>
      <h2 className="text-xl text-gradient">
        { sequence.displayName || sequence.name }
      </h2>
      <h2 className="text-l text-gradient">
        { sequence.artist }
      </h2>
    </>
  );
}

export default PlayingNow;

