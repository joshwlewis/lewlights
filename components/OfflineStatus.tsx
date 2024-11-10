interface Props {
  message: string
}

const OfflineStatus = ({ message }: Props) => {
  return (
    <>
      <h2 className="text-xl mb-2">
        { message }
      </h2>
    </>
  );
}

export default OfflineStatus;
