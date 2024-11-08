import { Sequence } from '../lib/remote_falcon';

interface Props {
  sequence: Sequence
}

const PlayingNow = ({ sequence }: Props) => {
  return (
    <>
      <h2 className="text-xl mb-2">
        Next up: <b className="text-gradient">{ sequence.displayName || sequence.name }</b>
      </h2>
    </>
  );
}

export default PlayingNow;

