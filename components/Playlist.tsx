import { enqueueRemoteFalcon, Sequence } from '../lib/remote_falcon';

interface Props {
  remoteFalconKey: string,
  sequences: Sequence[]
}

const Playinglist = ({ sequences, remoteFalconKey }: Props) => {
  let visibleSequences = sequences.filter((seq) => seq.visible);
  function enqueueSequence(sequence: Sequence) {
      return enqueueRemoteFalcon(remoteFalconKey, sequence)
  }
  return (
    <>
      <h3 className="underline">Playlist</h3>
      <h4>Choose the next song!</h4>
      <ul className="m-auto w-fit">
        { visibleSequences.map((seq) => {
          return ([
            <li className="text-left my-2 w-fit" key={ seq.name }>
              <button className="bg-green-500 hover:bg-green-700 font-bold p-1 rounded" onClick={() => enqueueSequence(seq)} >
                ▶ Play
              </button>
              <span className="mx-2 text-gradient">{ seq.displayName || seq.name }</span>
            </li>
          ])
        })}
      </ul>
    </>
  );
}

export default Playinglist;
