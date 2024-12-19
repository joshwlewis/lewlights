import { Sequence } from "../lib/remote_falcon";
import { ToastLevel } from '../lib/toast_message';
import PlayingNext from "../components/PlayingNext";
import PlayingNow from "../components/PlayingNow";
import PlayingOption from "../components/PlayingOption";

interface Props {
  sequences: Sequence[],
  nextSequence: Sequence | null,
  nowSequence: Sequence | null,
  addToast: (m: string, l?: ToastLevel) => void,
  remoteFalconKey: string,
}

const Jukebox = ({ sequences, nowSequence, nextSequence, addToast, remoteFalconKey }: Props) => {
    const availableSequences = sequences.filter((seq) => seq.visible)
        .filter((seq) => !nowSequence || seq.name != nowSequence.name)
        .filter((seq) => !nextSequence || seq.name != nextSequence.name);

    return (
        <>
            <ul className="grid grid-cols-5 gap-3 text-left w-fit m-auto">
                { nowSequence && <li className="grid col-span-5 grid-cols-subgrid"><PlayingNow sequence={nowSequence} /></li> }
                { nextSequence && <li className="grid col-span-5 grid-cols-subgrid"><PlayingNext sequence={nextSequence} /></li> }
                { availableSequences.map((sequence) => {
                    return <li className="grid col-span-5 grid-cols-subgrid" key={sequence.name}><PlayingOption sequence={sequence} addToast={ addToast } remoteFalconKey={ remoteFalconKey }/></li>;
                })}
            </ul>
        </>
    );
}

export default Jukebox;
