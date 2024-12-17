import { OfflineReason, getOfflineMessage, getShowtime } from "../lib/showtime";

interface Props {
  reason: OfflineReason
}

const OfflineStatus = ({ reason }: Props) => {
  const message = getOfflineMessage(reason);
  const showtime = new Intl.DateTimeFormat('en-US', { dateStyle: "long", timeStyle: "long" }).format(getShowtime(reason))
  return (
    <>
      <h3 className="mb-2">
        { message }
      </h3>
      <p>
          The next showtime is at approximately&nbsp;
          <b className="text-gradient">{ showtime }</b>.
      </p>
    </>
  );
}

export default OfflineStatus;
