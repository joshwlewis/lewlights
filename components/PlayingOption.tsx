import { PlayIcon } from '@heroicons/react/24/outline'
import { enqueueRemoteFalcon, Sequence } from '../lib/remote_falcon';
import { ToastLevel } from '../lib/toast_message';
import SequenceDetails from '../components/SequenceDetails';

interface Props {
  addToast: (m: string, l?: ToastLevel) => void,
  remoteFalconKey: string,
  sequence: Sequence,
}

const PlayingOption = ({ addToast, sequence, remoteFalconKey }: Props) => {
  async function enqueue(sequence: Sequence) {
      try {
          await enqueueRemoteFalcon(remoteFalconKey, sequence);
          addToast(`Successfully enqueued "${sequence.displayName}". It should start soon!`);
      } catch (err) {
          addToast(`Sorry, we couldn't enqueue ${sequence.name}. Error: ${err}`, 'error')
      }
  }
    return (
        <>
            <button className="my-1 p-2 bg-green-500 hover:bg-green-500/50 rounded-full shadow-md shadow-green-500/50" onClick={() => enqueue(sequence)} >
                <PlayIcon className="size-5 inline-block" strokeWidth={2}/>
                <span className="hidden sm:inline"> Play</span>
            </button>

            <div className="col-span-4">
                <SequenceDetails sequence={sequence}/>
            </div>
        </>
    );
};

export default PlayingOption;
