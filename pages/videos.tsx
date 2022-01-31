import type { NextPage } from "next";

const vidUrls = [
  "https://www.youtube-nocookie.com/embed/oQeiWbGsHxk",
  "https://www.youtube-nocookie.com/embed/t_MNg7SGft",
  "https://www.youtube-nocookie.com/embed/Tzwfy1Etkt8"
]
const Videos: NextPage = () => {
  return (
    <>
      <div className="grid">
        {vidUrls.map((url) => {
          return (
            <iframe
              width="560" height="315" title="YouTube video player"
              key={url} src={url} frameBorder="0" allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture">
            </iframe>
          )
        })}
      </div>
    </>
    );
};

export default Videos;
