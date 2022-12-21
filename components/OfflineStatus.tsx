interface OfflineStatusProps {
  offline: String
}

const OfflineStatus = ({ offline }: OfflineStatusProps) => {
  return (
    <>
      <h2 className="text-xl mb-2">
        We&apos;re offline for the { offline }. Come see us some other time!
      </h2>
    </>
  );
}

export default OfflineStatus;


