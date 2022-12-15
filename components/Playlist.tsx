import { SequenceData } from '../interfaces';

interface PlaylistProps {
  sequences: SequenceData[]
}

const PlayingNow = ({ sequences }: PlaylistProps) => {
  let visibleSequences = sequences.filter((seq) => seq.sequenceVisible);
  return (
    <>
      <ul>
        { visibleSequences.map((sequence) => {
          return (
            <>
              <li>{ sequence.sequenceDisplayName }</li>
            </>
          )
        })}
      </ul>
    </>
  );
}

export default PlayingNow;
