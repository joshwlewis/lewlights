interface ErrorFlashProps {
  error: String
}

const ErrorFlash = ({ error }: ErrorFlashProps) => {
  return (
    <>
      <h2>There was some trouble loading the show&apos;s current status.</h2>
      <p>We might be offline or it might just be a temporary issue. Check back later!</p>
      <h4>{ error }</h4>
    </>
  );
}

export default ErrorFlash;

