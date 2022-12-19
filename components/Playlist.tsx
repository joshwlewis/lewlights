import { SequenceData } from '../interfaces';

interface PlaylistProps {
  sequences: SequenceData[]
}

const Playinglist = ({ sequences }: PlaylistProps) => {
  let visibleSequences = sequences.filter((seq) => seq.sequenceVisible);
  return (
    <>
      <ul>
        { visibleSequences.map((sequence) => {
          return (
            <li key={ sequence.sequenceName }>{ sequence.sequenceDisplayName }</li>
          )
        })}
      </ul>
    </>
  );
}

export default Playinglist;
