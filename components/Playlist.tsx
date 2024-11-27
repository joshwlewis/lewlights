import { enqueueRemoteFalcon, Sequence } from '../lib/remote_falcon';
import { ToastLevel } from '../lib/toast_message';

interface Props {
  addToast: (m: string, l?: ToastLevel) => void,
  remoteFalconKey: string,
  sequences: Sequence[],
}

const Playinglist = ({ addToast, sequences, remoteFalconKey }: Props) => {
  async function enqueueSequence(sequence: Sequence) {
      try {
          await enqueueRemoteFalcon(remoteFalconKey, sequence);
          addToast(`Successfully enqueued "${sequence.displayName}". It should start soon!`);
      } catch (err) {
          addToast(`Sorry, we couldn't enqueue ${sequence.name}. Error: ${err}`, 'error')
      }
  }
  const visibleSequences = sequences.filter((seq) => seq.visible);
  const entries = visibleSequences.map((seq) => {
      return <li className="text-left my-2 w-fit" key={ seq.name }>
        <div className="grid grid-rows-2 grid-flow-col gap-x-4 items-center">
            <div className="row-span-2">
                <button className="text-lg bg-green-500 hover:bg-green-700 font-bold p-2 rounded" onClick={() => enqueueSequence(seq)} >
                    ▶ Play
                </button>
            </div>
            <div className="col-span-5 text-lg text-gradient truncate">
                { seq.displayName }
            </div>
            <div className="col-span-5 text-sm text-gradient-reverse">
                { seq.artist }
            </div>
        </div>
    </li>
});
  return (
    <>
      <h3 className="underline">Jukebox</h3>
      <h4>Choose the next song!</h4>
      <ul className="m-auto w-fit">
      { entries }
      </ul>
    </>
  );
}

export default Playinglist;
