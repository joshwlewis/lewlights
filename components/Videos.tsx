const vidUrls = [
  "https://www.youtube.com/embed/RUZ1ViH22j8",
  "https://www.youtube.com/embed/-DgnvvRjPiU",
  "https://www.youtube.com/embed/P1WCtbceccU",
  "https://www.youtube.com/embed/sEaDHzTwuZ4",
  "https://www.youtube.com/embed/Rs-02QXyeNo",
  "https://www.youtube.com/embed/oQeiWbGsHxk",
  "https://www.youtube.com/embed/t_MNg7SGftU",
  "https://www.youtube.com/embed/ZV9ri20rCeQ",
  "https://www.youtube.com/embed/Tzwfy1Etkt8"
]

const Videos = () => {
  return (
    <>
      <div className="grid gap-6 lg:grid-cols-2 justify-items-center">
        {vidUrls.map((url) => {
          return (
            <div key={url} className="w-80 h-44">
              <iframe
                title="YouTube video player"
                className="mx-auto"
                src={url} frameBorder="0" allowFullScreen
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
              </iframe>
            </div>
          )
        })}
      </div>
    </>
    );
};

export default Videos;
