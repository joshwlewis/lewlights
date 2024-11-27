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
        <button className="bg-green-500 hover:bg-green-700 font-bold p-1 rounded" onClick={() => enqueueSequence(seq)} >
              ▶ Play
            </button>
            <span className="mx-2 text-gradient">
              { seq.displayName }
            </span>
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
