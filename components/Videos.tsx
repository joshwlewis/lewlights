const vidUrls = [
  "https://www.youtube-nocookie.com/embed/hkxFcFNEKa4",
  "https://www.youtube-nocookie.com/embed/Rs-02QXyeNo",
  "https://www.youtube-nocookie.com/embed/oQeiWbGsHxk",
  "https://www.youtube-nocookie.com/embed/t_MNg7SGft",
  "https://www.youtube-nocookie.com/embed/Tzwfy1Etkt8"
]

const Videos = () => {
  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 justify-items-center">
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
