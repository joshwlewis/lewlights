import { ShowStatusData } from '../interfaces';

const ShowStatus = (props: ShowStatusData) => {
  return (
    <>
      <div className="text-gray-200">
        <h2 className="text-xl mb-2">
          Currently Playing <b>{ props.currentSequence }</b>.
        </h2>
        <h2 className="text-lg">
          Current Playlist
        </h2>
        <ul>
          { props.sequences.filter((sequence) => sequence.sequenceVisible).map((sequence) => {
            return (
              <>
                <li>{ sequence.sequenceName }</li>
              </>
            )
          })}
        </ul>
      </div>
    </>
  );
}

export default ShowStatus;
