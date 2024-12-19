import { Sequence } from '../lib/remote_falcon';

interface Props {
    sequence: Sequence,
}

const SequenceDetails = ({ sequence }: Props) => {
    return (
        <>
            <h4 className="text-xl text-gradient truncate">
                { sequence.displayName || sequence.name }
            </h4>
            <h5 className="text-gradient-reverse">
                { sequence.artist }
            </h5>
        </>
    )
}

export default SequenceDetails;
