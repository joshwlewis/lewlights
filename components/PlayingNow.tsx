import { SpeakerWaveIcon } from '@heroicons/react/24/outline'
import SequenceDetails from '../components/SequenceDetails';
import { Sequence } from '../lib/remote_falcon';

interface Props {
    sequence: Sequence
}

const PlayingNow = ({ sequence }: Props) => {
  return (
    <>
        <button className="my-1 p-2 rounded-full bg-indigo-500/50 hover:bg-gray-500/50 shadow-inner shadow-indigo-400/50" disabled={true}>
            <SpeakerWaveIcon className="size-5 inline-block" strokeWidth={2} />
            <span className="hidden sm:inline"> Playing</span>
        </button>
        <div className="col-span-4">
            <SequenceDetails sequence={sequence}/>
        </div>
    </>
  );
}

export default PlayingNow;
