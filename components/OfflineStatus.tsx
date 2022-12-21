interface OfflineStatusProps {
  duration: String
}

const OfflineStatus = ({ duration }: OfflineStatusProps) => {
  return (
    <>
      <h2 className="text-xl mb-2">
        We&apos;re offline for the { duration }. Come see us some other time!
      </h2>
    </>
  );
}

export default OfflineStatus;


