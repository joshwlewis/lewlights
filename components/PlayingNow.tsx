import { CurrentSequenceData } from '../interfaces';

interface PlayingNowProps {
  currentSequence: CurrentSequenceData
}

const PlayingNow = ({ currentSequence }: PlayingNowProps) => {
  return (
    <>
      <h2 className="text-xl mb-2">
        Currently Playing <b className="text-gradient">{ currentSequence.currentSequence }</b>.
      </h2>
    </>
  );
}

export default PlayingNow;
