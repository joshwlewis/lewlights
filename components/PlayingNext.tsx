import { ForwardIcon } from '@heroicons/react/24/outline'
import { Sequence } from '../lib/remote_falcon';
import SequenceDetails from '../components/SequenceDetails';

interface Props {
  sequence: Sequence,
}

const PlayingNow = ({ sequence }: Props) => {
  return (
    <>
        <button className="my-1 p-2 rounded-full bg-sky-500/50 hover:bg-gray-500/50 shadow-inner shadow-sky-500/50" disabled={true}>
            <ForwardIcon className="size-5 inline-block" strokeWidth={2} />
            <span className="hidden sm:inline"> Next</span>
        </button>
        <div className="col-span-4">
            <SequenceDetails sequence={sequence}/>
        </div>
    </>
  );
}

export default PlayingNow;

