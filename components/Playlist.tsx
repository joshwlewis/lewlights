import { Sequence } from '../lib/remote_falcon';

interface Props {
  sequences: Sequence[]
}

const Playinglist = ({ sequences }: Props) => {
  let visibleSequences = sequences.filter((seq) => seq.visible);
  return (
    <>
      <h3 class="underline">Playlist</h3>
      <ul>
        { visibleSequences.map((seq) => {
          return (
            <li key={ seq.name }>{ seq.displayName || seq.name }</li>
          )
        })}
      </ul>
    </>
  );
}

export default Playinglist;
