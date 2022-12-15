import { CurrentSequenceData } from '../interfaces';

interface PlayingNextProps {
  nextSequence: CurrentSequenceData
}

const PlayingNow = ({ nextSequence }: PlayingNextProps) => {
  return (
    <>
      <h2 className="text-xl mb-2">
        Next up: <b className="text-gradient">{ nextSequence.currentSequence }</b>.
      </h2>
    </>
  );
}

export default PlayingNow;

