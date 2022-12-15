const ShowError = (error: String) => {
  return (
    <>
      <div>Couldn't load show data. We might be offline. Try again later.</div>
      <div>{ error }</div>
    </>
  )
}
export default ShowError;
